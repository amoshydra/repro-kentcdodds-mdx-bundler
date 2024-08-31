// @ts-check
import path from "node:path";
import esbuild from "esbuild";
import { NodeResolvePlugin } from '@esbuild-plugins/node-resolve'

/**
 * @type {import("esbuild").BuildOptions}
 */
const options = {
  bundle: true,
  entryPoints: [
    "project/index-b.js",
    "project/index-c.js",
  ],
};

(async() => {

  await esbuild.build({
    outdir: "dist/default",
    ...options,
  });

  await esbuild.build({
    outdir: "dist/resolve-default",
    ...options,
    plugins: [
      NodeResolvePlugin({
        extensions: ['.js'],
      }),
    ],
  });

  await esbuild.build({
    outdir: "dist/resolve-project-directory-as-basedir",
    ...options,
    plugins: [
      NodeResolvePlugin({
        extensions: ['.js'],
        resolveOptions: {
          basedir: path.resolve(process.cwd(), "project"),
        }
      }),
    ],
  });
})();
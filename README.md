This reproduce provide a sample project for issue:
- https://github.com/kentcdodds/mdx-bundler/issues/233

## Method

### Project setup
- `Package B` imports `Package A (1.0.0)`
- `Package C` imports `Package A (2.0.0)`

The `node_modules` inside `project` folder are created to mimic how `npm` may construct the tree to allow for correct module resolution.

```
project
├── index-b.js
├── index-c.js
└── node_modules
    ├── package-a
    │   ├── a.js
    │   └── package.json
    ├── package-b
    │   ├── b.js
    │   └── package.json
    └── package-c
        ├── c.js
        ├── node_modules
        │   └── package-a
        │       ├── a.js
        │       └── package.json
        └── package.json
```

### Test

`./build.mjs` contains 3 build steps:
- **`default`** - esbuild's default resolution
- **`resolve-default`** - `@esbuild-plugins/node-resolve` default resolution
- **`resolve-project-directory-as-basedir`** - `@esbuild-plugins/node-resolve` with project directory as basedir


### Result

Result are generated into `dist` folder.

Observe `index-c.js` for each test in the respective `dist` folder.

Notice the value of `a_default`.

#### ✔ Correct
```ts
(() => {
  // project/node_modules/package-c/node_modules/package-a/a.js
  var a_default = "node_modules/package-c/node_modules/package-a/a.js";

  // project/node_modules/package-c/c.js
  var c_default = `node_modules/package-c/c.js --> ${a_default}`;

  // project/index-c.js
  console.log("PackageC");
  console.log(c_default);
})();
```

#### ❌ Wrong
```ts
(() => {
  // project/node_modules/package-a/a.js
  var a_default = "node_modules/package-a/a.js";

  // project/node_modules/package-c/c.js
  var c_default = `node_modules/package-c/c.js --> ${a_default}`;

  // project/index-c.js
  console.log("PackageC");
  console.log(c_default);
})();
```

### Note
Node's module resolution can also be directly validated using the following command:

```bash
node .\project\index-c.js
```

output:
```
PackageC
node_modules/package-c/c.js --> node_modules/package-c/node_modules/package-a/a.js
```

### Updating `dist`

1. apply modification
2. use node 20
3. rebuild
```
npx yarn
node build.mjs
```

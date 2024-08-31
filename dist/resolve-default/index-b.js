(() => {
  // project/node_modules/package-a/a.js
  var a_default = "node_modules/package-a/a.js";

  // project/node_modules/package-b/b.js
  var b_default = `node_modules/package-b/b.js --> ${a_default}`;

  // project/index-b.js
  console.log("PackageB");
  console.log(b_default);
})();

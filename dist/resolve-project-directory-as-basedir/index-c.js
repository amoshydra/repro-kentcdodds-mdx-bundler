(() => {
  // project/node_modules/package-a/a.js
  var a_default = "node_modules/package-a/a.js";

  // project/node_modules/package-c/c.js
  var c_default = `node_modules/package-c/c.js --> ${a_default}`;

  // project/index-c.js
  console.log("PackageC");
  console.log(c_default);
})();

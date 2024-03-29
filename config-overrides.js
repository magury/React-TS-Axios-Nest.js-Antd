const path = require("path");
function resolve(dir) {
  return path.join(__dirname, ".", dir);
}
module.exports = function override(config, env) {
  config.resolve.alias = {
    "@": resolve("src"),
    com: resolve("src/components"),
  };
  return config;
};

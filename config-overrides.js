const { alias } = require("react-app-rewire-alias");

module.exports = function override(config) {
  alias({
    "@helpers": "src/helpers",
    "@api": "src/api",
    "@components": "src/components",
    "@store": "src/store",
    "@yup": "src/yup",
    "@pages": "src/pages",
    "@hooks": "src/hooks",
    "@constants": "src/constants",
  })(config);

  return config;
};

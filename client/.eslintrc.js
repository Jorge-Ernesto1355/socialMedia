module.exports = {
  env: {
    browser: true,
    commonjs: true,
  },
  extends: ["plugin:react/recommended", "standard", "prettier"],
  overrides: [
    {
      env: {
        node: true,
      },
      files: [".eslintrc.{js,cjs}"],
      parserOptions: {
        sourceType: "script",
      },
    },
  ],
  parserOptions: {
    ecmaVersion: "latest",
  },
  plugins: ["react"],
  rules: {
    "react/prop-types": "off",
    "react/react-in-jsx-scope": "off",
	  'no-unused-vars':'warn', 
    'no-unneeded-ternary':'off'
  },
};

module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2022,
    sourceType: 'module',
    project: './tsconfig.json', // 添加此行，指定项目的 tsconfig.json 路径
  },
  settings: {
    react: {
      version: "detect"
    }
  },
  plugins: ['react', 'react-hooks', 'jsx-a11y', 'import', '@typescript-eslint'],
  extends: [
    'airbnb-typescript',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'plugin:jsx-a11y/recommended',
    'plugin:import/errors',
    'plugin:import/warnings',
  ],
  rules: {
    // 在此添加自定义规则
    "@typescript-eslint/comma-dangle": "off",
    "@typescript-eslint/no-shadow": "off",
    "@typescript-eslint/quotes": ["error", "double"],
    "@typescript-eslint/no-unused-vars": "off",
    "react-hooks/exhaustive-deps": "off"
  },
};

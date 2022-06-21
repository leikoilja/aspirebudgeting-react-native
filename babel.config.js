module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    plugins: [
      "inline-dotenv",
      "react-native-classname-to-style",
      ["react-native-platform-specific-extensions", { extensions: ["css"] }],
      [
        "module-resolver",
        {
          root: ["./src"],
          extensions: [
            '.js',
            '.jsx',
            '.ts',
            '.tsx',
            '.android.js',
            '.android.tsx',
            '.ios.js',
            '.ios.tsx'
          ],
          alias: {
            "@api": "./src/api",
            "@components": "./src/components",
            "@const": "./src/const.ts",
            "@libs": "./src/libs",
            "@slices": "./src/state/slices",
            "@state": "./src/state",
            "@types": "./src/types.tsx",
          },
        },
      ],
    ],
  };
};

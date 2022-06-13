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
          alias: {
            "@api": "./src/api",
            "@actions": "./src/state/actions",
            "@const": "./src/const.ts",
            "@components": "./src/components",
            "@libs": "./src/libs",
            "@state": "./src/state",
            "@types": "./src/types.tsx",
          },
        },
      ],
    ],
  };
};

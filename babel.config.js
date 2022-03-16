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
            "@auth": "./src/auth",
            "@actions": "./src/state/actions",
            "@const": "./src/const.ts",
            "@libs": "./src/libs",
            "@state": "./src/state",
            "@types": "./src/types.tsx",
          },
        },
      ],
    ],
  };
};

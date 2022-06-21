// Import test server for the test suite
import "./testServer";

jest.mock("@react-native-async-storage/async-storage", () => {
  return {
    getItem: async (...args) => args,
    setItem: async (...args) => args,
    removeItem: async (...args) => args,
  };
});

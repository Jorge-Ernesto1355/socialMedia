import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import { userRequest } from "../../utilities/requestMethod";
import GetPosts from "../../services/getPosts.services";
const { renderHook, act, cleanup } = require("@testing-library/react");
const { useCallbackRequest } = require("./useCallbackRequest");
const { QueryClient, QueryClientProvider } = require("react-query");

const createWrapper = () => {
  const queryClient = new QueryClient();
  return ({ children }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

afterEach(cleanup);

describe("useCallbackRequest", () => {
  it("should not throw an error when valid props are passed", () => {
    expect(() => {
      renderHook(
        () => useCallbackRequest({ request: () => {}, id: "1", name: "John" }),
        {
          wrapper: createWrapper(),
        },
      );
    }).not.toThrow();
  });

  it("should throw an error when id is not a string", () => {
    expect(() => {
      renderHook(
        () => useCallbackRequest({ request: () => {}, id: 1, name: "John" }),
        {
          wrapper: createWrapper(),
        },
      );
    }).toThrow("Invalid props: id and name must be of type string");
  });
  it("should throw an error when name is not a string", () => {
    expect(() => {
      renderHook(
        () => useCallbackRequest({ request: () => {}, id: "1", name: 11 }),
        {
          wrapper: createWrapper(),
        },
      );
    }).toThrow("Invalid props: id and name must be of type string");
  });
  it("should throw an error when request is not a function", () => {
    expect(() => {
      renderHook(
        () =>
          useCallbackRequest({
            request: "not a function ",
            id: "1",
            name: "jhon",
          }),
        {
          wrapper: createWrapper(),
        },
      );
    }).toThrow("Invalid prop: request must be a function");
  });
});

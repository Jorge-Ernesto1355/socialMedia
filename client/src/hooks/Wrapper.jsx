/* eslint-disable react/display-name */
const { QueryClient, QueryClientProvider } = require("react-query");

export default function createWrapper() {
  const queryClient = new QueryClient();
  return ({ children }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

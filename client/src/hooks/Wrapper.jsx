const { QueryClient, QueryClientProvider } = require("react-query")

export default createWrapper = () => {
    const queryClient = new QueryClient
    return ({ children }) => (
      <QueryClientProvider client={queryClient}>
        {children}
      </QueryClientProvider>
    )
  }

  
 
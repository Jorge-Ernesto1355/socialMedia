import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { Provider } from "react-redux";
import { store, persistor } from "./redux/store";
import { PersistGate } from "redux-persist/integration/react";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { InstantSearch } from "react-instantsearch-hooks";
import algoliasearch from "algoliasearch";

const root = ReactDOM.createRoot(document.getElementById("root"));
const queryClient = new QueryClient({
  defaultOptions: {
    queries: { refetchOnReconnect: false, refetchOnWindowFocus: false },
  },
});

const searchClient = algoliasearch(
  "PZG4Z8HDRA",
  "f4018b1d9b79e8cedc28fae6fb2bb44a",
);

const INDEX_NAME = "autocomplete-accounts";

root.render(
  <QueryClientProvider client={queryClient}>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <InstantSearch searchClient={searchClient} indexName={INDEX_NAME}>
          <App />
        </InstantSearch>
        <ReactQueryDevtools />
      </PersistGate>
    </Provider>
  </QueryClientProvider>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

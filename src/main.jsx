import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./store/store.js";
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";
import "./i18n";
import Loader from "./components/Loader.jsx";
let persistor = persistStore(store);
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Suspense fallback={<Loader />}>
          <PersistGate loading={null} persistor={persistor}>
            <App />
          </PersistGate>
        </Suspense>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);

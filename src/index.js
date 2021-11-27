import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import "./assets/css/base.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import ContactProvider from "./store/ContactProvider";

ReactDOM.render(
  <React.StrictMode>
    <ContactProvider>
      <App />
    </ContactProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

reportWebVitals();

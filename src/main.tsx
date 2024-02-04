import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { ContextProvider } from "./context/Auth";
import axios from "axios";
axios.defaults.baseURL = "https://todo-server-green-three.vercel.app/";
axios.interceptors.request.use(
  function (config) {
    const user = localStorage.getItem("user");

    config.headers.Authorization = "bearer " + (user && JSON.parse(user)?.jwt);
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);
ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <BrowserRouter>
    <ContextProvider>
      <App />
    </ContextProvider>
  </BrowserRouter>
);

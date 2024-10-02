import { createBrowserRouter, createRoutesFromElements, Route } from "react-router-dom";
import App from "./App";
import StartSida from "./Pages/StartSida";


export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index element={<StartSida />} />
    </Route>
  )
);
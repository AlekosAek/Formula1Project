import { createBrowserRouter, createRoutesFromElements, Route } from "react-router-dom";
import App from "./App";
import StartSida from "./Pages/StartSida";
import AllTheDrivers from "./Pages/AllTheDrivers"
import InfoAboutADriver from "./Pages/InfoAboutADriver"
import NotFound from "./Pages/NotFoundPage";

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index element={<StartSida />} />
      <Route path="/all" element={<AllTheDrivers />} />
      <Route path="/driver/:id" element={<InfoAboutADriver />} />
      <Route path="*" element={<NotFound />} /> {/* Catch all unmatched routes */}
    </Route>
  )
);
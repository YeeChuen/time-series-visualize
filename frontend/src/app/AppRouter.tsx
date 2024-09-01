import React from "react";
import { Route, Routes } from "react-router-dom";
import Landing from "./pages/Landing";
import NotFound from "./pages/NotFound";
import DataUpload from "./pages/features/DataUpload";
import DataTable from "./pages/features/DataTable";
import DataGraph from "./pages/features/DataGraph";
import DashboardLayout from "../components/layout/DashboardLayout";
import ClientFermentation from "./pages/ClientFermentation";
import ClientFermentationRedirect from "../components/navigation/ClientFermentationRedirect";

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />

      <Route element={<DashboardLayout />}>
        <Route path="/client-fermentation" element={<ClientFermentation />}>
          <Route index element={<ClientFermentationRedirect />} />
          <Route path="data-upload" element={<DataUpload />} />
          <Route path="data-table" element={<DataTable />} />
          <Route path="data-graph" element={<DataGraph />} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
};

export default AppRouter;

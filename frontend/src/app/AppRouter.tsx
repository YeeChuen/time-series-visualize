import { Route, Routes } from "react-router-dom";
import DashboardLayout from "../components/layout/DashboardLayout";
import ClientFermentationRedirect from "../components/navigation/ClientFermentationRedirect";
import ClientFermentation from "./pages/ClientFermentation";
import Landing from "./pages/Landing";
import NotFound from "./pages/NotFound";
import DataGraph from "./pages/features/DataGraph";
import DataTable from "./pages/features/DataTable";
import DataUpload from "./pages/features/DataUpload";

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

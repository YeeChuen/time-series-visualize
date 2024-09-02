import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router";
import ClientFermentationLayout from "../../components/layout/ClientFermentationLayout";

const ClientFermentation = () => {
    const navigate = useNavigate()

    useEffect(() => {
        navigate("data-upload")
    }, [])

    
  return (
    <div>
      <ClientFermentationLayout>
        <Outlet />
      </ClientFermentationLayout>
    </div>
  );
};

export default ClientFermentation;

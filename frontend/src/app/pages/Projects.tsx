import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router";
import ProjectsLayout from "../../components/layout/ProjectsLayout";

const Projects = () => {
    const navigate = useNavigate()

    useEffect(() => {
        navigate("data-upload")
    }, [])

    
  return (
    <div>
      <ProjectsLayout>
        <Outlet />
      </ProjectsLayout>
    </div>
  );
};

export default Projects;

import { useGetAllProjectQuery } from "../../../redux/features/project/projectApi";
import Projects from "./Projects";

const ProjectContainer = () => {
  const { data } = useGetAllProjectQuery(undefined);
  const projects = data?.data;
  return (
    <div className="max-w-screen-md mx-auto">
      <Projects projects={projects} />
    </div>
  );
};

export default ProjectContainer;

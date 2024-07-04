import { useGetAllProjectQuery } from "../../../redux/features/project/projectApi";
import LoadingCard from "../loader/LoadingCard";
import Projects from "./Projects";

const ProjectContainer = () => {
  const { data, isLoading } = useGetAllProjectQuery(undefined);
  const projects = data?.data;
  return (
    <div className="max-w-screen-md mx-auto">
      {isLoading ? (
        <LoadingCard />
      ) : projects?.length > 0 ? (
        <Projects projects={projects} />
      ) : (
        <h1 className="mt-12 text-center text-2xl">There is no project</h1>
      )}
    </div>
  );
};

export default ProjectContainer;

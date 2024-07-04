import { useGetAllExperienceQuery } from "../../../redux/features/experience/experienceApi";
import LoadingCard from "../loader/LoadingCard";
import AddExperienceModal from "./AddExperienceModal";
import ExperienceTable from "./ExperienceTable";

const ExperienceContainer = () => {
  const { data, isLoading } = useGetAllExperienceQuery(undefined);
  const experiences = data?.data;
  return (
    <div>
      <AddExperienceModal />
      {isLoading ? (
        <LoadingCard />
      ) : data?.data?.length > 0 ? (
        <ExperienceTable data={experiences} />
      ) : (
        <h1 className="mt-12 text-center text-2xl">There is no experience</h1>
      )}
    </div>
  );
};

export default ExperienceContainer;

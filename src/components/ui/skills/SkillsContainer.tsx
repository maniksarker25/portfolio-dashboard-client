import { useGetAllSkillQuery } from "../../../redux/features/skill/skillApi";
import LoadingCard from "../loader/LoadingCard";
import AddSkillModal from "./AddSkillModal";
import SkillTable from "./SkillTable";

const SkillsContainer = () => {
  const { data, isLoading } = useGetAllSkillQuery(undefined);
  return (
    <div>
      <AddSkillModal />
      {isLoading ? (
        <LoadingCard />
      ) : data?.data?.length > 0 ? (
        <SkillTable data={data?.data} />
      ) : (
        <h1 className="mt-12 text-center text-2xl">There is no skill</h1>
      )}
    </div>
  );
};

export default SkillsContainer;

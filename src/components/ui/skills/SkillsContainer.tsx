import { useGetAllSkillQuery } from "../../../redux/features/skill/skillApi";
import AddSkillModal from "./AddSkillModal";
import SkillTable from "./SkillTable";

const SkillsContainer = () => {
  const { data } = useGetAllSkillQuery(undefined);
  return (
    <div>
      <AddSkillModal />
      <SkillTable data={data?.data} />
    </div>
  );
};

export default SkillsContainer;

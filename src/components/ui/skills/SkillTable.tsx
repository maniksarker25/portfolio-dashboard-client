type TSkill = {
  image: string;
  title: string;
  category: string;
};

const SkillTable = ({ data }: { data: TSkill[] }) => {
  return (
    <div className="min-w-full w-11/12 bg-white  overflow-scroll mt-6">
      {" "}
      <table className="min-w-full w-11/12 bg-white border border-gray-300 overflow-scroll">
        <thead>
          <tr>
            <th>Image</th>
            <th className="py-2 px-1 border-b">Title</th>
            <th className="py-2 px-1 border-b">Category</th>
          </tr>
        </thead>
        <tbody className="text-center">
          {data?.map((item, index: number) => (
            <tr key={index}>
              <td className="py-2 px-4 border-b">
                <img src={item?.image} className="w-12 h-12 rounded m-3" />
              </td>
              <td className="py-2 px-4 border-b">{item?.title}</td>
              <td className="py-2 px-4 border-b">{item?.category}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SkillTable;

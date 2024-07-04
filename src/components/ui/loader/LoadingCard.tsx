const LoadingCard = () => {
  return (
    <div className="w-full mx-auto p-4 rounded-md shadow-md bg-white animate-pulse mt-4">
      <div className="w-full h-52 bg-gray-200 rounded-md"></div>
      <div className="mt-4">
        <div className="w-3/5 h-8 bg-gray-200 rounded-md mb-2"></div>
        <div className="w-2/5 h-6 bg-gray-200 rounded-md"></div>
      </div>
      <div className="mt-4">
        <div className="w-4/5 h-4 bg-gray-200 rounded-md mb-2"></div>
        <div className="w-9/10 h-4 bg-gray-200 rounded-md mb-2"></div>
        <div className="w-7/10 h-4 bg-gray-200 rounded-md"></div>
      </div>
    </div>
  );
};

export default LoadingCard;

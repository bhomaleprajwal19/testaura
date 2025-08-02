const SkeletonLoader = () => (
  <div className="flex gap-4 overflow-x-auto ml-5 animate-pulse hide-scroll-bar">
    {Array.from({ length: 4 }).map((_, index) => (
      <div
        key={index}
        className="flex-shrink-0 my-5 w-64 h-64 rounded-2xl bg-gray-200 shadow-md relative overflow-hidden hide-scroll-ba"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-shimmer" />
        <div className="p-5 flex flex-col justify-between h-full relative z-10">
          <div>
            <div className="w-3/4 h-5 bg-gray-300 rounded mb-2"></div>
            <div className="w-1/2 h-4 bg-gray-300 rounded"></div>
          </div>
          <div className="mt-auto w-full h-10 bg-gray-300 rounded-xl"></div>
        </div>
      </div>
    ))}
  </div>
);

export default SkeletonLoader;

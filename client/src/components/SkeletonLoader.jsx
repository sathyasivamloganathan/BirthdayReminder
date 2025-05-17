export const SkeletonLoader = ({lightTheme, darkTheme}) => (
  <div className="animate-pulse w-full">
    {/* <div className="h-4 bg-gray-400 dark:bg-gray-700 rounded w-1/3 mb-2" /> */}
    <div className={`h-10 rounded-md w-full bg-${lightTheme} dark:bg-${darkTheme}`} />
  </div>
);

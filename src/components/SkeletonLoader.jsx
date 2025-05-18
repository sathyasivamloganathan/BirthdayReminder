export const SkeletonLoader = ({lightTheme, darkTheme}) => {

  const lightClasses = {
    'gray-300': 'bg-gray-300',
    'green-600': 'bg-green-600',
  };

  const darkClasses = {
    "gray-500": "dark:bg-gray-500",
    "green-800": "dark:bg-green-800",
  };

  return (
    <div className="animate-pulse w-full">
    {/* <div className="h-4 bg-gray-400 dark:bg-gray-700 rounded w-1/3 mb-2" /> */}
    <div className={`h-10 rounded-md w-full ${lightClasses[lightTheme]} ${darkClasses[darkTheme]}`} />
  </div>
  );
};

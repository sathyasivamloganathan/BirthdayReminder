const ProgressBar = ({ percentage }) => (
  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3 mb-4">
    <div
      className="bg-blue-500 h-3 rounded-full transition-all duration-500"
      style={{ width: `${percentage}%` }}
    ></div>
  </div>
);

export default ProgressBar;

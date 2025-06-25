const ToggleButtonGroup = ({ options, selected = [], onChange = () => {} }) => {
  const handleToggle = (option) => {
    if (!Array.isArray(selected)) return;

    const updated = selected.includes(option)
      ? selected.filter((item) => item !== option)
      : [...selected, option];

    onChange(updated);
  };

  return (
    <div className="flex flex-wrap gap-2">
      {options.map((option) => {
        const isSelected = selected.includes(option);
        return (
          <button
            key={option}
            type="button"
            onClick={() => handleToggle(option)}
            className={`px-4 py-2 rounded-full border transition-all duration-300
                  ${
                    isSelected
                      ? "bg-accentLight text-white dark:bg-accentDark dark:text-black"
                      : "bg-white text-gray-700 border-gray-300 dark:bg-gray-800 dark:text-white dark:border-gray-600"
                  }
                `}
          >
            {option}
          </button>
        );
      })}
    </div>
  );
};

export default ToggleButtonGroup;
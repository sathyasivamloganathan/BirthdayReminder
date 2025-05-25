import DefaultUser from "../../assets/DefaultUser.jpg";
import Ribbon from "../../assets/ribbon.png";
import { lightColors, darkColors } from "../../utils/colorThemes";
import { getAge, getDateInLetter } from "../../utils/BirthdayUtils.js";

const BirthdayCard = ({ birthday, index, isToday, onClick }) => {
  const randomIndex = Math.floor(Math.random() * lightColors.length);
  const color = lightColors[randomIndex];
  const darkColor = darkColors[randomIndex];

  return (
    <div
      className={`relative flex flex-row gap-4 min-h-[150px] rounded-xl bg-white/80 dark:bg-[#1e293b]/80 border-l-4 ${color.border} dark:${darkColor.border} shadow-lg backdrop-blur-md p-4`}
    >
      {isToday && (
        <img
          src={Ribbon}
          alt="ribbon"
          className="absolute top-[-10px] right-[-15px] w-16 rotate-[45deg] drop-shadow-lg"
        />
      )}
      <div className="w-full" onClick={onClick}>
        <div className="flex flex-row gap-4">
          <img
            src={
              birthday.profileImage?.startsWith("data:image")
                ? birthday.profileImage
                : DefaultUser
            }
            alt={birthday.name}
            className={`w-16 h-16 rounded-full border-2 ${color.border} dark:${darkColor.border} shadow-lg`}
          />
          <div className="flex flex-row justify-between w-full items-center">
            <div>
              <p className="font-semibold text-gray-900 dark:text-white text-lg truncate w-[110px] lg:w-32">
                {birthday.name}
              </p>
              <p className="text-xs text-gray-600 dark:text-gray-400 font-semibold">
                {birthday.relationship}
              </p>
            </div>
            <div
              className={`px-3 py-1 text-xs rounded-full bg-gradient-to-r ${color.from} ${color.to} dark:${darkColor.from} dark:${darkColor.to} text-white shadow-md font-semibold sparkle`}
            >
              {isToday ? "0 days" : `${birthday.remainingDays} days`}
            </div>
          </div>
        </div>
        <div className="flex justify-between mt-4 px-1">
          <div>
            <p className="text-xs text-gray-600 dark:text-gray-400 font-semibold">
              Birthday
            </p>
            <p className="text-sm text-gray-900 dark:text-white font-bold">
              {isToday
                ? getDateInLetter(birthday.birthdayDate)
                : getDateInLetter(birthday.adjustedDate)}
            </p>
          </div>
          <div className="text-right">
            <p className="text-xs text-gray-600 dark:text-gray-400 font-semibold">
              Turning
            </p>
            <p className="text-sm text-gray-900 dark:text-white font-bold">
              {getAge(birthday.birthdayDate)} years
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BirthdayCard;

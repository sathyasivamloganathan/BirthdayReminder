export const getAge = (birthdayDate) => {
  const birthDate = new Date(birthdayDate);
  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();
  const dayDiff = today.getDate() - birthDate.getDate();
  if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) age--;
  return age + 1;
};

export const getDateInLetter = (birthdayDate) => {
  const birthDate = new Date(birthdayDate);
  return birthDate.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

export const getNextUpcomingBirthdays = (birthdays) => {
  const currMonth = new Date().getMonth();
  return birthdays.filter((b) => {
    const personMonth = new Date(b.birthdayDate).getMonth();
    return personMonth > currMonth;
  });
};

export const groupBirthdaysByMonth = (birthdays) => {
  return birthdays.reduce((acc, person) => {
    const month = new Date(person.birthdayDate).getMonth();
    if(!acc[month]) {
      acc[month] = [];
    }
    acc[month].push(person);
    return acc;
  }, {})
};

/* eslint-disable prettier/prettier */
const daysOfWeeks = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
];

const formatTimeComponent = component => {
  return component < 10 ? '0' + component : component;
};

export const messageCreationTimeStamps = (seconds, nanoseconds) => {
  const time = new Date(seconds * 1000 + nanoseconds / 1000000);
  const dayOfYear = time.getFullYear();
  const dayOfMonth = time.getMonth() + 1;
  const dayOfWeek = time.getDay();
  const dayOfDate = time.getDate();
  const hours = time.getHours();
  const minutes = time.getMinutes();
  const second = time.getSeconds();
  const CurrentDate = new Date().getDate();

  const formattedDate = `${formatTimeComponent(
    dayOfDate,
  )}:${formatTimeComponent(dayOfMonth)}:${formatTimeComponent(dayOfYear)}`;
  const formattedTime = `${formatTimeComponent(hours)}:${formatTimeComponent(
    minutes,
  )}:${formatTimeComponent(second)}`;

  if (CurrentDate - 7 <= dayOfDate) {
    const day =
      CurrentDate === dayOfDate
        ? 'Today'
        : CurrentDate - 1 === dayOfDate
        ? 'Yesterday'
        : daysOfWeeks[dayOfWeek];
     return {day, formattedTime};
  } else {
    console.log(formattedDate, formattedTime);
    return {formattedDate, formattedTime};
  }
};

const useDateFormat = (date) => {
  const today = new Date(date);
  const yyyy = today.getFullYear();
  let mm = today.getMonth() + 1; // Months start at 0!
  let dd = today.getDate();

  if (dd < 10) dd = "0" + dd;
  if (mm < 10) mm = "0" + mm;

  return (formattedToday = dd + "/" + mm + "/" + yyyy);
};
export default {useDateFormat};

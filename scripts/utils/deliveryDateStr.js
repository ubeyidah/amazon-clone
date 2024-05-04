export default (addDay, type="days") => {
  const today = dayjs();
  const deliveryDayString = today.add(addDay, type).format("dddd, MMMM D");
  return deliveryDayString;
}
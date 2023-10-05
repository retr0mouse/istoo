export function getCurrentDate() {
  const currentDate = new Date();

  // Get day, month, and year components
  const day = currentDate.getDate().toString().padStart(2, '0');
  const month = (currentDate.getMonth() + 1).toString().padStart(2, '0'); // Months are 0-indexed, so add 1
  const year = currentDate.getFullYear();

  // Combine components in "dd-mm-yyyy" format
  const formattedDate = `${day}-${month}-${year}`;

  return formattedDate;
}
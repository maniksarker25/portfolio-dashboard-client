function formattedDate(isoDate: Date | string): string {
  const date = new Date(isoDate);

  // Check for invalid date
  if (isNaN(date.getTime())) {
    throw new Error("Invalid date format");
  }

  // Define options for formatting
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  // Convert to the desired format
  return date.toLocaleDateString("en-GB", options);
}

export default formattedDate;

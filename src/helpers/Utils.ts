export const capitalizeFirstLetter = (str: string | null) => {
  if (!str) return ""; // Manejar caso nulo
  const stringWithoutQuotes = str.replace(/^"(.*)"$/, "$1");
  return (
    stringWithoutQuotes.charAt(0).toUpperCase() + stringWithoutQuotes.slice(1)
  );
};
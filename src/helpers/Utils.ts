export const capitalizeFirstLetter = (str: string | null) => {
  if (!str) return ""; // Manejar caso nulo
  const stringWithoutQuotes = str.replace(/^"(.*)"$/, "$1");
  return (
    stringWithoutQuotes.charAt(0).toUpperCase() + stringWithoutQuotes.slice(1)
  );
};

export function formatPrice(price: number): string {
  const formattedPrice = new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP", // Código ISO de la moneda (pesos colombianos)
  }).format(price);

  return formattedPrice;
}

const measureTypes = [
  {
    value: "KG",
    label: "Kilogramos",
  },
  {
    value: "UNITS",
    label: "Unidades",
  },
  {
    value: "LITERS",
    label: "Litros",
  },
  {
    value: "POUNDS",
    label: "Libras",
  },
];

export const getUnitLabel = (value: string) => {
  const found = measureTypes.find((type) => type.value === value);
  return found ? found.label : "Unknown";
};

export function formatDate(fechaStr:string): string {
  const fechaCompra = new Date(fechaStr);
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    
  };

  return fechaCompra.toLocaleDateString("es-CO", options);
}

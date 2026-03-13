export const rates = {
  PKR: 1,
  USD: 0.0036,
  EUR: 0.0033
};

export const getCurrency = () => {
  return localStorage.getItem("currency") || "PKR";
};

export const convertCurrency = (amount) => {
  const currency = getCurrency();
  return (amount * rates[currency]).toFixed(2);
};

export const currencySymbol = () => {
  const currency = getCurrency();

  if (currency === "PKR") return "Rs";
  if (currency === "USD") return "$";
  if (currency === "EUR") return "€";

  return "Rs";
};
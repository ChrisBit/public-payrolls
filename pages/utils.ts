const formatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
  minimumFractionDigits: 0,
});

export const formatCurrency = (number) => {
  return formatter.format(number);
};

export const currencySort = (order) => {
  return (obj1, obj2) => {
    console.log(order);
    let val1 = parseInt(obj1.data.replace(/\D/g, ""), 10);
    let val2 = parseInt(obj2.data.replace(/\D/g, ""), 10);
    return (val1 - val2) * (order === "asc" ? 1 : -1);
  };
};

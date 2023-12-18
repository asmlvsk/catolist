export const sortBy = [
  { value: "titleASC", label: "Title ASC" },
  { value: "titleDESC", label: "Title DESC" },
  { value: "tierASC", label: "Tier ASC" },
  { value: "tierDESC", label: "Tier DESC" },
];

export const extractOrderSubstring = (orderName: string | undefined) => {
  let index = orderName?.search(/[A-Z]/); // Find the index of the first uppercase letter
  if (index !== -1) {
    return orderName?.slice(0, index); // Extract the substring before the uppercase letter
  }
  return orderName;
};

export const selectedOrderName = (orderName: string) => {
  const extractedOrderName = extractOrderSubstring(orderName);
  switch (orderName) {
    case `${extractedOrderName}ASC`:
      return true;
    case `${extractedOrderName}DESC`:
      return false;
  }
};

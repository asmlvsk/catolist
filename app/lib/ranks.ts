export const ranks = [
  { value: "S", label: "S-rank" },
  { value: "A", label: "A-rank" },
  { value: "B", label: "B-rank" },
  { value: "C", label: "C-rank" },
  { value: "D", label: "D-rank" },
];

export const tierToNumber = (tier: TierEnum | null) => {
  switch (tier) {
    case "S":
      return 5;
    case "A":
      return 4;
    case "B":
      return 3;
    case "C":
      return 2;
    case "D":
      return 1;
    default:
      return 0;
  }
};

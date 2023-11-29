export const tierColor = (animeTier: TierEnum | null) => {
  switch (true) {
    case animeTier === "S":
      return "orangered";
    case animeTier === "A":
      return "darkorchid";
    case animeTier === "B":
      return "blue";
    case animeTier === "C":
      return "green";
    case animeTier === "D":
      return "dimgray";
  }
};

export const rgbaTierColor = (animeTier: TierEnum | null) => {
  switch (true) {
    case animeTier === "S":
      return "rgba(255, 69, 0, 1)";
    case animeTier === "A":
      return "rgba(153, 50, 204, 1)";
    case animeTier === "B":
      return "rgba(0, 0, 255, 1)";
    case animeTier === "C":
      return "rgba(0, 128, 0, 1)";
    case animeTier === "D":
      return "rgba(105, 105, 105, 1)";
  }
};

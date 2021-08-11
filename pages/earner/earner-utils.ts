export const getStyledEarnerShortName = (earnerName: string): string => {
  return earnerName.toLowerCase().trim().split(" ").join("-");
};

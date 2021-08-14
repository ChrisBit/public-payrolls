export const getStyledEarnerShortName = (earnerName: string): string => {
  return encodeURIComponent(
    earnerName.toLowerCase().trim().split(" ").join("-")
  );
};

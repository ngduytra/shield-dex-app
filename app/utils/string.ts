export const classNames = (...classes: string[]) => {
  return classes.filter(Boolean).join(" ");
};

export const shortAddress = (address?: string, start = 6, end = -4): string => {
  if (!!address) return `${address.slice(0, start)}...${address.slice(end)}`;

  return "";
};

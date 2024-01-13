export const isBefore = (d1, d2) => {
  return d1.getTime() < d2.getTime();
};
export const isAfter = (d1, d2) => {
  return d1.getTime() > d2.getTime();
};

export const isSame = (d1, d2) => {
  return d1.getTime() === d2.getTime();
};

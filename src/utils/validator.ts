export const validator = (conditions) => {
  conditions.forEach(({ checker, errorMessage }) => {
    if (checker()) throw new Error(errorMessage);
  });
};

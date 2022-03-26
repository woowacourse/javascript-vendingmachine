export const getHash = (target?: { location: { href: string } }): string => {
  const {
    location: { href },
  } = target || window;

  return new URL(href).hash;
};

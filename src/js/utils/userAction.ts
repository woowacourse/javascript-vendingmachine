export const getUserInitial = () => {
  const name: string = JSON.parse(localStorage.getItem('user')).name;
  console.log(name);
  return name.slice(0, 1);
};

export const isAuthenticated = () => {
  return !!sessionStorage.getItem("authenticated");
};

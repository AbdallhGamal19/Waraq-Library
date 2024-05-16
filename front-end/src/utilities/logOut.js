const logOut = (navigate) => {
  localStorage.removeItem("token");
  navigate("/logIn");
};
export default logOut;

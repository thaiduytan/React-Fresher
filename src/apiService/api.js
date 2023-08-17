import axios from "../utils/axios-customize";

const callRegister = (fullName, email, password, phone) => {
  return axios.post("/api/v1/user/register", {
    fullName,
    email,
    password,
    phone,
  });
};
const callLogin = (username, password, delay = 0) => {
  return axios.post("/api/v1/auth/login", { username, password, delay });
};
export { callRegister, callLogin };

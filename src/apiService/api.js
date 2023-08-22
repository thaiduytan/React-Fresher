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

// xử dụng callFetchAcount để gửi  Authorization: `bearer` thông qua file axios-customize
// mục đich nhận lại data để truyền lên lại cho redux
const callFetchAccount = () => {
  return axios.get("/api/v1/auth/account");
};

const callLogOut = () => {
  return axios.post("/api/v1/auth/logout");
};

const callFetchListUserWithPaginate = (current = 1, pageSize = 3) => {
  return axios.get(`/api/v1/user?current=${current}&pageSize=${pageSize}`);
};

export {
  callRegister,
  callLogin,
  callFetchAccount,
  callLogOut,
  callFetchListUserWithPaginate,
};

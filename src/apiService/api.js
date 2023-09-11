import axios from "../utils/axios-customize";

// -------------------------------------------user ------------------------------------

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

const callFetchListUserWithPaginate = (query) => {
  return axios.get(`/api/v1/user?${query}`);
};

const callCreateAUser = (fullName, password, email, phone) => {
  return axios.post(`/api/v1/user`, {
    fullName,
    password,
    email,
    phone,
  });
};

// chuyền raw data
const callBulkCreateUser = (data) => {
  return axios.post("/api/v1/user/bulk-create", data);
};

const callUpdateUser = (_id, fullName, phone) => {
  return axios.put("/api/v1/user", { _id, fullName, phone });
};

const callDeleteUser = (_id) => {
  return axios.delete(`/api/v1/user/${_id}`);
};

// -------------------------------------------book ------------------------------------
const callFetchListBookWithPaginate = (query) => {
  // return axios.get(/api/v1/book?current=1&pageSize=10&mainText=/How The Body/i)
  return axios.get(`/api/v1/book?${query}`);
};

const callFetchCategory = () => {
  return axios.get("/api/v1/database/category");
};

// form-data
const callUploadImageBook = (fileImg) => {
  const formData = new FormData();
  formData.append("fileImg", fileImg);
  return axios({
    method: "post",
    url: "/api/v1/file/upload",
    data: formData,
    headers: {
      "Content-Type": "multipart/form-data",
      "upload-type": "book",
    },
  });
};

// raw data : cach 2
const callCreateABook = (
  thumbnail,
  slider,
  mainText,
  author,
  price,
  sold,
  quantity,
  category
) => {
  return axios.post("/api/v1/book", {
    thumbnail,
    slider,
    mainText,
    author,
    price,
    sold,
    quantity,
    category,
  });
};

const callDeleteBook = (_id) => {
  return axios.delete(`/api/v1/book/${_id}`);
};

// raw
const callUpdateBook = (_id, raw) => {
  return axios.put(`/api/v1/book/${_id}`, raw);
};

// -------------------------------------------HOME PAGE ------------------------------------
const callGetBookDetailById = (_id) => {
  return axios.get(`/api/v1/book/${_id}`);
};

// raw
const callCreateAnOrder = (order) => {
  return axios.post(`/api/v1/order`, { ...order });
};

const callFetchHistoryWithPaginate = (query) => {
  // return axios.get(/api/v1/book?current=1&pageSize=10&mainText=/How The Body/i)
  return axios.get(`/api/v1/order?${query}`);
};
export {
  callRegister,
  callLogin,
  callFetchAccount,
  callLogOut,
  callFetchListUserWithPaginate,
  callCreateAUser,
  callBulkCreateUser,
  callUpdateUser,
  callDeleteUser,
  callFetchListBookWithPaginate,
  callFetchCategory,
  callUploadImageBook,
  callCreateABook,
  callDeleteBook,
  callUpdateBook,
  callGetBookDetailById,
  callCreateAnOrder,
  callFetchHistoryWithPaginate,
};

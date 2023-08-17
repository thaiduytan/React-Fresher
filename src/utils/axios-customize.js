import axios from "axios";

// import file .env ( khai báo url call api bên file .env)
const baseURL = import.meta.env.VITE_BACKEND_URL;

// instance ----------------------------------------------------
const instance = axios.create({
  baseURL: baseURL,
  // Make Axios send cookies in its requests automatically ( GG : )
  withCredentials: true,
});

// sending the bearer token with axios ( GG )
// KHI RESET TRANG, SẼ MẤT STATE CỦA REDUX, SỬ DỤNG CÁCH GỬI ACCESS_TOKEN LÊN LẠI thông qua localStorage
// KHI reload TRANG (FILE APP.JSX - USEEFFECT) sẽ GỬI LẠI ACCESS ĐỂ LẤY LẠI THÔNG TIN CỦA USER.
instance.defaults.headers.common = {
  Authorization: `Bearer ${localStorage.getItem("access_token")}`,
};

// interceptor axios -------------------------------------------------
// Add a request interceptor
instance.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
instance.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response && response.data ? response.data : response;
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return error?.response?.data ?? Promise.reject(error);
  }
);

export default instance;

import axios from "axios";

// import file .env ( khai báo url call api bên file .env)
const baseURL = import.meta.env.VITE_BACKEND_URL;

// instance ----------------------------------------------------
const instance = axios.create({
  baseURL: baseURL,
  // Make Axios send cookies in its requests automatically ( GG : )
  withCredentials: true,
});

const updateToken = async () => {
  const res = await instance.get("/api/v1/auth/refresh");
  return res.data.access_token;
};

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

// Axios Retry Infinite Loop - trường hợp lỗi api trả về error 401 liên tục, thì biến NO_RETRY_HEADER
// sẽ có tác dụng ngưng lại việc call api refresh_token - chỉ refresh 1 lần mà thôi.
// https://stackoverflow.com/questions/73363862/axios-retry-infinite-loop ( GG )
const NO_RETRY_HEADER = "x-no-retry";

// Add a response interceptor
instance.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response && response.data ? response.data : response;
  },
  async function (error) {
    // console.log(error);
    // axios retry refresh token
    // THU VIEN : https://www.npmjs.com/package/axios-retry
    // https://github.com/axios/axios/issues/934 ( GG )  =>>>> {
    if (
      error.config &&
      error.response &&
      +error.response.status === 401 &&
      !error.config.headers[NO_RETRY_HEADER]
    ) {
      const access_token = await updateToken();
      // gán NO_RETRY_HEADER bằng true để headers[x-no-retry] không còn rỗng
      // , để làn sau không chạy vào hàm if dòng 54 nửa
      error.config.headers[NO_RETRY_HEADER] = "true";
      if (access_token) {
        error.config.headers.Authorization = `Bearer ${access_token}`;
        localStorage.setItem("access_token", access_token);
        return instance.request(error.config);
      }
    }
    //  }

    // trường hợp hết hạn refresh_token / chuyển người dùng về login =  () =>>>> {
    if (
      error.config &&
      error.response &&
      +error.response.status === 400 &&
      error.config.url === "/api/v1/auth/refresh"
    ) {
      window.location.href = "/auth/login";
    }
    // }

    return error?.response?.data ?? Promise.reject(error);
  }
);

export default instance;

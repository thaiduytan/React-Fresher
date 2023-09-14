import { combineReducers, configureStore } from "@reduxjs/toolkit";
import counterReducer from "../redux/counter/counterSlice";
import accountReducer from "../redux/account/accountSlice";
import orderReducer from "../redux/order/orderSlice";

import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import createTransform from "redux-persist/es/createTransform";

// Định nghĩa một hàm transform để chỉ định cách lưu trữ 'isLoggedIn' trong reducer 'account'
const accountTransform = createTransform(
  (inboundState, key) => {
    // Xác định logic lấy giá trị 'isLoggedIn' từ inboundState
    const isLoggedIn = inboundState.isLoggedIn;
    return { ...inboundState, isLoggedIn };
  },
  (outboundState, key) => {
    // Xác định logic gán lại giá trị 'isLoggedIn' cho reducer 'account'
    return { ...outboundState, isLoggedIn: outboundState.isLoggedIn };
  },
  { whitelist: ["account"] } // Áp dụng transform cho reducer 'account' mà bạn muốn
);

const persistConfig = {
  key: "root",
  version: 1,
  storage,
  // Sử dụng transform đã định nghĩa để lưu trữ 'isLoggedIn' trong 'account'
  transforms: [accountTransform],
  // Loại bỏ reducer 'account' khỏi danh sách blacklist
  blacklist: ["account"],
};

// Tổng QUAN FILE NÀY ĐANG CÂẤU HÌNH  Redux-Persist
// FIXX LẠI TỪ FILE REDUX THƯỜNG SANG  Redux-Persist
// ĐOẠN CODE TRƯỚC KHI FIXX NẰM DƯỚI CÙNG
// LINK TÍCH HỢP Redux-Persist   https://redux-toolkit.js.org/usage/usage-guide#use-with-redux-persist
//                               https://www.npmjs.com/package/redux-persist

const rootReducer = combineReducers({
  counter: counterReducer,
  account: accountReducer,
  order: orderReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

let persistor = persistStore(store);

export { store, persistor };

// export const store = configureStore({
//   reducer: {
//     counter: counterReducer,
//     account: accountReducer,
//   },
// });

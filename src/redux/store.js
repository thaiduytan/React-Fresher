import { combineReducers, configureStore } from "@reduxjs/toolkit";
import counterReducer from "../redux/counter/counterSlice";
import accountReducer from "../redux/account/accountSlice";
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

// Tổng QUAN FILE NÀY ĐANG CÂẤU HÌNH  Redux-Persist
// FIXX LẠI TỪ FILE REDUX THƯỜNG SANG  Redux-Persist
// ĐOẠN CODE TRƯỚC KHI FIXX NẰM DƯỚI CÙNG
// LINK TÍCH HỢP Redux-Persist   https://redux-toolkit.js.org/usage/usage-guide#use-with-redux-persist
//                               https://www.npmjs.com/package/redux-persist

const persistConfig = {
  key: "root",
  version: 1,
  storage,
  blacklist: ["account"], // account will not be persisted ( Không lưu  account: accountReducer vào localStore)
};

const rootReducer = combineReducers({
  counter: counterReducer,
  account: accountReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);

// export const store = configureStore({
//   reducer: {
//     counter: counterReducer,
//     account: accountReducer,
//   },
// });

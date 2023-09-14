import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { callLogOut } from "../../apiService/api";

const initialState = {
  isAuthenticated: false,
  isLoading: true,
  tempAvatar: "",
  user: {
    email: "",
    phone: "",
    fullName: "",
    role: "",
    avatar: "",
    id: "",
  },
};

export const doLogOutAccount_cachHai = createAsyncThunk(
  "account/fetchUserById",
  async () => {
    const res = await callLogOut();
    if (res && res.data) {
      return res.data;
    }
  }
);

export const accountSlice = createSlice({
  name: "account",
  initialState,
  reducers: {
    doLoginAction: (state, action) => {
      state.isLoggedIn = true;
      state.isLoading = false;
      state.isAuthenticated = true;
      state.user = action.payload;
    },
    doGetAccountAction: (state, action) => {
      state.isLoading = false;
      state.isAuthenticated = true;
      state.user = action.payload.user;
    },
    doLogOutAccount_cachMot: (state) => {
      localStorage.removeItem("access_token");
      state.isAuthenticated = false;
      state.user = {
        email: "",
        phone: "",
        fullName: "",
        role: "",
        avatar: "",
        id: "",
      };
    },
    doUploadAvatarAction: (state, action) => {
      state.tempAvatar = action.payload.avatar;
    },
    doUpdateUserInfo: (state, action) => {

      // console.log("action:", state.user.avatar);

      state.user.avatar = action.payload.avatar;
      state.user.fullName = action.payload.fullName;
      state.user.phone = action.payload.phone;
    },
  },
  extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder.addCase(doLogOutAccount_cachHai.fulfilled, (state, action) => {
      // Add user to the state array
      localStorage.removeItem("access_token");
      state.isAuthenticated = false;
      state.user = {
        email: "",
        phone: "",
        fullName: "",
        role: "",
        avatar: "",
        id: "",
      };
    });
  },
});

export const {
  doLoginAction,
  doGetAccountAction,
  doLogOutAccount_cachMot,
  doUploadAvatarAction,
  doClearAvatarTemp,
  doUpdateUserInfo,
} = accountSlice.actions;

export default accountSlice.reducer;

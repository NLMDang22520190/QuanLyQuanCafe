import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../AxiosInstance/AxiosInstance"
import { jwtDecode } from "jwt-decode";
import { setAuthCookies, getAuthCookies, clearAuthCookies } from "../Cookies/CookiesHelper";
import { fetchCartDetailsByCustomerId, clearCart } from '../Cart/Cart'; // Import action từ cart reducer
import { useDispatch } from "react-redux";

import axios from "axios";

// API endpoint
const API_URL = '/api/account';
const authCookies = getAuthCookies();

// Thunk để xử lý đăng nhập
export const login = createAsyncThunk('Auth/Login', async (credentials, thunkAPI) => {
  try {
    const response = await api.post(`${API_URL}/SignIn`, credentials); // Gọi API SignIn
  //  console.log(response.data);
    const { jwtToken } = response.data;

    // Decode token để lấy userId và userRole
    const decodedToken = jwtDecode(jwtToken);
    const userId = decodedToken["user-id"];
    const userRole = decodedToken["role"];

    // Lưu vào cookies
    setAuthCookies(userId, jwtToken, userRole);
    // Gọi action fetchCartDetailsByCustomerId sau khi login thành công
    thunkAPI.dispatch(fetchCartDetailsByCustomerId(userId));

    return { userId, userRole, token: jwtToken }; // Trả về dữ liệu đã xử lý
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data || "Có lỗi xảy ra");
  }
});

// Slice quản lý trạng thái auth
const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: authCookies.userID || null,
    token: authCookies.token || null,
    userRole: authCookies.userRole || null,
    isAuthenticated: !!authCookies.token,
    status: "idle", // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null,
  },
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.userRole = null;
      state.isAuthenticated = false;
      clearAuthCookies(); // Xóa cookies khi logout
      
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user = action.payload.userId;
        state.token = action.payload.token;
        state.userRole = action.payload.userRole;
        state.isAuthenticated = true;
        state.error = null;
      })
      .addCase(login.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
      
  },
});

// Export các action và reducer
export const { logout } = authSlice.actions;
export default authSlice.reducer;
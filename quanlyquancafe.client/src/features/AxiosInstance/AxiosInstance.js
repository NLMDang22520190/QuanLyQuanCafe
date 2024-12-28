import axios from "axios";
import { getAuthCookies, clearAuthCookies } from "../Cookies/CookiesHelper";

// Tạo instance của Axios
const instance = axios.create({
  baseURL: "https://localhost:7087/", // URL của API backend
  timeout: 15000, // Thời gian chờ tối đa cho mỗi request (ms)
  headers: {
    "Content-Type": "application/json; charset=utf-8", // Header mặc định cho các request
  },
});

// Interceptor để thêm token vào header request
instance.interceptors.request.use(
  (config) => {
    const authCookies = getAuthCookies(); // Lấy token từ cookie
    if (authCookies.token) {
      config.headers["Authorization"] = `Bearer ${authCookies.token}`;
    }
    return config;
  },
  (error) => {
    console.error("Request error:", error);
    return Promise.reject(error); // Xử lý lỗi trong request
  }
);

// Interceptor để xử lý response
instance.interceptors.response.use(
  (response) => {
    // Xử lý các response có mã trạng thái từ 2xx
    return response;
  },
  (error) => {
    // Xử lý lỗi cho các mã trạng thái không thuộc 2xx
    if (error.response) {
      const { status } = error.response;

      if (status === 401) {
        console.warn("Unauthorized: Token không hợp lệ hoặc đã hết hạn.");
        clearAuthCookies(); // Xóa cookie nếu token hết hạn
        // Có thể điều hướng người dùng tới trang đăng nhập nếu cần
        window.location.href = "/auth/login";
      } else if (status === 403) {
        console.error("Forbidden: Người dùng không có quyền truy cập.");
      } else {
        console.error(`API error (Status ${status}):`, error.response);
      }
    } else {
      console.error("Network or server error:", error.message);
    }

    return Promise.reject(error); // Trả về lỗi để xử lý tiếp ở phần gọi API
  }
);

// Export Axios instance để sử dụng trong ứng dụng
export default instance;

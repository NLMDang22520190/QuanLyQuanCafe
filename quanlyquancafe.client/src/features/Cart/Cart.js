import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../AxiosInstance/AxiosInstance';

// URL API base
const apiBaseUrl = '/api/Cart';

// Async thunk để lấy dữ liệu giỏ hàng theo CustomerId
export const fetchCartDetailsByCustomerId = createAsyncThunk(
  'cart/fetchCartDetailsByCustomerId',
  async (customerId, { rejectWithValue }) => {
    try {
      const response = await api.get(`${apiBaseUrl}/GetCartDetailsByCustomerId/${customerId}`);
      return response.data; // Trả về dữ liệu từ API
    } catch (error) {
      return rejectWithValue(error.response ? error.response.data : error.message);
    }
  }
);

// Async actions (API calls)
export const addItemToCart = createAsyncThunk(
  'cart/addItemToCart',
  async (itemData, { rejectWithValue }) => {
    try {
      const response = await api.post(`${apiBaseUrl}/AddItemToCart`, itemData);
      return response.data; // API trả về item vừa thêm
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Something went wrong');
    }
  }
);

export const updateItemInCart = createAsyncThunk(
  'cart/updateItemInCart',
  async (updateData, { rejectWithValue }) => {
    try {
      const response = await api.put(`${apiBaseUrl}/UpdateItemInCart`, updateData);
      return response.data; // API trả về item sau khi cập nhật
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Something went wrong');
    }
  }
);

export const deleteItemFromCart = createAsyncThunk(
  'cart/deleteItemFromCart',
  async (cartDetailId, { rejectWithValue }) => {
    try {
      const response = await api.delete(`${apiBaseUrl}/DeleteItemFromCart/${cartDetailId}`);
      return cartDetailId; // Trả về ID của item vừa bị xóa
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Something went wrong');
    }
  }
);

// Initial state
const initialState = {
  items: [],
  status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
};

// Cart slice
const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    clearCart(state) {
      state.items = [];
    },
  },
  extraReducers: (builder) => {
    // Fetch cart details
    builder
      .addCase(fetchCartDetailsByCustomerId.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchCartDetailsByCustomerId.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload; // Cập nhật danh sách items từ API
      })
      .addCase(fetchCartDetailsByCustomerId.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });

    // Add item to cart
    builder
      .addCase(addItemToCart.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(addItemToCart.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items.push(action.payload); // Thêm item vào state
      })
      .addCase(addItemToCart.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });

    // Update item in cart
    builder
      .addCase(updateItemInCart.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateItemInCart.fulfilled, (state, action) => {
        state.status = 'succeeded';
        const updatedItem = action.payload;
        const index = state.items.findIndex((item) => item.cartDetailId === updatedItem.cartDetailId);
        if (index !== -1) {
          state.items[index] = updatedItem; // Cập nhật item
        }
      })
      .addCase(updateItemInCart.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });

    // Delete item from cart
    builder
      .addCase(deleteItemFromCart.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(deleteItemFromCart.fulfilled, (state, action) => {
        state.status = 'succeeded';
        const cartDetailId = action.payload;
        state.items = state.items.filter((item) => item.cartDetailId !== cartDetailId); // Xóa item khỏi state
      })
      .addCase(deleteItemFromCart.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

// Export actions
export const { clearCart } = cartSlice.actions;

// Export reducer
export default cartSlice.reducer;

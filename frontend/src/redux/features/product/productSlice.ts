import { toast } from 'react-hot-toast';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import productService from './productService';

const initialState = {
  product: null,
  products: [],
  isError: false,
  isSuccess: false,
  isLoading:false,
  message: "",
  totalStoreValue: 0,
  outOfStock: 0,
  category: []

}
// Create new product 
export const createProduct = createAsyncThunk(
  "products/create",
  async (formData, thunkAPI) => {
    try {
      return await productService.createProduct(formData)
    } catch (error: any) {
      const message =
        (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString();
      console.log(message);
      return thunkAPI.rejectWithValue(message)
    }
  }
)
// Get all products
export const getProducts = createAsyncThunk(
  "products/getAll",
  async (_, thunkAPI) => {
    try {
      const data = await productService.getProducts()

      return data;
    } catch (error: any) {
      const message =
        (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString();
      console.log(message);
      return thunkAPI.rejectWithValue(message)
    }
  }
)
// Get a product
export const getProduct = createAsyncThunk(
  "products/getProduct",
  async (id, thunkAPI) => {
    try {
      return await productService.getProduct(id);
    } catch (error: any) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      console.log(message);
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Update product
export const updateProduct = createAsyncThunk(
  "products/updateProduct",
  async (formData, thunkAPI) => {
    try {
      //update to dynamic id
      let id: any = ""
      const data: any = await productService.updateProduct(id, formData)
      console.log(data)
    } catch (error: any) {
      const message =
        (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString();
      console.log(message);
      return thunkAPI.rejectWithValue(message)
    }
  }
)
// Delete a product
export const deleteProduct = createAsyncThunk(
  "products/delete",
  async (id, thunkAPI) => {
    try {
      const data = await productService.deleteProduct(id)

      return data;
    } catch (error: any) {
      const message =
        (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString();
      console.log(message);
      return thunkAPI.rejectWithValue(message)
    }
  }
)

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    CALC_STORE_VALUE(state, action) {
      const products = action.payload;
      const array: number[] = []
      products.map((item: { price: any; quantity: any; }) => {
        const { price, quantity } = item
        const productValue = price * quantity
        return array.push(productValue)
      })
      const totalValue = array.reduce((a, b) => {
        return a + b
      }, 0)

      return {
        ...state,
        totalStoreValue: totalValue
      }
    },
    CALC_OUTOFSTOCK(state, action) {
      const products = action.payload;
      const array: any = []
      products.map((item: any) => {
        const { quantity } = item

        return array.push(quantity)
      });
      let count = 0
      array.forEach((number: any) => {
        if (number === 0 || number === "0") {
          count += 1
        }
      })
      return {
        ...state,
        outOfStock: count
      }
    },
    CALC_CATEGORY(state: any, action: any) {
      const products = action.payload;
      const array: any = []
      products.map((item: any) => {
        const { category } = item

        return array.push(category)
      });
      // const uniqueCategory = [...new Set(array)]
      return {
        ...state,
        category: array
      }
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(createProduct.pending, (state: any) => {
        state.isLoading = true
      })
      .addCase(createProduct.fulfilled, (state: any, action: any) => {
        state.isLoading = false
        state.isSuccess = true;
        state.isError = false;
        console.log(action.payload);
        state.products.push(action.payload);
        toast.success("Product added successfuly")
      })
      .addCase(createProduct.rejected, (state: any, action: any) => {
        state.isLoading = false
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload)
      })
      .addCase(getProducts.pending, (state: any) => {
        state.isLoading = true
      })
      .addCase(getProducts.fulfilled, (state: any, action) => {
        state.isLoading = false
        state.isSuccess = true;
        state.isError = false;
        console.log(action.payload);
        state.products = action.payload;
      })
      .addCase(getProducts.rejected, (state: any, action: any) => {
        state.isLoading = false
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload)
      })
      .addCase(getProduct.pending, (state: any) => {
        state.isLoading = true;
      })
      .addCase(getProduct.fulfilled, (state: any, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.product = action.payload;
      })
      .addCase(getProduct.rejected, (state: any, action: any) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
      })
      .addCase(deleteProduct.pending, (state: any) => {
        state.isLoading = true
      })
      .addCase(deleteProduct.fulfilled, (state: any, action: any) => {
        state.isLoading = false
        state.isSuccess = true;
        state.isError = false;
        toast.success("Product deleted successfully")
      })
      .addCase(deleteProduct.rejected, (state: any, action: any) => {
        state.isLoading = false
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload)
      })
      .addCase(updateProduct.pending, (state: any) => {
        state.isLoading = true
      })
      .addCase(updateProduct.fulfilled, (state: any, action) => {
        state.isLoading = false
        state.isSuccess = true;
        state.isError = false;
        toast.success("Product updated successfully")
      })
      .addCase(updateProduct.rejected, (state: any, action: any) => {
        state.isLoading = false
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload)
      })
  }
});

export const { CALC_STORE_VALUE, CALC_OUTOFSTOCK, CALC_CATEGORY } = productSlice.actions;
export const selectIsLoading = (state: { product: { isLoading: any; }; }) => state.product.isLoading;
export const selectProduct = (state: { product: { product: any; }; }) => state.product.product;
export const selectTotalStoreValue = (state: { product: { totalStoreValue: any; }; }) => state.product.totalStoreValue;
export const selectOutOfStock = (state: { product: { outOfStock: any; }; }) => state.product.outOfStock;
export const selectCategory = (state: { product: { category: any; }; }) => state.product.category;

export default productSlice.reducer
import axios from "axios";

// interface formDataState {
//   name: string,
//   email: string,
//   photo: string,
//   phone: string,
//   bio: string
// }

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API_URL = `${BACKEND_URL}/api/products/`

//Create new product
const createProduct = async (formData: any) => {
  const response = await axios.post(API_URL, formData);
  return response.data;
}

//Get all products
const getProducts = async () => {
  const response = await axios.get(API_URL);
  return response.data;
}

//Delete a product
const deleteProduct = async (id: any) => {
  const response = await axios.delete(API_URL + id);
  return response.data;
}
//Update Product
const updateProduct = async (id: any, formData: any) => {
  const response = await axios.patch(`${API_URL}${id}`, formData);
  return response.data;
}
// Get a Product
const getProduct = async (id: any) => {
  const response = await axios.get(API_URL + id);
  return response.data;
};

const productService = {
  createProduct,
  getProducts,
  deleteProduct,
  getProduct,
  updateProduct
}

export default productService
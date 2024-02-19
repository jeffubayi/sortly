import axios from "axios";
import { toast } from "react-hot-toast";
import generateOTP from "../utility/generateOTP"

export const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

const OTP_Code = generateOTP()
export const validateEmail = (email: string) => {
  return email.match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)
}

// const token: any = JSON.parse(
//   (typeof window !== undefined &&
//     window.localStorage.getItem("token"))
// );
// const token: any = typeof window !== "undefined" && window.localStorage.getItem("token")

// const config = {
//   headers: { Authorization: `Bearer ${token}` }
// };

//Register User
export const registerUser = async (userData: any) => {
  try {
    const response = await axios.post(
      `${BACKEND_URL}/api/users/register`,
      userData,
      { withCredentials: true }
    );

    if (response.statusText === "OK") {
      toast.success("User Registered Successfully");
    }
    return response.data;
  } catch (error: any) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    toast.error(message)
  }
};

//OTP verification
export const sendOTP = async (recipients: any, message?: any) => {
  try {
    const response = await axios.post(
      `${BACKEND_URL}/api/sms`,
      {
        message: `Your Verification Code is ${OTP_Code}`,
        recipients: [recipients.split(" ").join("")]
      }
    )
    toast.success(response.data.message);
    return OTP_Code
  } catch (error: any) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    toast.error(message)
  }
};


//Login User
export const loginUser = async (userData: any) => {
  try {
    const response = await axios.post(
      `${BACKEND_URL}/api/users/login`,
      userData,
    );

    if (response.statusText === "OK") {
      toast.success(`Successful sign in with ${response.data.name}`);
    }
    return response.data;
  } catch (error: any) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    toast.error(message)
  }
};
//Logout User
export const logoutUser = async () => {
  try {
    const response = await axios.get(
      `${BACKEND_URL}/api/users/logout`
    );
    return response.data

  } catch (error: any) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    toast.error(message)
  }
};

//Forgot Password
export const forgotPassword = async (userData: any) => {
  try {
    const response = await axios.post(
      `${BACKEND_URL}/api/users/forgotpassword`, userData
    );
    toast.success(response.data.message)

  } catch (error: any) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    toast.error(message)
  }
};
//Reset Password
export const resetPassword = async (userData: any, resetToken: string) => {
  try {
    const response = await axios.put(
      `${BACKEND_URL}/api/users/resetpassword/${resetToken}`, userData
    );
    return response.data;

  } catch (error: any) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    toast.error(message)
  }
};
//Get Login Status
export const getLoginStatus = async () => {
  try {
    const response = await axios.get(
      `${BACKEND_URL}/api/users/loggedIn`
    );
    return response.data;

  } catch (error: any) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    toast.error(message)
  }
};
//Get User Profile
export const getUser = async () => {
  try {
    const response = await axios.get(
      `${BACKEND_URL}/api/users/getuser`
    );
    return response.data;

  } catch (error: any) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    toast.error(message)
  }
};
//Update Profile
export const updateUser = async (formData: any) => {
  try {
    const response = await axios.patch(
      `${BACKEND_URL}/api/users/updateuser`, formData
    );
    return response.data;

  } catch (error: any) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    toast.error(message)
  }
};

//Change password
export const changePassword = async (formData: any) => {
  try {
    const response = await axios.patch(
      `${BACKEND_URL}/api/users/changepassword`, formData
    );
    return response.data;

  } catch (error: any) {
    const message =
      (error?.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    toast.error(message)
  }
};
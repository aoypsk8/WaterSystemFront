// import { useDispatch } from "react-redux";
import Swal from "sweetalert2";
import { login,logout } from "../slice/userSlice";
import { doLogin, doRegister } from "./authApi";

export const loginUser = (username, password) => async (dispatch) => {
  try {
    const user = await doLogin(username, password);
    if (user.status == "ok") {
      Swal.fire("Login !", user.message, "success");
      console.log(user.user.location);
      localStorage.setItem("token", user.token);
      localStorage.setItem("location", user.user[0].location);
      localStorage.setItem("role", user.user[0].role);
      dispatch(login(user));
      return true;
    } else {
      Swal.fire(user.message);
      return false;
    }
  } catch (error) {
    Swal.fire(error.message);
    return false;
  }
};

export const registerUser =
  (username, phoneNumber, password, email) => async (dispatch) => {
    try {
      await doRegister(username, phoneNumber, password, email);
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  };

export const logoutUser = () => async (dispatch) => {
  try {
    dispatch(logout());
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};

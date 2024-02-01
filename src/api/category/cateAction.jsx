// import { useDispatch } from "react-redux";
import Swal from "sweetalert2";
import { getAllCate } from "./cateApi";
import { addCate } from "../../slice/cateSlice";

export const GetAllCategory = () => async (dispatch) => {
  try {
    const cate = await getAllCate();
    console.log(cate.categorys[0].images);
    // img.value = "$http://localhost:3000/uploads/images/${cate.categorys[0].images}";
    if (cate.status == "ok") {
      dispatch(addCate(cate.categorys));
      return true;
    } else {
      return false;
    }
  } catch (error) {
    Swal.fire(error.message);
    return false;
  }
};

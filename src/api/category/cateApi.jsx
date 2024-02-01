import axios from "axios";
import Swal from "sweetalert2";

export const getAllCate = async () => {
  const response  = await axios.get("http://localhost:3000/api/category/getAll");
  console.log(`response ${response}`);

  return response.data;
};

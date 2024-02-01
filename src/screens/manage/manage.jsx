import React, { useEffect, useState } from "react";
import Navbar from "../../nav/Navbar";
import { useDispatch, useSelector } from "react-redux";
import notenought from "../../assets/not.png";
import {
  DecreaseProduct,
  GetAllProduct,
  IncreaseProduct,
  SearchProduct,
  SearchProductEdit,
} from "../../api/product/productAction";
import Swal from "sweetalert2";
const Manage = () => {
  const { productedit } = useSelector((state) => state.productedit);
  const { product } = useSelector((state) => state.product);
  const dispatch = useDispatch();
  const location = localStorage.location;
  const role = localStorage.role;

  const [refresh, setRefresh] = useState(false);

  const Decrease = (stock, productId) => {
    Swal.fire({
      title: "ຫລຸດສິນຄ້າລົງ ?",
      text: "ທ່ານຕ້ອງການຫລຸດສິນຄ້າລົງ !",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "ຫລຸດສິນຄ້າລົງ",
      cancelButtonText: "ຍົກເລິກ",
    }).then((result) => {
      if (result.isConfirmed) {
        if (stock >= 0) {
          setRefresh(true);
          dispatch(DecreaseProduct(stock, productId));
          Swal.fire("ສຳເລັດ!", "ຫລຸດສິນຄ້າລົງສຳເລັດ.", "success");
        } else {
          Swal.fire("ເກີດຂໍ້ຜິດພາດ!", "ສິນຄ້າຫມົດແລ້ວ.", "warning");
        }
      }
    });
  };
  const Increase = (stock, productId) => {
    Swal.fire({
      title: "ເພີ່ມສິນຄ້າລົງ ?",
      text: "ທ່ານຕ້ອງການເພີ່ມສິນຄ້າລົງ !",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "ເພີ່ມສິນຄ້າລົງ",
      cancelButtonText: "ຍົກເລິກ",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(IncreaseProduct(stock, productId));
        setRefresh(true); 
        Swal.fire("ສຳເລັດ!", "ເພີ່ມສິນຄ້າລົງສຳເລັດ.", "success");
      }
    });
  };

  const [isOpen, setIsOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState("");

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleItemClick = (item) => {
    setSelectedItem(item);
    setIsOpen(false);
    console.log(item);
    dispatch(SearchProduct(item));
  };

  useEffect(() => {
    dispatch(SearchProductEdit(location));
    dispatch(GetAllProduct());
    if (refresh) {
      setRefresh(false);
    }
  }, [location, refresh]);
  return (
    <div className="w-screen h-screen ">
      <Navbar />
      {role === "Admin" ? (
        product != null ? (
          <div className="">
            <div className="relative px-7 py-3 ">
              <button
                onClick={toggleDropdown}
                className=" py-2 rounded-md w-[45%] bg-gray-200 text-gray-800"
              >
                {selectedItem || "ເລືອກເມືອງ"}
              </button>
              {isOpen && (
                <div className="mx-2 absolute top-full left-0 mt-1 w-[50%] bg-white border border-gray-300 rounded-md shadow-lg z-10">
                  <div
                    className="flex justify-center items-center py-2 cursor-pointer hover:bg-gray-100"
                    onClick={() => handleItemClick("ເມືອງໄຊທານີ")}
                  >
                    ເມືອງໄຊທານີ
                  </div>
                  <div
                    className="flex justify-center items-center py-2 cursor-pointer hover:bg-gray-100"
                    onClick={() => handleItemClick("ເມືອງຫາດຊາຍຟອງ")}
                  >
                    ເມືອງຫາດຊາຍຟອງ
                  </div>
                  <div
                    className="flex justify-center items-center py-2 cursor-pointer hover:bg-gray-100"
                    onClick={() => handleItemClick("ເມືອງໄຊເສດຖາ")}
                  >
                    ເມືອງໄຊເສດຖາ
                  </div>
                  <div
                    className="flex justify-center items-center py-2 cursor-pointer hover:bg-gray-100"
                    onClick={() => handleItemClick("ເມືອງໄຊຍະບູລີ")}
                  >
                    ເມືອງໄຊຍະບູລີ
                  </div>
                </div>
              )}
            </div>
            <div className="flex mx-5 justify-between flex-wrap">
              {product.map((product) => (
                <div
                  className="mx-2 pb-2 rounded-lg w-[45%] bg-gray-200  my-2 "
                  key={product.id}
                >
                  {product.stock > 0 ? (
                    <img
                      src={`http://localhost:3000/uploads/images/${product.images}`}
                      alt="Image"
                      className="fit-cover h-40 w-full p-2 rounded-2xl"
                    />
                  ) : (
                    <img
                      src={notenought}
                      alt="Image"
                      className="fit-cover h-40 w-full p-2 rounded-2xl"
                    />
                  )}
                  <div className="px-2 ">
                    <div className="flex justify-between">
                      <p className="font-bold">{product.productName}</p>
                      <p>
                        ຍັງ(<span className="font-bold ">{product.stock}</span>)
                      </p>
                    </div>
                    <p className="description truncate text-gray-500 text-sm">
                      {product.description}
                    </p>
                    <p className="description truncate text-gray-700 text-sm">
                      {product.location}
                    </p>
                    <div className="flex justify-between">
                      <p className="font-bold ">
                        {new Intl.NumberFormat("lo-LA", {
                          style: "currency",
                          currency: "LAK",
                        }).format(product.price)}
                      </p>
                      <div
                        className="w-7 f-7 bg-red-300 rounded-2xl flex justify-center items-center font-bold text-gray-900"
                        onClick={() => Decrease(product.stock, product.id)}
                      >
                        -
                      </div>
                      <div
                        className="w-7 f-7 bg-red-300 rounded-2xl flex justify-center items-center font-bold text-gray-900"
                        onClick={() => Increase(product.stock, product.id)}
                      >
                        +
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="flex justify-center mt-10">Product Not found </div>
        )
      ) : productedit != null ? (
        <div className="flex mx-5 justify-between flex-wrap">
          {productedit.map((product) => (
            <div
              className="mx-2 pb-2 rounded-lg w-[45%] bg-gray-200  my-2 "
              key={product.id}
            >
              {product.stock > 0 ? (
                <img
                  src={`http://localhost:3000/uploads/images/${product.images}`}
                  alt="Image"
                  className="fit-cover h-40 w-full p-2 rounded-2xl"
                />
              ) : (
                <img
                  src={notenought}
                  alt="Image"
                  className="fit-cover h-40 w-full p-2 rounded-2xl"
                />
              )}
              <div className="px-2 ">
                <div className="flex justify-between">
                  <p className="font-bold">{product.productName}</p>
                  <p>
                    ຍັງ(<span className="font-bold ">{product.stock}</span>)
                  </p>
                </div>
                <p className="description truncate text-gray-500 text-sm">
                  {product.description}
                </p>
                <p className="description truncate text-gray-700 text-sm">
                  {product.location}
                </p>
                <div className="flex justify-between">
                  <p className="font-bold ">
                    {new Intl.NumberFormat("lo-LA", {
                      style: "currency",
                      currency: "LAK",
                    }).format(product.price)}
                  </p>
                  <div
                    className="w-7 f-7 bg-red-300 rounded-2xl flex justify-center items-center font-bold text-gray-900"
                    onClick={() => Decrease(product.stock, product.id)}
                  >
                    -
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex justify-center mt-10">Product Not found </div>
      )}
    </div>
  );
};

export default Manage;

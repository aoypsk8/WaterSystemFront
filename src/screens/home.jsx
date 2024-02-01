// Home.js
import React, { useState } from "react";
import Navbar from "../nav/Navbar";
import bottlewater from "../assets/bottle_water.jpeg";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { SearchProduct } from "../api/product/productAction";
import pomotion from "../assets/tomo.jpeg";
import notenought from "../assets/not.png";
import { Link } from "react-router-dom";

function Home() {
  const dispatch = useDispatch();
  const tokenLoca = localStorage.token;

  const { cate } = useSelector((state) => state.cate);
  const { product } = useSelector((state) => state.product);

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

  return (
    <div className="h-screen w-screen ">
      <Navbar />
      <div className="m-5 bg-slate-200 h-48 rounded-lg">
        <img
          src={pomotion}
          alt=""
          className="fit-cover h-full w-full rounded-xl"
        />
      </div>

      <p className="mx-5">ປະເພດສິນຄ້າ</p>
      <div className="flex mx-5 flex-wrap ">
        {cate.map((category) => (
           
          <div
            key={category._id}
            className="flex flex-col justify-center h-16 w-16 my-2 items-center  ml-2 "
          >
            <div className="rounded-lg h-full w-full flex justify-center">
             
              <img
                src={`http://localhost:3000/uploads/images/${category.images}`}
                alt=""
              />
            </div>
            <p className="text-sm">{category.cateName}</p>
          </div>
        ))}
      </div>
      <div className="flex justify-between items-center mx-5 my-3">
        <p className="">ລາຍການສິນຄ້າ</p>
        <div className="relative">
          <button
            onClick={toggleDropdown}
            className="px-7 py-2 rounded-md bg-gray-200 text-gray-800"
          >
            {selectedItem || "ເລືອກເມືອງ"}
          </button>
          {isOpen && (
            <div className="absolute top-full left-0 mt-1 w-full bg-white border border-gray-300 rounded-md shadow-lg z-10">
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
        {tokenLoca && <Link to={"/manage"} className="px-2 py-2 rounded-md bg-gray-200">ຈັດການສິນຄ້າ</Link>}
      </div>
      {product != null ? (
        <div className="flex mx-5 justify-between flex-wrap">
          {product.map((product) => (
            <div
              className="mx-2 pb-2 rounded-lg w-[45%] bg-gray-200  my-2 "
              key={product._id}
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
                <p className="font-bold ">
                  {new Intl.NumberFormat("lo-LA", {
                    style: "currency",
                    currency: "LAK",
                  }).format(product.price)}
                </p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex justify-center mt-10">Product Not found </div>
      )}
    </div>
  );
}

export default Home;

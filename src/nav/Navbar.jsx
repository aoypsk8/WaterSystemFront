import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logoutUser } from "../api/authAction";
import Swal from "sweetalert2";

export default function Navbar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [refresh, setRefresh] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const tokenLoca = localStorage.token;
  const role = localStorage.role;



  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  useEffect(() => {
    if (refresh) {
      setRefresh(false);
    }
  }, [refresh]);

  const logout = () => {
    Swal.fire({
      title: "ອອກຈາກລະບົບ?",
      text: "ທ່ານຕ້ອງການອອກຈາກລະບົບ !",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "ຕົກລົງ",
      cancelButtonText: "ຍົກເລິກ",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(logoutUser());
        setRefresh(true);
        navigate("/");
      }
    });
  };

  return (
    <div className="flex items-center lg:px-40 lg:h-[60px] sm:px-16 sm:h-[45px] px-5 h-[60px] py-2 justify-between bg-blue-200 w-screen">
      <Link to={"/"} className="flex items-center">
        <p className="lg:text-2xl text-xl  hover:cursor-pointer font-bold">
          Water System
        </p>
      </Link>
      <ul className="hidden lg:flex items-center list-none ml-10 ">
        <li className="lg:text-2xl sm:text-xl text-xs hover:cursor-pointer">
          ໜ້າຫຼັກ
        </li>
        <li className="lg:text-2xl sm:text-xl text-xs hover:cursor-pointer ml-2">
          ເຂົ້າຮ່ວມກັບເຮົາ
        </li>
        <li className="lg:text-2xl sm:text-xl text-xs hover:cursor-pointer ml-2">
          ກ່ຽວກັບເຮົາ
        </li>
      </ul>

      <div className="flex items-center ml-auto">
        <input
          type="text"
          placeholder="Search..."
          // onChange={onChange}
          className="outline-none placeholder-gray-500 px-3 py-1 text-sm rounded-md"
        />
        <button
          onClick={toggleDropdown}
          className="lg:hidden ml-2 focus:outline-none"
        >
          &#9776;
        </button>
      </div>

      {/* Dropdown menu */}
      {showDropdown && (
        <div className="lg:hidden absolute top-[40px] right-0 bg-white border border-gray-300 rounded-md mt-1">
          <ul className="py-1">
            <li className="text-sm px-3 py-1 hover:bg-gray-100">
              <Link to="/">ໜ້າຫຼັກ</Link>
            </li>
            <li className="text-sm px-3 py-1 hover:bg-gray-100">
              <Link to="/">ເຂົ້າຮ່ວມກັບເຮົາ</Link>
            </li>
            <li className="text-sm px-3 py-1 hover:bg-gray-100">
              <Link to="/">ກ່ຽວກັບເຮົາ</Link>
            </li>
            <li className="text-sm px-3 py-1 hover:bg-gray-100">
              {!tokenLoca && (
                <Link to={"/login"}>
                  <p className="text-base">ເຂົ້າສູ່ລະບົບ</p>
                </Link>
              )}
              {tokenLoca && (
                <div onClick={() => logout()}>
                  <p className="text-base">ອອກຈາກລະບົບ</p>
                </div>
              )}
              {role =="Admin" && (
                <Link to={"/adduser"}>
                  <p className="text-base">ເພີ່ມ User</p>
                </Link>
              )}
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}

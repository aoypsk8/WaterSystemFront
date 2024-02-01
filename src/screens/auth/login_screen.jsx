import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginUser } from "../../api/authAction";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [value, setValue] = useState({
    username: "",
    password: "",
  });


  const handleChange = (e) => {
    setValue({
      ...value,
      [e.target.name]: e.target.value,
    });
    console.log("showPassword:", value);

  };


  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log(value);
    dispatch(loginUser(value.username, value.password)).then(
      (success) => {
        if (success) {
          navigate("/");
        }
      }
    );
  };


  const [showPassword, setShowPassword] = useState(false); 
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword); 
  };

  return (
    <div className=" bg-slate-100">
      <section className=" min-h-screen flex items-center justify-center">
        <div className="bg-white flex rounded-2xl shadow-lg max-w-3xl p-5 items-center">
          <div className="md:w-1/2 px-8 md:px-16">
            <h2 className="font-bold text-2xl text-[#002D74]">Login</h2>
            <p className="text-xs mt-4 text-[#002D74]">
              If you are already a member, easily log in
            </p>
            <form
              action=""
              className="flex flex-col gap-4"
              onSubmit={handleSubmit}
            >
              <input
                autoComplete="off"
                className="p-2 mt-8 rounded-xl border"
                type="text"
                name="username"
                placeholder="Username"
                onChange={handleChange}
              />

              <div className="relative">
                <input
                  autoComplete="off"
                  className="p-2 rounded-xl border w-full"
                  type={showPassword ? "text" : "password"} 
                  name="password"
                  placeholder="Password"
                  onChange={handleChange}
                />
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="gray"
                  className="bi bi-eye absolute top-1/2 right-3 -translate-y-1/2"
                  viewBox="0 0 16 16"
                  onClick={togglePasswordVisibility} 
                >
                  <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z" />
                  <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z" />
                </svg>
              </div>
              <button className="bg-[#002D74] rounded-xl text-white py-2 hover:scale-105 duration-300" onClick={handleSubmit}>
                Login
              </button>
            </form>

            <div className="mt-6 grid grid-cols-3 items-center text-gray-400">
              <hr className="border-gray-400" />
              <p className="text-center text-sm">OR</p>
              <hr className="border-gray-400" />
            </div>

            <div className="mt-5 text-xs border-b border-[#002D74] py-4 text-[#002D74]">
              <p>Forgot your password?</p>
            </div>

          </div>
          <div className="md:block hidden w-1/2">
            <img
              className="rounded-2xl "
              alt="im"
              src="https://i.pinimg.com/736x/4b/dd/ba/4bddba0e05587c13890186b0106280e2.jpg"
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default Login;
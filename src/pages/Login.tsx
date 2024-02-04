import React, { FormEvent, useContext, useRef, useState } from "react";
import { loginSchema } from "../validation";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import { post } from "../utils/Requsts";
import { AuthContext } from "../context/Auth";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
type errorToast = {
  msg: String;
  param: "string";
};
type User = {
  email: string;
  password: string;
};
function Login() {
  const nav = useNavigate();

  //do something else

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<User>({
    resolver: yupResolver(loginSchema),
  });
  const { setUser } = useContext(AuthContext);
  const formVar = {
    hidden: {
      y: "-100vh",
    },
    visible: {
      y: 0,
    },
  };

  const submit = async (data: User) => {
    const [res, errors] = await post<User>("/auth/login", data);
    console.log(res);
    console.log(errors);
    if (!errors) {
      setUser(res?.user);
      localStorage.setItem("user", JSON.stringify(res));
      nav("/");
      toast("welcome", {
        type: "success",
      });
      return;
    }
    errors?.map((err: errorToast) => {
      toast(err.msg, {
        type: "error",
      });
    });
  };
  return (
    <motion.div
      variants={formVar}
      initial="hidden"
      animate="visible"
      className="flex h-screen w-full justify-center items-center"
    >
      <form
        className="p-3 rounded-md  bg-white shadow-md"
        onSubmit={handleSubmit(submit)}
      >
        <fieldset className="border-2 p-2 flex gap-3 flex-col w-96  px-5 py-5 rounded-md">
          <legend className="text-xl">Login</legend>

          <div className="flex flex-col   w-full">
            <label htmlFor="email">Email</label>
            <input
              type={"email"}
              required
              {...register("email")}
              id="email"
              placeholder="Email"
              className="shadow-md p-2 my-4 w-full"
              name="email"
            />
            {errors.email && <p>{errors?.email.message?.toString()}</p>}
          </div>
          <div className="flex flex-col  w-full  ">
            <label>Password</label>
            <input
              type={"password"}
              placeholder="Password"
              {...register("password")}
              name="password"
              className="shadow-md p-2 my-4"
            />
          </div>
          <div>
            <input type={"checkbox"} className=" self-start text-blue-700" />
            <span className="ml-2">Remember me</span>
          </div>
          {errors.password && <p>{errors?.password.message?.toString()}</p>}
          <div className="flex justify-between">
            <span>
              don't have account?
              <Link to={"/signUp"}>Register</Link>
            </span>
            <span>forgot password?</span>
          </div>
          <button
            type="submit"
            className="bg-main-orange py-2 shadow-md text-white text-lg font-bold"
          >
            Login
          </button>
        </fieldset>
      </form>
    </motion.div>
  );
}

export default Login;

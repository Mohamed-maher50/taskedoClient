import React, { useContext } from "react";
import { registerSchema } from "../validation";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import { post } from "../utils/Requsts";
import { AuthContext } from "../context/Auth";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
const formVar = {
  hidden: {
    y: "-100vh",
  },
  visible: {
    y: 0,
  },
};
type errorToast = {
  msg: String;
  param: "string";
};
type FormValues = {
  fullName: string;
  password: string;
  email: string;
  confirmPassword: string;
  birthDay: string;
};
type User = {
  email: string;
  password: string;
};
function SignUp() {
  const { setUser } = useContext(AuthContext);
  const nav = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: yupResolver(registerSchema),
  });
  const submitForm = async (data: FormValues) => {
    const [res, errors] = await post<User>("/auth/signUP", data);

    if (!errors) {
      setUser(res?.user);
      localStorage.setItem("user", JSON.stringify(res));
      nav("/");
      return;
    }
    errors.map((err: errorToast) => {
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
        onSubmit={handleSubmit(submitForm)}
      >
        <fieldset className="border-2 p-2 flex gap-3 flex-col w-96  px-5 py-5 rounded-md">
          <legend className="text-xl">Sign Up</legend>
          <div className="flex flex-col   w-full">
            <label htmlFor="FullName">FullName</label>
            <input
              type={"text"}
              {...register("fullName")}
              id="FullName"
              placeholder="fullName"
              className="shadow-md p-2 my-4 w-full"
              name="fullName"
            />
            {errors.fullName && <p>{errors?.fullName.message?.toString()}</p>}
          </div>
          <div className="flex flex-col   w-full">
            <label htmlFor="email">Email</label>
            <input
              type={"text"}
              required
              {...register("email")}
              id="email"
              placeholder="Email"
              className="shadow-md p-2 my-4 w-full"
              name="email"
            />
            {errors.email && <p>{errors?.email.message?.toString()}</p>}
          </div>
          <div className="flex flex-col   w-full">
            <label htmlFor="birthday">birthDay</label>
            <input
              type={"date"}
              min="2000-01-02"
              required
              {...register("birthDay")}
              id="birthDay"
              placeholder="birthDay"
              className="shadow-md p-2 my-4 w-full"
              name="birthDay"
            />
            {errors.birthDay && <p>{errors?.birthDay.message?.toString()}</p>}
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
            {errors.password && <p>{errors?.password.message?.toString()}</p>}
          </div>
          <div>
            <input type={"checkbox"} className=" self-start text-blue-700" />
            <span className="ml-2">Remember me</span>
          </div>

          <div className="flex justify-between">
            <span>
              i have account?
              <Link to={"/login"}>Login</Link>
            </span>
            <span>forgot password?</span>
          </div>
          <button
            type="submit"
            className="bg-main-orange py-2 shadow-md text-white text-lg font-bold"
          >
            Register
          </button>
        </fieldset>
      </form>
    </motion.div>
  );
}

export default SignUp;

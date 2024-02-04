import * as Yup from "yup";

export const loginSchema = Yup.object().shape({
  email: Yup.string().email("not valid email").required("required"),
  password: Yup.string().min(7).required("required password"),
});
export const registerSchema = Yup.object().shape({
  email: Yup.string().email("not valid email").required("required"),
  password: Yup.string().min(7).required("required password"),
  fullName: Yup.string().min(5).required(),
  birthDay: Yup.string().required(),
  confirmPassword: Yup.string().oneOf([Yup.ref("password")]),
});

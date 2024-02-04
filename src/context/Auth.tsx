import React, { createContext, useEffect, useState } from "react";

type contextProviderProps = {
  children: React.ReactNode;
};
interface User {
  fullName: string;
  email: string;
}
interface UserContextInterface {
  user: User;
  setUser: React.Dispatch<React.SetStateAction<undefined>>;
}
const defaultState = {
  user: {
    fullName: "",
    email: "",
  },
  setUser: (user: User) => {},
};
export const AuthContext = createContext(defaultState);
export const ContextProvider = ({ children }: contextProviderProps) => {
  let localUser: any = localStorage.getItem("user");
  localUser = JSON.parse(localUser)?.user;
  if (!localUser)
    localUser = {
      fullName: "",
      email: "",
    };
  const [user, setUser] = useState<User>(localUser);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

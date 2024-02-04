import React, { useContext } from "react";
import { AuthContext } from "../context/Auth";
import { FiLogOut } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
const Navbar: React.FC = () => {
  const { user, setUser } = useContext(AuthContext);
  const nav = useNavigate();
  const handleLogOut = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    setUser({
      fullName: "",
      email: "",
    });
    localStorage.removeItem("user");
    nav("/login");
  };
  return (
    <div className="px-5 py-3 flex bg-black items-center shadow-md shadow-gray-600">
      <div className="">
        <h1 className="text-3xl font-bold text-white">Taskedo</h1>
      </div>
      <div className="text-white text-bold text-xl  grow text-center">
        {user.email.slice(0, 5) +
          "..." +
          user.email.slice((user.email as string).indexOf("@"))}
      </div>
      <div onClick={handleLogOut}>
        <span className="font-bold text-white text-xl flex items-center gap-x-2 cursor-pointer">
          logOut <FiLogOut />
        </span>
      </div>
    </div>
  );
};

export default Navbar;

import React, { useContext, useEffect } from "react";
import { ToastContainer } from "react-toastify";
import "./App.css";
import Login from "./pages/Login";
import { Routes, Route, useNavigate } from "react-router-dom";
import Todos from "./pages/Todo";
import SignUp from "./pages/SignUp";
import NotFound from "./pages/NotFound";
import { AuthContext } from "./context/Auth";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "./components/Navbar";

const App: React.FC = () => {
  const auth = useContext(AuthContext);
  const nav = useNavigate();

  useEffect(() => {
    if (!auth?.user?.fullName || !auth?.user?.email) nav("/login");
  }, [auth]);

  return (
    <div className=" min-h-[200vh] md:min-h-[100vh] overflow-hidden  bg-mainBlue ">
      <Routes>
        {!Boolean(auth.user.fullName) || !Boolean(auth.user.email) ? (
          <>
            <Route path="/login" element={<Login />} />
            <Route path="/signUp" element={<SignUp />} />
          </>
        ) : (
          <>
            <Route
              path="/"
              element={
                <>
                  <Navbar />
                  <Todos />
                </>
              }
            />
          </>
        )}

        <Route path="*" element={<NotFound />} />
      </Routes>
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        limit={3}
      />
    </div>
  );
};

export default App;

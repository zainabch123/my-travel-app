import { Navigate } from "react-router-dom";
import Header from "../header/header";
import LeftMenu from "../leftMenu/leftMenu";

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("token");

  if (!token) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="container mx-auto w-full max-w-none">
      <Header />
      <LeftMenu />
      {children}
    </div>
  );
};

export default ProtectedRoute;

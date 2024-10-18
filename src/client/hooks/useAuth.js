import { useContext } from "react";
import AuthContext from "../context/auth.jsx";

const useAuth = () => {
    return useContext(AuthContext)
};

export default useAuth;
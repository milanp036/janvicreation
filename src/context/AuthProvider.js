import { createContext, useEffect, useState } from "react";
import { API } from "../API";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    user: JSON.parse(localStorage.getItem("user")),
    role: JSON.parse(localStorage.getItem("user"))
      ? [JSON.parse(localStorage.getItem("user")).userType]
      : "",
    accessToken: localStorage.getItem("authToken"),
  });
  const roles = JSON.parse(localStorage.getItem("user"))
    ? [JSON.parse(localStorage.getItem("user")).userType]
    : "";
  const [role, setUserRole] = useState(roles);
  useEffect(() => {
    const getCurrentUser = async () => {
      const user = JSON.parse(localStorage.getItem("user"));
      if (user?._id) {
        const authToken = localStorage.getItem("authToken");
        const { data } = await API.get(`v1/api/auth/user/${user._id}`);

        if (data.success) {
          setAuth({
            ...auth,
            user: data.data,
            role: [data.data.userType],
            accessToken: authToken,
          });
        }
      }
    };
    getCurrentUser();
  }, []);
  const setCurrentUser = (data) => {
    setAuth(data);
  };
  return (
    <AuthContext.Provider
      value={{ auth, setAuth: setCurrentUser, role, setUserRole }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;

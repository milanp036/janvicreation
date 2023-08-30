/* eslint-disable jsx-a11y/anchor-is-valid */
import toast, { Toaster } from "react-hot-toast";
import { useNavigate, Link } from "react-router-dom";
import {
  Trash3,
  Bell,
  Power,
  People,
  ReceiptCutoff,
} from "react-bootstrap-icons";
import { useEffect, useState } from "react";
import { API } from "../API";
import useAuth from "../hooks/useAuth";
import { NavLink } from "react-router-dom";
import logo from "../images/4848.png";

export const Header = () => {
  const { auth, setAuth } = useAuth();
  const [state, setState] = useState({
    menu: false,
    isOpen: false,
    homeLinkClass: "nav-item nav-link",
    aboutLinkClass: "nav-item nav-link",
    menuClass: "",
  });
  const [isLoggedInUser, setIsLoggedInUser] = useState({});
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));
  useEffect(() => {
    async function getUser() {
      if (user?._id) {
        const { data } = await API.get(`v1/api/auth/user/${user._id}`);
        setIsLoggedInUser(data.data);
        localStorage.setItem("user", JSON.stringify(data.data));
      }
    }
    getUser();
  }, [user?._id]);
  const toggleMenu = () => {
    setState({
      ...state,
      menu: !state.menu,
    });
  };
  const show = state.menu ? "show" : "";
  const logout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("user");
    setAuth({});
    toast.success("logout successFully.");
    navigate("/login");
  };
  return (
    <>
      <nav className="navbar sticky-top navbar-expand-lg navbar-light bg-white ">
        <div className="container-fluid">
          <div className="d-flex d-lg-none justify-content-between align-items-center w-100">
            <NavLink
              className={`${state.homeLinkClass} nav-font p-0`}
              to={"/dashboard"}
              style={({ isActive }) => ({
                color: isActive ? "#b66dff" : "",
              })}
            >
              <img
                src={logo}
                alt="logo"
                width={48}
                height={48}
                className="m-auto d-block"
              />
            </NavLink>
            <button
              className="navbar-toggler"
              type="button"
              onClick={toggleMenu}
            >
              <span className="navbar-toggler-icon"></span>
            </button>
          </div>
          <div
            className={
              "justify-content-between collapse navbar-collapse " + show
            }
          >
            <ul className="navbar-nav align-items-center ">
              <li className="nav-item d-none d-lg-block">
                <NavLink
                  className={`${state.homeLinkClass} nav-font p-0`}
                  exact={"true"}
                  to={"/dashboard"}
                  style={({ isActive }) => ({
                    color: isActive ? "#b66dff" : "",
                  })}
                >
                  <img
                    src={logo}
                    alt="logo"
                    width={48}
                    height={48}
                    className="m-auto d-block"
                  />
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  className="nav-link nav-font"
                  to={"/bill"}
                  exact={"true"}
                  style={({ isActive }) => ({
                    color: isActive ? "#b66dff" : "",
                  })}
                >
                  <h5>
                    <ReceiptCutoff />
                  </h5>
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  className="nav-link nav-font"
                  to={"/customer"}
                  exact={"true"}
                  style={({ isActive }) => ({
                    color: isActive ? "#b66dff" : "",
                  })}
                >
                  <h5>
                    <People />
                  </h5>
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  className={`${state.homeLinkClass} nav-font p-0`}
                  to={"/deleted-customer"}
                  exact={"true"}
                  style={({ isActive }) => ({
                    color: isActive ? "#b66dff" : "",
                  })}
                >
                  <h5>
                    <Trash3 />
                  </h5>
                </NavLink>
              </li>
            </ul>
            <ul className="navbar-nav">
              <>
                <li className="nav-item nav-font">
                  <div
                    className="nav-link mt-1"
                    style={{
                      marginLeft: `${!state.menu ? "5px" : ""}`,
                      cursor: "pointer",
                    }}
                    onClick={async () => {}}
                  >
                    <span>
                      <Bell size={20} color="#9c9fa6" />
                    </span>
                    {1 > 0 && (
                      <>
                        <span
                          className="notify-icon"
                          style={{ backgroundColor: "#fe7c96" }}
                        >
                          {0}
                        </span>
                      </>
                    )}
                  </div>
                </li>
                <li className="nav-item nav-font">
                  <Link className="nav-link">
                    <div
                      className="rounded-circle text-light text-center "
                      style={{
                        lineHeight: "30px",
                        height: "30px",
                        width: "30px",
                        backgroundColor: "#9a55ff",
                      }}
                    >
                      {isLoggedInUser?.name
                        ? isLoggedInUser?.name?.charAt(0)
                        : auth?.user?.name?.charAt(0)}
                    </div>
                  </Link>
                </li>
                <li className="nav-item nav-font">
                  <div onClick={() => logout()} className="nav-link">
                    <div style={{ marginTop: "3px" }}>
                      <Power size={20} color="#9c9fa6" />
                    </div>
                  </div>
                </li>
              </>
            </ul>
          </div>
        </div>
      </nav>
      <Toaster />
    </>
  );
};

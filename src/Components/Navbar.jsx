import { useEffect, useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { MdOutlineClose } from "react-icons/md";
import { Link, NavLink } from "react-router-dom";
import UseAuth from "../CustomHook/UseAuth";
import { Tooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";
import { Squash as Hamburger } from 'hamburger-react'

const Navbar = () => {
  const [nav, setNav] = useState(false);
  const [data, setData] = useState([]);

  const toggleNavbar = () => {
    setNav(!nav);
  };
  const { logout, user } = UseAuth();

  useEffect(() => {
    fetch("https://assetflow-server-side.vercel.app/users")
      .then((res) => res.json())
      .then((data) => {
        setData(data);
      })
      .catch((error) => {
        console.error("Error fetching roles:", error);
      });
  }, [user]);
  useEffect(() => {
    if (nav) {
      document.body.classList.add("no-scroll");
    } else {
      document.body.classList.remove("no-scroll");
    }
    return () => {
      document.body.classList.remove("no-scroll");
    };
  }, [nav]);
  console.log(data);
  const filterData = data?.filter((item) => item?.email === user?.email);
  const roles = filterData?.[0]?.role;

  return (
    <div className="w-full navbar relative">
      <div className="contain flex justify-between items-center py-2 lg:py-1 xxl:py-3 px-3 lg:px-0">
        {user ? (
          <div className="w-full flex justify-between items-center py-2 lg:py-3 px-3 lg:px-0 ">
            <Link
              to={"/"}
              data-tooltip-id="my-tooltip"
              data-tooltip-content="AssetFlow"
            >
              <img src="/logo1.png" alt="" className="w-32 lg:w-40 2xl:w-44" />
            </Link>
            <Tooltip id="my-tooltip" className="z-50" />
            <ul className="gap-5 items-center text-sm lg:text-sm 2xl:text-lg hidden lg:flex">
              <NavLink
                to={"/"}
                className={({ isActive }) =>
                  isActive
                    ? "font-bold cursor-pointer text-purple"
                    : "cursor-pointer"
                }
              >
                Home
              </NavLink>
              {roles === "Admin" && (
                <NavLink
                  to={"/assetlist"}
                  className={({ isActive }) =>
                    isActive
                      ? "font-bold cursor-pointer text-purple"
                      : "cursor-pointer"
                  }
                >
                  Asset List
                </NavLink>
              )}
              {roles === "Admin" && (
                <NavLink
                  to={"/addasset"}
                  className={({ isActive }) =>
                    isActive
                      ? "font-bold cursor-pointer text-purple"
                      : "cursor-pointer"
                  }
                >
                  Add an Asset
                </NavLink>
              )}
              {roles === "Admin" && (
                <NavLink
                  to={"/allrequests"}
                  className={({ isActive }) =>
                    isActive
                      ? "font-bold cursor-pointer text-purple"
                      : "cursor-pointer"
                  }
                >
                  All Requests
                </NavLink>
              )}
              {roles === "Admin" && (
                <NavLink
                  to={"/myemployees"}
                  className={({ isActive }) =>
                    isActive
                      ? "font-bold cursor-pointer text-purple"
                      : "cursor-pointer"
                  }
                >
                  My Employees
                </NavLink>
              )}
              {roles === "Admin" && (
                <NavLink
                  to={"/addemployee"}
                  className={({ isActive }) =>
                    isActive
                      ? "font-bold cursor-pointer text-purple"
                      : "cursor-pointer"
                  }
                >
                  Add Employee
                </NavLink>
              )}
              {roles === "Admin" && (
                <NavLink
                  to={"/profile"}
                  className={({ isActive }) =>
                    isActive
                      ? "font-bold cursor-pointer text-purple"
                      : "cursor-pointer"
                  }
                >
                  Profile
                </NavLink>
              )}
              {roles === "Employee" && (
                <NavLink
                  to={"/myassets"}
                  className={({ isActive }) =>
                    isActive
                      ? "font-bold cursor-pointer text-purple"
                      : "cursor-pointer"
                  }
                >
                  My Assets
                </NavLink>
              )}
              {roles === "Employee" && (
                <NavLink
                  to={"/myteam"}
                  className={({ isActive }) =>
                    isActive
                      ? "font-bold cursor-pointer text-purple"
                      : "cursor-pointer"
                  }
                >
                  My Team
                </NavLink>
              )}
              {roles === "Employee" && (
                <NavLink
                  to={"/requestforasset"}
                  className={({ isActive }) =>
                    isActive
                      ? "font-bold cursor-pointer text-purple"
                      : "cursor-pointer"
                  }
                >
                  Request for an Asset
                </NavLink>
              )}
              {roles === "Employee" && (
                <NavLink
                  to={"/profile"}
                  className={({ isActive }) =>
                    isActive
                      ? "font-bold cursor-pointer text-purple"
                      : "cursor-pointer"
                  }
                >
                  Profile
                </NavLink>
              )}
            </ul>
            <div className="flex gap-4">
              <Tooltip id="my-tooltip2" className="z-50" />
              {user?.email ? (
                <div className="flex justify-end items-center flex-1 lg:flex-none md:gap-2 -mr-2 lg:mr-0">
                  <img
                    src={
                      user.photoURL ||
                      "https://i.ibb.co/N6p8fKX/user-icon-in-trendy-flat-style-isolated-on-grey-background-user-symbol-for-your-web-site-design-logo.jpg"
                    }
                    data-tooltip-id="my-tooltip4"
                    data-tooltip-content={user.displayName}
                    alt=""
                    className="w-8 h-8 md:w-10 md:h-10 border-2 border-purple rounded-full cursor-pointer justify-self-end"
                  />{" "}
                  <Tooltip id="my-tooltip4" className="z-50" />
                  <Link to={"/"}>
                    <button
                      data-tooltip-id="my-tooltip3"
                      data-tooltip-content="Logout Now"
                      onClick={logout}
                      className="bg-purple text-white font-semibold text-base xxl:text-lg px-7 py-1 rounded-md hidden lg:block"
                    >
                      Logout
                    </button>
                  </Link>{" "}
                  <Tooltip id="my-tooltip3" className="z-50" />
                </div>
              ) : (
                <div className="hidden lg:flex gap-4">
                  <Link to={"/login"}>
                    <button className="bg-purple text-white px-7 py-1 rounded-md text-lg font-semibold">
                      Login
                    </button>
                  </Link>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="w-full flex justify-between items-center py-2 lg:py-3 lg:px-0">
            <Link
              to={"/"}
              data-tooltip-id="my-tooltip"
              data-tooltip-content="AssetFlow"
              className="w-32 lg:w-44"
            >
              <img src="/logo1.png" alt="" />
            </Link>
            <Tooltip id="my-tooltip" className="z-50" />
            <ul className="gap-5 items-center lg:text-lg 2xl:text-xl hidden lg:flex">
              <NavLink
                to={"/"}
                className={({ isActive }) =>
                  isActive
                    ? "font-bold cursor-pointer text-purple"
                    : "cursor-pointer"
                }
              >
                Home
              </NavLink>
              <NavLink
                to={"/joinasemployee"}
                className={({ isActive }) =>
                  isActive
                    ? "font-bold cursor-pointer text-purple"
                    : "cursor-pointer"
                }
              >
                Join as Employee
              </NavLink>
              <NavLink
                to={"/joinasadmin"}
                className={({ isActive }) =>
                  isActive
                    ? "font-bold cursor-pointer text-purple"
                    : "cursor-pointer"
                }
              >
                Join as HR Manager
              </NavLink>
            </ul>
            <div className="flex gap-4">
              <Tooltip id="my-tooltip2" className="z-50" />
              {user?.email ? (
                <div className="flex justify-end flex-1 lg:flex-none gap-2 lg:mr-0">
                  <img
                    src={
                      user.photoURL ||
                      "https://i.ibb.co/N6p8fKX/user-icon-in-trendy-flat-style-isolated-on-grey-background-user-symbol-for-your-web-site-design-logo.jpg"
                    }
                    data-tooltip-id="my-tooltip4"
                    data-tooltip-content={user.displayName}
                    alt=""
                    className="w-10 h-10 border-2 border-purple rounded-full cursor-pointer justify-self-end"
                  />{" "}
                  <Tooltip id="my-tooltip4" className="z-50" />
                  <Link to={"/"}>
                    <button
                      data-tooltip-id="my-tooltip3"
                      data-tooltip-content="Logout Now"
                      onClick={logout}
                      className="bg-purple text-white font-semibold text-lg px-5 py-1 rounded-md hidden lg:block"
                    >
                      Logout
                    </button>
                  </Link>{" "}
                  <Tooltip id="my-tooltip3" className="z-50" />
                </div>
              ) : (
                <div className="hidden lg:flex gap-4">
                  <Link to={"/login"}>
                    <button className="bg-purple text-white px-7 py-1 rounded-md text-lg font-semibold">
                      Login
                    </button>
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}
        <span onClick={toggleNavbar} className="zind block lg:hidden">
          <Hamburger size={28} toggled={nav} toggle={setNav}/>
        </span>
        <div
          className={`menu-slide ${nav && "open"} flex flex-col justify-center`}
        >

          <ul className="gap-5 items-center text-xl flex flex-col">
            <NavLink
              to={"/"}
              className={({ isActive }) =>
                isActive
                  ? "font-bold cursor-pointer text-purple"
                  : "cursor-pointer"
              }
              onClick={toggleNavbar}
            >
              Home
            </NavLink>
            {roles === "Admin" && (
              <NavLink
                to={"/assetlist"}
                className={({ isActive }) =>
                  isActive
                    ? "font-bold cursor-pointer text-purple"
                    : "cursor-pointer"
                }
                onClick={toggleNavbar}
              >
                Asset List
              </NavLink>
            )}
            {roles === "Admin" && (
              <NavLink
                to={"/addasset"}
                className={({ isActive }) =>
                  isActive
                    ? "font-bold cursor-pointer text-purple"
                    : "cursor-pointer"
                }
                onClick={toggleNavbar}
              >
                Add an Asset
              </NavLink>
            )}
            {roles === "Admin" && (
              <NavLink
                to={"/allrequests"}
                className={({ isActive }) =>
                  isActive
                    ? "font-bold cursor-pointer text-purple"
                    : "cursor-pointer"
                }
                onClick={toggleNavbar}
              >
                All Requests
              </NavLink>
            )}
            {roles === "Admin" && (
              <NavLink
                to={"/myemployees"}
                className={({ isActive }) =>
                  isActive
                    ? "font-bold cursor-pointer text-purple"
                    : "cursor-pointer"
                }
                onClick={toggleNavbar}
              >
                My Employees
              </NavLink>
            )}
            {roles === "Admin" && (
              <NavLink
                to={"/addemployee"}
                className={({ isActive }) =>
                  isActive
                    ? "font-bold cursor-pointer text-purple"
                    : "cursor-pointer"
                }
                onClick={toggleNavbar}
              >
                Add Employee
              </NavLink>
            )}
            {roles === "Admin" && (
              <NavLink
                to={"/profile"}
                className={({ isActive }) =>
                  isActive
                    ? "font-bold cursor-pointer text-purple"
                    : "cursor-pointer"
                }
                onClick={toggleNavbar}
              >
                Profile
              </NavLink>
            )}
            {roles === "Employee" && (
              <NavLink
                to={"/myassets"}
                className={({ isActive }) =>
                  isActive
                    ? "font-bold cursor-pointer text-purple"
                    : "cursor-pointer"
                }
                onClick={toggleNavbar}
              >
                My Assets
              </NavLink>
            )}
            {roles === "Employee" && (
              <NavLink
                to={"/myteam"}
                className={({ isActive }) =>
                  isActive
                    ? "font-bold cursor-pointer text-purple"
                    : "cursor-pointer"
                }
                onClick={toggleNavbar}
              >
                My Team
              </NavLink>
            )}
            {roles === "Employee" && (
              <NavLink
                to={"/requestforasset"}
                className={({ isActive }) =>
                  isActive
                    ? "font-bold cursor-pointer text-purple"
                    : "cursor-pointer"
                }
                onClick={toggleNavbar}
              >
                Request for an Asset
              </NavLink>
            )}
            {roles === "Employee" && (
              <NavLink
                to={"/profile"}
                className={({ isActive }) =>
                  isActive
                    ? "font-bold cursor-pointer text-purple"
                    : "cursor-pointer"
                }
                onClick={toggleNavbar}
              >
                Profile
              </NavLink>
            )}
          </ul>
          {user?.email ? (
            <div className="flex gap-2 w-full justify-center mt-5">
              <Link to={"/"}>
                <button
                  onClick={logout}
                  className="bg-purple text-white font-semibold text-xl px-6 py-2 rounded-md mx-"
                >
                  Logout
                </button>
              </Link>
            </div>
          ) : (
            <div className="flex flex-col items-center mt-4 gap-4">
              <Link to={"/login"}>
                <button
                  className="border-purple border-2 w-52 text-center py-2 rounded-md text-lg font-semibold"
                  onClick={toggleNavbar}
                >
                  Login
                </button>
              </Link>
              <Link
                to={"/joinasemployee"}
                className="bg-purple text-white font-semibold text-lg w-52 text-center py-2 rounded-md"
                onClick={toggleNavbar}
              >
                Join as Employee
              </Link>
              <Link
                to={"/joinasadmin"}
                className="bg-purple text-white font-semibold text-lg w-52 text-center py-2 rounded-md"
                onClick={toggleNavbar}
              >
                Join as admin
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;

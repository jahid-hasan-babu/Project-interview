import { MdMenu } from "react-icons/md";
import { useContext, useEffect } from "react";
import { OrderContext } from "../../ContextAPIs/OrderProvider";
import { Link, useNavigate } from "react-router-dom";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { toast } from "react-toastify";
import useUser from "../../Security/useUser";
import { FaUserCircle } from "react-icons/fa";
import useSmallScreen from "../../Hooks/useSmallScreen";
import { FaCartArrowDown } from "react-icons/fa";

const NavbarTop = () => {
  const { open, setOpen, sidebarRef } = useContext(OrderContext);
  const [isSmallScreen] = useSmallScreen();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const [userData, , refetch] = useUser();
  const imgUrl = `https://littleaccount.com/uploads/userProfile/`;

  const handleLogout = async () => {
    try {
      const res = await axiosSecure("/api/logout");
      if (res.data) {
        navigate("/login");
        localStorage.removeItem("token");
        toast.success("Logout Successfully");
        window.location.reload();
        refetch();
      }
    } catch (err) {
      toast.error(err.response.data.message);
    }
  };

  const handleClickOutside = (event) => {
    if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
      setOpen(false);
    }
  };

  useEffect(() => {
    if (isSmallScreen) {
      if (open) {
        document.addEventListener("mousedown", handleClickOutside);
      } else {
        document.removeEventListener("mousedown", handleClickOutside);
      }
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }
  }, [open, isSmallScreen]);

  useEffect(() => {
    if (isSmallScreen) {
      setOpen(false);
    } else {
      setOpen(true);
    }
  }, [isSmallScreen, setOpen]);

  return (
    <div className="bg-white py-pt_primary text-_white w-full shadow-md border-b-1">
      <ul className="flex gap-gap_primary justify-between px-pt_secondary">
        <div className="flex items-center gap-gap_primary text-text_sm font-semibold lg:hidden">
          <MdMenu
            onClick={() => setOpen(!open)}
            className="text-text_xxl cursor-pointer text-black"
          />
        </div>

        <div className="hidden lg:block"></div>

        <div className="flex items-center ">
          <Link className="relative flex items-center">
            <FaCartArrowDown className="w-[35px] h-[35px] text-black" />
            <div className="badge badge-primary bg-purple rounded-full text-white text-xs absolute top-0 right-0 transform translate-x-1 -translate-y-1 w-5 h-5 flex items-center justify-center">
              0
            </div>
          </Link>

          <div className="flex flex-col items-center justify-center text-text_sm font-semibold relative group">
            <div className="flex items-center gap-1">
              <h1 className="text-blue-500 text-xl font-medium">
                {userData?.userData.name}
              </h1>
              {userData?.userData.image ? (
                <img
                  className="w-[40px] h-[40px] rounded-full"
                  src={`${imgUrl}${userData.userData.image}`}
                  alt="Profile"
                />
              ) : (
                <FaUserCircle className="w-[40px] h-[40px] rounded-full text-black ml-4" />
              )}
            </div>

            <div className="absolute top-10 right-3 bg-_white shadow-md rounded-sm overflow-hidden pt-2 w-48 z-10 group-hover:scale-100 transition-transform duration-300 transform origin-top-right scale-0">
              {userData && (
                <Link
                  to="/profile"
                  className="block px-4 py-2 text-black hover:bg-bg_selected hover:text-white"
                >
                  Profile
                </Link>
              )}
              {userData ? (
                <Link
                  onClick={handleLogout}
                  className="block px-4 py-2 text-black hover:bg-bg_selected hover:text-white"
                >
                  Logout
                </Link>
              ) : (
                <Link
                  to="/login"
                  className="block px-4 py-2 text-black hover:bg-bg_selected hover:text-white"
                >
                  Login
                </Link>
              )}
            </div>
          </div>
        </div>
      </ul>
    </div>
  );
};

export default NavbarTop;

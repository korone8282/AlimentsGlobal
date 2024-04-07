import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { IoMdClose } from "react-icons/io";
import { useSelector, useDispatch } from "react-redux";
import { logout } from '../redux/Slices/authSlice';
import { toast } from 'react-toastify';
import { GiHamburgerMenu } from "react-icons/gi";
import { googleLogout } from '@react-oauth/google';
import { apiConnector } from '../redux/Utils/apiConnector';
import { LOGOUT_API } from '../redux/Utils/constants';

const ProfileMenu = () => {

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const {userinfo} = useSelector(state => state.auth);

  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const dispatch = useDispatch();

  const logouthandler = async() =>{
    try {
      await apiConnector(LOGOUT_API,"POST");
      toast.success("logged out successfully");
      navigate("/Login")
      dispatch(logout());
      googleLogout();
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
}

  return (
    <>
      <button
        className="p-2 "
        onClick={toggleMenu}
      >
        {isMenuOpen ? (
          <IoMdClose  size={36} />
        ) : (
          <GiHamburgerMenu  size={32}/>
        )}
      </button>

<div className="absolute right-[1%]">
{
        isMenuOpen ? (
        <>  
        {
            userinfo.isAdmin ? (
         <section className=" bg-gradient-to-r from-[#1e1b4b] to-[#2e1065] p-4">
          <ul className="list-none mt-2">
            <li>
              <NavLink
                className="py-2 px-3 block mb-5 hover:bg-black rounded-sm"
                to={`/user/Profile/${userinfo._id}`}
                style={({ isActive }) => ({
                  color: isActive ? "white" : "#FB2E86",
                })}
              >
                Profile
              </NavLink>
            </li>
            <li>
              <NavLink
                className="py-2 px-3 block mb-5 hover:bg-black rounded-sm"
                to="/admin/BuyerList"
                style={({ isActive }) => ({
                  color: isActive ? "white" : "#FB2E86",
                })}
              >
                Buyers Info
              </NavLink>
            </li>
            <li>
              <NavLink
                className="py-2 px-3 block mb-5 hover:bg-black rounded-sm"
                to="/admin/Userlist"
                style={({ isActive }) => ({
                  color: isActive ? "white" : "#FB2E86",
                })}
              >
                Manage Users
              </NavLink>
            </li>
            <li>
              <NavLink
                className="py-2 px-3 block mb-5 hover:bg-black rounded-sm"
                to="/admin/Dashboard"
                style={({ isActive }) => ({
                  color: isActive ? "white" : "#FB2E86",
                })}
              >
                DashBoard
              </NavLink>
            </li>
            <li>
            <div
                className="py-2 px-3 block mb-5 hover:bg-black rounded-sm text-[#FB2E86]"
                onClick={logouthandler}
              >
                Logout
              </div>
            </li>
          </ul>
        </section>
        ) : (
             <section className="bg-gradient-to-r from-[#1e1b4b] to-[#2e1065] rounder-xl p-4  right-7 top-5">
          <ul className="list-none mt-2">
            <li>
              <NavLink
                className="py-2 px-3 block mb-5 hover:bg-black rounded-sm"
                to="/user/Profile"
                style={({ isActive }) => ({
                  color: isActive ? "white" : "#FB2E86",
                })}
              >
                Profile
              </NavLink>
            </li>
            <li>
              <div
                className="py-2 px-3 block text-[#FB2E86] mb-5 hover:bg-black rounded-sm"
                onClick={logouthandler}
              >
                Logout
              </div>
            </li>
          </ul>
        </section>)
        }
        </>
      ) : null }
</div>
      
    </>
  );
};

export default ProfileMenu;
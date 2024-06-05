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
    <div>
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

<div className="absolute right-[1%] z-30">
{
        isMenuOpen ? (
        <>  
        {
            userinfo.isAdmin ? (
         <section className="bg-black rounded-b-3xl p-4 sm:max-lg:p-1 sm:max-lg:text-base">
          <ul className="list-none mt-2">
            <li>
              <NavLink
                className="py-2 px-3 block mb-5 hover:bg-[#a1a1aa] rounded-sm"
                to={`/user/Profile/${userinfo._id}`}
                style={({ isActive }) => ({
                  color: isActive ? "white" : "#f59e0b",
                })}
              >
                Profile
              </NavLink>
            </li>
            <li>
              <NavLink
                className="py-2 px-3 block mb-5 hover:bg-[#a1a1aa] rounded-sm"
                to="/admin/BuyerList"
                style={({ isActive }) => ({
                  color: isActive ? "white" : "#f59e0b",
                })}
              >
                Buyers Info
              </NavLink>
            </li>
            <li>
              <NavLink
                className="py-2 px-3 block mb-5 hover:bg-[#a1a1aa] rounded-sm"
                to="/admin/ProductList"
                style={({ isActive }) => ({
                  color: isActive ? "white" : "#f59e0b",
                })}
              >
                Product
              </NavLink>
            </li>
            <li>
              <NavLink
                className="py-2 px-3 block mb-5 hover:bg-[#a1a1aa] rounded-sm"
                to="/admin/Userlist"
                style={({ isActive }) => ({
                  color: isActive ? "white" : "#f59e0b",
                })}
              >
                Manage Users
              </NavLink>
            </li>
            <li>
            <div
                className="py-2 px-3 block mb-5 hover:bg-[#a1a1aa] cursor-pointer select-none rounded-sm text-[#FB2E86]"
                onClick={logouthandler}
              >
                Logout
              </div>
            </li>
          </ul>
        </section>
        ) : (
             <section className="bg-black rounder-xl p-4  right-7 top-5">
          <ul className="list-none mt-2">
            <li>
              <NavLink
                className="py-2 px-3 block mb-5 hover:bg-[#a1a1aa] rounded-sm"
                to={`/user/Profile/${userinfo._id}`}
                style={({ isActive }) => ({
                  color: isActive ? "white" : "#f59e0b",
                })}
              >
                Profile
              </NavLink>
            </li>
            <li>
              <div
                className="py-2 px-3 block text-[#FB2E86] mb-5 cursor-pointer select-none hover:bg-black rounded-sm"
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
      
    </div>
  );
};

export default ProfileMenu;
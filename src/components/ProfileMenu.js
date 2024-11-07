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

  const [isMenuOpen, setIsMenuOpen] = useState(0);

  const {userinfo} = useSelector(state => state.auth);

  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const dispatch = useDispatch();

  const logouthandler = async() =>{

    const toastId = toast.loading("Loading...",{
      position: 'top-center',
    });

    try {
      await apiConnector(LOGOUT_API,"POST");
      toast.dismiss(toastId);
      toast.success("logged out successfully");
      navigate("/Login")
      dispatch(logout());
      googleLogout();
      window.location.reload();
    } catch (error) {
      toast.dismiss(toastId);
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
            userinfo ? (
         <section className=" [ bg-gradient-to-b from-black to-gray-700 ]
    [ shadow-black/70 shadow-2xl ] rounded-b-3xl p-4 sm:max-lg:p-1 sm:max-lg:text-base">
          <ul className="list-none mt-2">
            <li>
              <NavLink
                className="py-2 px-3 block mb-5 hover:bg-[#a1a1aa] rounded-sm"
                to={`/admin/Profile/${userinfo._id}`}
                onClick={()=>setIsMenuOpen(0)}
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
                onClick={()=>setIsMenuOpen(0)}
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
                onClick={()=>setIsMenuOpen(0)}
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
                to="/admin/Day-Night"
                onClick={()=>setIsMenuOpen(0)}
                style={({ isActive }) => ({
                  color: isActive ? "white" : "#f59e0b",
                })}
              >
                Day Vs Night
              </NavLink>
            </li>
            <li>
              <NavLink
                className="py-2 px-3 block mb-5 hover:bg-[#a1a1aa] rounded-sm"
                to="/admin/Inventory"
                onClick={()=>setIsMenuOpen(0)}
                style={({ isActive }) => ({
                  color: isActive ? "white" : "#f59e0b",
                })}
              >
                Inventory
              </NavLink>
            </li>
            <li>
              <NavLink
                className="py-2 px-3 block mb-5 hover:bg-[#a1a1aa] rounded-sm"
                to="/admin/Userlist"
                onClick={()=>setIsMenuOpen(0)}
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
            <div></div>)
        }
        </>
      ) : null }
</div>
      
    </div>
  );
};

export default ProfileMenu;
import { Menu } from "@headlessui/react";
import { HiOutlineUserCircle } from "react-icons/hi2";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../features/users/userSlice";
import useAuth from "../hooks/useAuth";

export default function ProfileImage() {
  const { isAuthenticated, currentUser } = useAuth();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  function logoutHandler() {
    dispatch(logout());
    navigate("/login");
  }

  return (
    <Menu>
      <Menu.Button>
        {isAuthenticated ? (
          currentUser?.image ? (
            <img
              src={currentUser?.image}
              alt="profile"
              className="h-8 w-8 rounded-full object-cover"
            />
          ) : (
            <HiOutlineUserCircle className="h-8 w-8 text-stone-800 dark:text-stone-300" />
          )
        ) : (
          <HiOutlineUserCircle className="h-8 w-8 text-stone-800 dark:text-stone-300" />
        )}
      </Menu.Button>
      <Menu.Items className="absolute right-2 top-16 flex origin-top-right flex-col rounded-md bg-theme-primary px-4 py-2 text-stone-800 shadow-md dark:text-stone-300">
        {isAuthenticated && (
          <>
            <Menu.Item>
              <Link to="/profile" className="text-sm hover:underline">
                Profile
              </Link>
            </Menu.Item>
            <Menu.Item>
              <button
                className="mt-2 text-sm hover:underline"
                onClick={logoutHandler}
              >
                Logout
              </button>
            </Menu.Item>
          </>
        )}
      </Menu.Items>
    </Menu>
  );
}

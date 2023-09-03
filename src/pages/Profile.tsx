import { useState } from "react";
import { HiOutlinePencil, HiOutlineUserCircle } from "react-icons/hi2";
import { useSelector } from "react-redux";
import ModalDialog from "../components/ModalDialog";
import UpdateProfile from "../components/UpdateProfile";
import { rootState } from "../types";

export default function Profile() {
  const { currentUser } = useSelector((state: rootState) => state.users);

  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <section className="flex items-start justify-center">
      <div className="relative w-4/5 max-w-lg space-y-2 rounded-sm bg-theme-secondary p-6">
        <div className="flex gap-2">
          <div>
            {currentUser?.image ? (
              <img
                src={currentUser?.image}
                alt="profile"
                className="h-16 w-16 rounded-full object-cover"
              />
            ) : (
              <HiOutlineUserCircle className="h-16 w-16 text-stone-900 dark:text-stone-300" />
            )}
          </div>
          <div>
            <h2 className="text-2xl font-bold text-stone-900 dark:text-stone-300">
              {currentUser?.name}
            </h2>
            <h4 className="text-sm text-stone-700 dark:text-stone-400">
              {currentUser?.email}
            </h4>
          </div>
        </div>
        <div>
          <h4 className="text-lg font-bold text-stone-900 dark:text-stone-300">
            Bio
          </h4>
          <p className="text-sm text-stone-700 dark:text-stone-400">
            {currentUser?.bio}
          </p>
        </div>
        <button
          className="absolute right-3 top-2 rounded-full bg-theme-tertiary p-2"
          onClick={() => setIsOpen(true)}
        >
          <HiOutlinePencil className="h-4 w-4 text-stone-900 dark:text-stone-300" />
        </button>
      </div>
      <ModalDialog
        title="Update Profile"
        ModalElement={() => <UpdateProfile setIsOpen={setIsOpen} />}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
      />
    </section>
  );
}

import { Form, Formik } from "formik";
import { useState } from "react";
import { useDispatch } from "react-redux";
import * as Yup from "yup";

import { updateUser } from "../features/users/userSlice";
import useAuth from "../hooks/useAuth";
import { UserTypes } from "../types";
import Input from "./Input";
import Textarea from "./Textarea";

const profileDataValidate = Yup.object({
  name: Yup.string().required("Name is required").min(3).max(20),
  bio: Yup.string(),
});

interface UpdateProfileProps {
  setIsOpen(isOpen: boolean): void;
}

export default function UpdateProfile({ setIsOpen }: UpdateProfileProps) {
  const { currentUser } = useAuth();
  const [image, setImage] = useState<File | null>();

  const dispatch = useDispatch();

  const initialState = {
    name: currentUser?.name,
    image: currentUser?.image,
    bio: currentUser?.bio,
  };

  function handleUpdateProfile(
    values: Partial<UserTypes>,
    { resetForm }: { resetForm: () => void },
  ) {
    if (image) {
      const reader = new FileReader();
      reader.readAsDataURL(image);
      reader.onloadend = () => {
        const img = reader.result;
        const data = {
          ...values,
          image: img,
          id: currentUser?.id,
        };
        dispatch(updateUser(data));
      };
    } else {
      const data = {
        ...values,
        id: currentUser?.id,
      };
      dispatch(updateUser(data));
    }

    setIsOpen(false);
    resetForm();
  }

  return (
    <Formik
      enableReinitialize
      initialValues={initialState}
      validationSchema={profileDataValidate}
      onSubmit={handleUpdateProfile}
    >
      {(form) => (
        <Form className="space-y-4">
          <div className="relative">
            <label className="mb-2 block text-left text-xs font-medium text-gray-900 dark:text-white">
              Upload a Profile picture
            </label>
            <input
              type="file"
              className="w-full rounded-sm border-none bg-[#bcbcbc]  p-2 text-xs text-stone-900 outline-none placeholder:text-xs placeholder:text-stone-700 dark:bg-[#3d3f41] dark:text-stone-300 placeholder:dark:text-stone-200"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                const files = e.target.files;
                if (files && files.length > 0) {
                  setImage(files[0]);
                }
              }}
            />
          </div>

          <Input
            type="text"
            name="name"
            onChange={form.handleChange}
            placeholder="Name"
          />
          <Textarea name="bio" onChange={form.handleChange} placeholder="Bio" />

          <div className="flex gap-4">
            <button
              type="button"
              className="rounded-sm border border-primary px-4 py-2 text-sm font-bold text-primary"
              onClick={() => setIsOpen(false)}
            >
              Cancel
            </button>
            <button
              className="rounded-sm bg-primary px-4 py-2 text-sm font-bold"
              type="submit"
            >
              Submit
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
}

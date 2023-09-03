import { Form, Formik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import Input from "../components/Input";
import { createUser, usersSelector } from "../features/users/userSlice";

interface RegisterInputProps {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const initialState: RegisterInputProps = {
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
};

export default function SignUp() {
  const dispatch = useDispatch();
  const users = useSelector(usersSelector);
  const navigate = useNavigate();

  // Validation
  const registerValidation = Yup.object({
    name: Yup.string().required("Name is required").min(3).max(20),
    email: Yup.string()
      .email("Please enter a valid email address")
      .required("Email is required")
      .test("email", "Email already in use", (value) => {
        const isInUsed = users.find((user) => user.email === value);

        return isInUsed ? false : true;
      }),
    password: Yup.string().required("Password is required").min(6),
    confirmPassword: Yup.string().oneOf(
      [Yup.ref("password")],
      "Passwords must match",
    ),
  });

  function handleRegister(
    values: RegisterInputProps,
    { resetForm }: { resetForm: () => void },
  ) {
    dispatch(createUser(values));
    navigate("/");
    resetForm();
  }

  return (
    <section className="flex h-screen items-center justify-center">
      <div className="w-full max-w-md space-y-4 rounded-sm bg-[#d6d3d1] p-4 dark:bg-[#2b2d2e]">
        <h1 className="text-xl font-semibold text-stone-900 dark:text-stone-300">
          Register
        </h1>
        <Formik
          enableReinitialize
          initialValues={initialState}
          validationSchema={registerValidation}
          onSubmit={handleRegister}
        >
          {(form) => (
            <Form className="space-y-4">
              <Input
                type="text"
                name="name"
                placeholder="Name"
                onChange={form.handleChange}
              />
              <Input
                type="email"
                name="email"
                placeholder="Email"
                onChange={form.handleChange}
              />
              <Input
                type="password"
                name="password"
                placeholder="Password"
                onChange={form.handleChange}
              />
              <Input
                type="password"
                name="confirmPassword"
                placeholder="Confirm Password"
                onChange={form.handleChange}
              />
              <button
                className="w-full rounded-sm bg-primary py-1 font-medium"
                type="submit"
              >
                Register
              </button>
            </Form>
          )}
        </Formik>
        <p className="text-xs text-stone-900 dark:text-stone-300">
          Already have account?{" "}
          <Link to="/login" className="text-primary hover:underline">
            Login
          </Link>
        </p>
      </div>
    </section>
  );
}

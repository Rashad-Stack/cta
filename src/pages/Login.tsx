import { Form, Formik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import Input from "../components/Input";
import { login, usersSelector } from "../features/users/userSlice";

interface LoginInputProps {
  email: string;
  password: string;
}

const initialState: LoginInputProps = {
  email: "",
  password: "",
};

export default function Login() {
  const users = useSelector(usersSelector);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const loginValidation = Yup.object({
    email: Yup.string()
      .required("Email is required")
      .email("Please enter a valid email address.")
      .test("user", "No account found with this email", (value) => {
        const isInUsed = users.find((user) => user.email === value);

        return isInUsed ? true : false;
      }),
    password: Yup.string()
      .required("Password is required")
      .test("password", "Password didn't match", (value, rest) => {
        const isInUsed = users.find(
          (user) => user.email === rest.parent.email && user.password === value,
        );
        return isInUsed ? true : false;
      }),
  });

  function handleLogin(
    values: LoginInputProps,
    { resetForm }: { resetForm: () => void },
  ) {
    dispatch(login(values));
    navigate("/");
    resetForm();
  }

  return (
    <section className="flex h-screen items-center justify-center">
      <div className="w-full max-w-md space-y-4 rounded-sm bg-[#d6d3d1] p-4 dark:bg-[#2b2d2e]">
        <h1 className="text-xl font-semibold text-stone-900 dark:text-stone-300">
          Login
        </h1>
        <Formik
          enableReinitialize
          initialValues={initialState}
          validationSchema={loginValidation}
          onSubmit={handleLogin}
        >
          {(form) => (
            <Form className="space-y-4">
              <Input
                type="text"
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
              <button
                className="w-full rounded-sm bg-primary py-1 font-medium"
                type="submit"
              >
                Login
              </button>
            </Form>
          )}
        </Formik>
        <p className="text-xs text-stone-900 dark:text-stone-300">
          Don't have account?{" "}
          <Link to="/register" className="text-primary hover:underline">
            Register
          </Link>
        </p>
      </div>
    </section>
  );
}

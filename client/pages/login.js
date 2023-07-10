import { useFormik } from "formik";
import * as yup from "yup";
import { useRouter } from "next/router";

function Login({ setIsLoggedIn }) {
  const router = useRouter();

  const formSchema = yup.object().shape({
    username: yup.string().required("Username is required"),
    password: yup.string().required("Password is required"),
  });

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema: formSchema,
    onSubmit: async (values) => {
      try {
        const response = await fetch("http://127.0.0.1:5555/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(values),
        });

        if (response.ok) {
          const user = await response.json();
          setIsLoggedIn(true);
          router.push("/");
        } else {
          const errorData = await response.json();
          formik.setFieldError("password", errorData.message);
        }
      } catch (error) {
        console.error(error);
      }
    },
  });

  const handleSignUp = () => {
    router.push("/signup");
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="bg-black bg-opacity-31 shadow-md rounded-lg px-8 py-6">
        <h1 className="dark:text-white text-white text-2xl font-bold mb-6">
          Login
        </h1>
        <form onSubmit={formik.handleSubmit}>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="username"
            >
              Username
            </label>
            <input
              className="border border-gray-400 rounded px-3 py-2 w-full focus:outline-none focus:ring focus:border-blue-500"
              type="text"
              id="username"
              placeholder="Username"
              {...formik.getFieldProps("username")}
            />
            {formik.touched.username && formik.errors.username && (
              <p className="text-red-500 text-xs mt-1">{formik.errors.username}</p>
            )}
          </div>
          <div className="mb-6">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="password"
            >
              Password
            </label>
            <input
              className="border border-gray-400 rounded px-3 py-2 w-full focus:outline-none focus:ring focus:border-blue-500"
              type="password"
              id="password"
              placeholder="Password"
              {...formik.getFieldProps("password")}
            />
            {formik.touched.password && formik.errors.password && (
              <p className="text-red-500 text-xs mt-1">{formik.errors.password}</p>
            )}
          </div>
          <div className="flex items-center justify-between">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring focus:border-blue-500"
              type="submit"
            >
              Login
            </button>
            <button
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring focus:border-green-500"
              type="button"
              onClick={handleSignUp}
            >
              Sign Up
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;

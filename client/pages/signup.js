import { useFormik } from "formik";
import * as yup from "yup";
import { useRouter } from "next/router";

function Signup({ setIsLoggedIn }) {
  const router = useRouter();

  const formSchema = yup.object().shape({
    username: yup
      .string()
      .required("You must add a username")
      .min(5, "Username must be at least 5 characters")
      .max(20, "Username must not exceed 20 characters"),
    first_name: yup
      .string()
      .required("First name must be entered")
      .min(5, "First name must be at least 5 characters")
      .max(10, "First name must not exceed 10 characters"),
    second_name: yup
      .string()
      .required("You must enter the second name")
      .min(3, "Second name must be at least 3 characters")
      .max(10, "Second name must not exceed 10 characters"),
    profile_photo: yup.string().required("You must enter an image link"),
    email: yup.string().required("Email must be entered").email("Invalid email"),
    password: yup
      .string()
      .required("You must enter a password")
      .min(8, "Password must be at least 8 characters")
      .max(15, "Password must not exceed 15 characters"),
  });

  const formik = useFormik({
    initialValues: {
      username: "",
      first_name: "",
      second_name: "",
      profile_photo: "",
      email: "",
      password: "",
    },
    validationSchema: formSchema,
    onSubmit: (values) => {
      console.log(values);
      fetch("http://127.0.0.1:5555/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      })
        .then((r) => {
          if (r.ok) {
            alert("YOU HAVE SUCCESSFULLY JOINED INSTATOK");
            setIsLoggedIn(true);
            router.push("/");
          } else {
            alert(
              "SORRY, IT APPEARS THERE WAS A PROBLEM. PLEASE TRY AGAIN LATER."
            );
          }
        })
        .catch((error) => {
          console.error(error);
        });
    },
  });

  return (
    <form onSubmit={formik.handleSubmit} className="flex flex-col items-center">
      <div className="mb-4">
        <label htmlFor="username" className="block text-gray-700 text-sm font-bold mb-2">
          Enter username
        </label>
        <input
          type="text"
          onChange={formik.handleChange}
          value={formik.values.username}
          name="username"
          className="border border-gray-400 rounded px-3 py-2 w-full focus:outline-none focus:ring focus:border-blue-500"
        />
        {formik.errors.username && (
          <p className="text-red-500 text-xs mt-1">{formik.errors.username}</p>
        )}
      </div>

      <div className="mb-4">
        <label htmlFor="first_name" className="block text-gray-700 text-sm font-bold mb-2">
          Enter first name
        </label>
        <input
          type="text"
          onChange={formik.handleChange}
          value={formik.values.first_name}
          name="first_name"
          className="border border-gray-400 rounded px-3 py-2 w-full focus:outline-none focus:ring focus:border-blue-500"
        />
        {formik.errors.first_name && (
          <p className="text-red-500 text-xs mt-1">{formik.errors.first_name}</p>
        )}
      </div>

      <div className="mb-4">
        <label htmlFor="second_name" className="block text-gray-700 text-sm font-bold mb-2">
          Enter second name
        </label>
        <input
          type="text"
          onChange={formik.handleChange}
          value={formik.values.second_name}
          name="second_name"
          className="border border-gray-400 rounded px-3 py-2 w-full focus:outline-none focus:ring focus:border-blue-500"
        />
        {formik.errors.second_name && (
          <p className="text-red-500 text-xs mt-1">{formik.errors.second_name}</p>
        )}
      </div>

      <div className="mb-4">
        <label htmlFor="profile_photo" className="block text-gray-700 text-sm font-bold mb-2">
          Enter profile photo
        </label>
        <input
          type="text"
          onChange={formik.handleChange}
          value={formik.values.profile_photo}
          name="profile_photo"
          className="border border-gray-400 rounded px-3 py-2 w-full focus:outline-none focus:ring focus:border-blue-500"
        />
        {formik.errors.profile_photo && (
          <p className="text-red-500 text-xs mt-1">{formik.errors.profile_photo}</p>
        )}
      </div>

      <div className="mb-4">
        <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">
          Enter email
        </label>
        <input
          type="text"
          onChange={formik.handleChange}
          value={formik.values.email}
          name="email"
          className="border border-gray-400 rounded px-3 py-2 w-full focus:outline-none focus:ring focus:border-blue-500"
        />
        {formik.errors.email && (
          <p className="text-red-500 text-xs mt-1">{formik.errors.email}</p>
        )}
      </div>

      <div className="mb-4">
        <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2">
          Enter password
        </label>
        <input
          type="password"
          onChange={formik.handleChange}
          value={formik.values.password}
          name="password"
          className="border border-gray-400 rounded px-3 py-2 w-full focus:outline-none focus:ring focus:border-blue-500"
        />
        {formik.errors.password && (
          <p className="text-red-500 text-xs mt-1">{formik.errors.password}</p>
        )}
      </div>

      <input
        type="submit"
        value="Register"
        className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring focus:border-green-500 cursor-pointer"
      />
    </form>
  );
}

export default Signup;

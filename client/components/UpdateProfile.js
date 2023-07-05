import { useFormik } from "formik";
import * as yup from 'yup';

function UpdateProfile(){    
  const formSchema = yup.object().shape({
    username: yup.string().min(5).max(10).required("Must enter a username"),
    first_name: yup.string().min(5).max(10).required("You must enter a first name"),
    second_name: yup.string().min(5).max(10).required("Your last name must be entered"),
    profile_photo: yup.string().min(29).required("Must add an image URL"),
    email: yup.string().required("Must input email").email("Invalid email"),
    _password_hash: yup.string().required("Must input password").min(8).max(15),
  });

  const formik = useFormik({
    initialValues: {
      username: "",
      first_name: "",
      second_name: "",
      profile_photo: "",
      email: "",
      _password_hash: "",            
    },
    validationSchema: formSchema,
    onSubmit: (values) => {
      console.log(values);
      fetch("http://localhost:8000/users", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      })
      .then((r) => {
        if (r.ok) {
          alert("Successfully updated");
        } else {
          alert("Please try again later. It appears there was a problem updating your profile.");
        }
      });
    },
  });

  return (
    <form onSubmit={formik.handleSubmit} className="bg-white p-4 rounded-lg shadow-md">
      <label htmlFor="first_name" className="text-gray-700 font-medium mb-1 block">First Name</label>
      <input
        type="text"
        id="first_name"
        className="border border-gray-300 rounded-md py-2 px-3 w-full mb-2"
        onChange={formik.handleChange}
        value={formik.values.first_name}
        name="first_name"
      />
      {formik.errors.first_name && <p className="text-red-500 text-sm mb-2">{formik.errors.first_name}</p>}

      <label htmlFor="second_name" className="text-gray-700 font-medium mb-1 block">Last Name</label>
      <input
        type="text"
        id="second_name"
        className="border border-gray-300 rounded-md py-2 px-3 w-full mb-2"
        onChange={formik.handleChange}
        value={formik.values.second_name}
        name="second_name"
      />
      {formik.errors.second_name && <p className="text-red-500 text-sm mb-2">{formik.errors.second_name}</p>}

      <label htmlFor="email" className="text-gray-700 font-medium mb-1 block">Email</label>
      <input
        type="email"
        id="email"
        className="border border-gray-300 rounded-md py-2 px-3 w-full mb-2"
        onChange={formik.handleChange}
        value={formik.values.email}
        name="email"
      />
      {formik.errors.email && <p className="text-red-500 text-sm mb-2">{formik.errors.email}</p>}

      <label htmlFor="username" className="text-gray-700 font-medium mb-1 block">Username</label>
      <input
        type="text"
        id="username"
        className="border border-gray-300 rounded-md py-2px-3 w-full mb-2"
        onChange={formik.handleChange}
        value={formik.values.username}
        name="username"
      />
      {formik.errors.username && <p className="text-red-500 text-sm mb-2">{formik.errors.username}</p>}

      <label htmlFor="_password_hash" className="text-gray-700 font-medium mb-1 block">New Password</label>
      <input
        type="password"
        id="_password_hash"
        className="border border-gray-300 rounded-md py-2 px-3 w-full mb-2"
        onChange={formik.handleChange}
        value={formik.values._password_hash}
        name="_password_hash"
      />
      {formik.errors._password_hash && <p className="text-red-500 text-sm mb-2">{formik.errors._password_hash}</p>}

      <input
        type="submit"
        value="Update"
        className="bg-blue-500 text-white font-semibold py-2 px-4 rounded-md shadow-md hover:bg-blue-600 cursor-pointer"
      />
    </form>
  );
}

export default UpdateProfile;

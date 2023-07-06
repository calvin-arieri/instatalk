import { useFormik } from "formik";
import * as yup from 'yup';

function UpdateProfile({current_user_details, changes_url}) {
  const formSchema = yup.object().shape({
    username: yup.string().max(20),
    password: yup.string().min(8),
  });

  const formik = useFormik({
    initialValues: {
      username: current_user_details.username,
      password: current_user_details.password,
    },
    validationSchema: formSchema,
    onSubmit: (values) => {
      console.log(values);
      fetch(changes_url, {
        method: 'PATCH',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });
    },
  });

  return (
    <form onSubmit={formik.handleSubmit} className="w-3/4 mx-auto mt-4">
      <label htmlFor="username" className="font-semibold text-lg">
        New username
      </label>
      <input
        onChange={formik.handleChange}
        name="username"
        value={formik.values.username}
        type="text"
        className="border border-gray-300 rounded-md px-3 py-2 mt-1 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      <label htmlFor="password" className="font-semibold text-lg mt-4">
        New password
      </label>
      <input
        type="text"
        onChange={formik.handleChange}
        value={formik.values.password}
        name="password"
        className="border border-gray-300 rounded-md px-3 py-2 mt-1 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      <input
        type="submit"
        name="change"
        value="Change"
        className="bg-blue-500 text-white font-semibold px-4 py-2 mt-4 rounded-md cursor-pointer hover:bg-blue-600"
      />
    </form>
  );
}

export default UpdateProfile;

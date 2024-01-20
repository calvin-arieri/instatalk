import { useFormik } from "formik";
import * as yup from "yup";

function PostForm({ user_get_id }) {
  const formSchema = yup.object().shape({
    image_url: yup.string().required("Must enter an Image URL"),
    caption: yup.string().required("Must enter a caption").min(15).max(100),
  });

  const formik = useFormik({
    initialValues: {
      image_url: "",
      caption: "",
      like: 0,
      dislike: 0,
      user_id: user_get_id,
    },
    validationSchema: formSchema,
    onSubmit: (values) => {
      console.log(values)
      fetch(`https://instatok.onrender.com/posts`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      }).then((r) => {
        if (r.ok) {
          alert("Added successfully");
        }
      });
    },
  });

  return (
    <form onSubmit={formik.handleSubmit} className="w-full lg:w-1/2 mx-auto">
      <label htmlFor="image_url" className="font-semibold text-lg">
        Input image
      </label>
      <input
        type="text"
        value={formik.values.image_url}
        onChange={formik.handleChange}
        name="image_url"
        className="border border-gray-300 rounded-md px-3 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      {formik.errors.image_url && (
        <p className="text-gray-500 mt-1">{formik.errors.image_url}</p>
      )}

      <label htmlFor="caption" className="font-semibold text-lg mt-4">
        Caption
      </label>
      <textarea
        value={formik.values.caption}
        onChange={formik.handleChange}
        name="caption"
        placeholder="Caption"
        className="border border-gray-300 rounded-md px-3 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      {formik.errors.caption && (
        <p className="text-gray-500 mt-1">{formik.errors.caption}</p>
      )}

      <input
        type="submit"
        value="Send"
        className="bg-blue-500 text-white font-semibold px-4 py-2 mt-4 rounded-md cursor-pointer hover:bg-blue-600"
      />
    </form>
  );
}

export default PostForm;

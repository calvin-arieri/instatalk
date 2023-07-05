import { useFormik } from "formik";
import * as yup from "yup";

function PostForm({ the_link }) {
  const formSchema = yup.object().shape({
    image_url: yup.string().required("Must enter an Image URL"),
    comment: yup.string().required("Must enter a caption").min(15).max(100),
  });

  const formik = useFormik({
    initialValues: {
      image_url: "",
      comment: "",
      like: 0,
      dislike: 0,
      user_id: "",
    },
    validationSchema: formSchema,
    onSubmit: (values) => {
      console.log(values);
      fetch(the_link, {
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
    <form onSubmit={formik.handleSubmit} className="bg-white p-4 rounded-lg shadow-md">
      <label htmlFor="image_url" className="text-gray-700 font-medium mb-1 block">Input Image URL</label>
      <input
        type="text"
        id="image_url"
        className="border border-gray-300 rounded-md py-2 px-3 w-full mb-2"
        value={formik.values.image_url}
        onChange={formik.handleChange}
        name="image_url"
      />
      {formik.errors.image_url && <p className="text-red-500 text-sm mb-2">{formik.errors.image_url}</p>}

      <label htmlFor="comment" className="text-gray-700 font-medium mb-1 block">Caption</label>
      <textarea
        id="comment"
        className="border border-gray-300 rounded-md py-2 px-3 w-full h-32 mb-2 resize-none"
        value={formik.values.comment}
        onChange={formik.handleChange}
        name="comment"
        placeholder="Caption"
      />
      {formik.errors.comment && <p className="text-red-500 text-sm mb-2">{formik.errors.comment}</p>}

      <input
        type="submit"
        value="Send"
        className="bg-blue-500 text-white font-semibold py-2 px-4 rounded-md shadow-md hover:bg-blue-600 cursor-pointer"
      />
    </form>
  );
}

export default PostForm;

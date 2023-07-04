import { useFormik } from "formik";
import * as yup from "yup";

function PostForm(){
    
  const formSchema = yup.object().shape({
    image_url: yup.string().email("Invalid url").required("Must enter a Image url"),
    comment: yup.string().required("Must enter a caption").min(15),})

    const formik=useFormik({
        initialValues:{
            image_url:"",
            comment:"",
            like:0,
            dislike:0,
        },
    validationSchema: formSchema,
    onSubmit:(values)=>{

        console.log(values)
    }                
    })
    return(
        <form className="block max-w-sm m-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"  onSubmit={formik.handleSubmit}>
            <input
            type="text"
            value={formik.values.image_url}
            onChange={formik.handleChange}            
             />
             <p style={{ color: "gray" }}> {formik.errors.image_url}</p>
             <textarea 
             value={formik.values.comment}
             onChange={formik.handleChange} 
             placeholder="Caption"></textarea>
               <p style={{ color: "gray" }}> {formik.errors.comment}</p>                         
             <input
             type="submit"
             value="send"/>
        </form>
    )
}
export default PostForm;
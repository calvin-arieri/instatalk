import { useFormik } from "formik";
import * as yup from "yup";

function PostForm({user_get_id}) {
  const formSchema = yup.object().shape({
    image_url: yup.string().required("Must enter an Image URL"),
    caption: yup.string().required("Must enter a caption").min(15).max(100),
  });

    const formik=useFormik({
        initialValues:{
            image_url:"",
            caption:"",
            like:0,
            dislike:0,
            user_id:user_get_id,
        },
    validationSchema: formSchema,
    onSubmit:(values)=>{
        console.log(values)
        fetch(`http://127.0.0.1:5555/posts`,{
            method:'POST',
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify(values),
        })
        .then((r)=>{
            if (r.ok){
                alert("added successfully")
            }
        })
    }                
    })
    return(
        <form onSubmit={formik.handleSubmit} className="w-1/2 ">
            <label htmlFor="image_url">Input image</label>
            <input
            type="text"
            value={formik.values.image_url}
            onChange={formik.handleChange} 
            name="image_url"           
             />
             <p style={{ color: "gray" }}> {formik.errors.image_url}</p>
             <label htmlFor="caption">Caption</label>
             <textarea 
             value={formik.values.caption}
             onChange={formik.handleChange} 
             name="caption"
             placeholder="Caption"></textarea>
               <p style={{ color: "gray" }}> {formik.errors.caption}</p>                         
             <input
             type="submit"
             value="send"/>
        </form>
    )
}

export default PostForm;

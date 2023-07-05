import { useFormik } from "formik";
import * as yup from "yup";

function PostForm({the_link}){
    
  const formSchema = yup.object().shape({
    image_url: yup.string().required("Must enter a Image url"),
    comment: yup.string().required("Must enter a caption").min(15).max(100),})

    const formik=useFormik({
        initialValues:{
            image_url:"",
            comment:"",
            like:0,
            dislike:0,
            user_id:"",
        },
    validationSchema: formSchema,
    onSubmit:(values)=>{
        console.log(values)
        fetch(the_link,{
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
        <form onSubmit={formik.handleSubmit}>
            <label>Input image</label>
            <input
            type="text"
            value={formik.values.image_url}
            onChange={formik.handleChange} 
            name="image_url"           
             />
             <p style={{ color: "gray" }}> {formik.errors.image_url}</p>
             <label>Caption</label>
             <textarea 
             value={formik.values.comment}
             onChange={formik.handleChange} 
             name="comment"
             placeholder="Caption"></textarea>
               <p style={{ color: "gray" }}> {formik.errors.comment}</p>                         
             <input
             type="submit"
             value="send"/>
        </form>
    )
}
export default PostForm;
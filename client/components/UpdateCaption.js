import { useFormik } from "formik";
import * as yup from 'yup'
function UpdateCaption({recieve_link, get_id, get_change}){
    
    const formSchema=yup.object().shape({
        caption:yup.string().min(15).max(50).required("Please enter a new caption")
})
const formik=useFormik({
    initialValues:{
        caption:"",
    },
    validationSchema:formSchema,
    onSubmit:(values)=>{
        console.log(values)
        fetch(`${recieve_link}/${get_id}` ,{
            method: 'PUT',
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify(values),
        })
        .then((r)=>{
            if(r.ok){
               get_change() 
            }
        })
    }
})
    return(
        <div>
            <button>Update Caption</button><br />
            <form onSubmit={formik.handleSubmit}>
                <textarea
                value={formik.values.caption}
                onChange={formik.handleChange}
                placeholder="new caption"
                name="caption"
                >
                </textarea>
                <p>{formik.errors.caption}</p>
                <input 
                type='submit'
                value="send"
                name="caption"
                />                
            </form>
        </div>
    )
}

export default UpdateCaption;
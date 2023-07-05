import { useState } from "react";
import { useFormik } from "formik";
import * as yup from 'yup'
function UpdateCaption(recieve_link){
    
    const formSchema=yup.object().shape({
        comment:yup.string().min(15).max(50).required("Please enter a new caption")
})
const formik=useFormik({
    initialValues:{
        comment:"",
    },
    validationSchema:formSchema,
    onSubmit:(values)=>{
        fetch(recieve_link ,{
            method: 'PATCH',
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify(values),
        })
    }
})
    return(
        <div>
            <buton>Update Caption</buton><br />
            <form onSubmit={formik.handleSubmit}>
                <textarea
                value={formik.values.comment}
                onChange={formik.handleChange}
                placeholder="new caption"
                >
                </textarea>
                <p>{formik.errors.comment}</p>
                <input 
                type='submit'
                value="send"
                name="comment"
                />                
            </form>
        </div>
    )
}

export default UpdateCaption;
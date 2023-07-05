import { useFormik } from "formik"
import * as yup from 'yup'
function SignUp(){
    const formSchema=yup.object().shape(
        {
            username:yup.string().min(5).max(10).required("Must enter a user name"),
            first_name:yup.string().min(5).max(10).required("You must enter a name"),
            second_name:yup.string().min(5).max(10).required("Your second name must be entered"),
            profile_photo:yup.string().min(29).required("Must add image url"),
            email:yup.string().required("Must input email").email("Invalid email"),
            password_hash:yup.string().required("Must put password").min(8).max(15),
        }
    )
    
    const formik=useFormik({
        initialValues:{
            username:"",
            first_name:"",
            second_name:"",
            profile_photo:"",
            email:"",
            password_hash:"",            
        },
        validationSchema:formSchema,
        onSubmit:(values)=>{
            console.log(values)
            fetch("http://localhost:8000/users",{
                method: "POST",
                headers:{
                    "Content-Type":"application/json"
                },
                body:JSON.stringify(values)
            })
            .then((r)=>{
                if(r.ok){
                    alert("You have been added successfully you can now log in.")
                }
                else{
                    alert("please try again later it appears there was a problem registering you")
                }
            })
        }
    })
    return(
        <form onSubmit={()=>{console.log("hello world")}} >
            <label>First name</label>
            <input type="text" onChange={formik.handleChange} value={formik.values.first_name} name="first_name"/>
            <p>{formik.errors.first_name}</p>
            <label>Second name</label>
            <input onChange={formik.handleChange} type='text' value={formik.values.second_name} name="second_name" />
            <p>{formik.errors.second_name}</p>
            <label>Email</label>
            <input type="email" onChange={formik.handleChange} value={formik.values.email} name="email"/>
            <p>{formik.errors.email}</p>
            <label>User name</label>
            <input type="text" onChange={formik.handleChange} value={formik.values.username} name="username" />
            <p>{formik.errors.username}</p>
            <label>New password</label>
            <input type="text" onChange={formik.handleChange} value={formik.values._password_hash} name="_password_hash"/>
            <p>{formik.errors._password_hash}</p>
            <input value='Register' type="submit" />
        </form>
    )
}

export default SignUp;
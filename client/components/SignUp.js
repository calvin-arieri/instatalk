import { useFormik } from "formik";
import * as yup from 'yup'

function SignUp(){
    const formSchema=yup.object().shape({
        username:yup.string().required("You must add username").min(5).max(20),
        first_name:yup.string().required("First name must be entered").min(5).max(10),
        second_name:yup.string().required("Must enter second name").min(3).max(10),
        profile_photo:yup.string().required("must enter image link"),
        email:yup.string().required('Email must be entered').email("Invalid email"),
        _password_hash:yup.string().required("Must enter password").min(8).max(15),
    })

    const formik=useFormik(
        {
            initialValues:{
                username:"",
                first_name:"",
                second_name:"",
                profile_photo:"",
                email:"",
                _password_hash:"",
            },
            validationSchema:formSchema,
            onSubmit:(values)=>{
                console.log(values)
                fetch("",{
                    method:"POST",
                    headers:{
                        "Content-Type":"application/json",
                    },
                    body:JSON.stringify(values)
                })
                .then((r)=>{
                    if(r.ok){
                        alert("YOU HAVE SUCCESSFULLY JOINED INSTATOK")
                    }
                    else{
                        alert("SORRY IT APPEARS THERE WAS A PROBLEM PLEASE TRY AGAIN LATER")
                    }
                })
            }
        }
    )

    return(
        <form onSubmit={formik.handleSubmit}>
            <label htmlFor="username">Enter username</label>
            <input
            type="text"
            onChange={formik.handleChange}
            value={formik.values.username}  
            name="username"
            />
            <p>{formik.errors.username}</p>

            <label htmlFor="first_name">Enter first name</label>
            <input
            type="text"
            onChange={formik.handleChange}
            value={formik.values.first_name}  
            name="first_name"
            />
            <p>{formik.errors.first_name}</p>
            
            <label htmlFor="second_name">Enter second name</label>
            <input
            type="text"
            onChange={formik.handleChange}
            value={formik.values.second_name}  
            name="second_name"
            />
            <p>{formik.errors.second_name}</p>

            <label htmlFor="profile_photo">Enter profile photo</label>
            <input
            type="text"
            onChange={formik.handleChange}
            value={formik.values.profile_photo}  
            name="profile_photo"
            />
            <p>{formik.errors.profile_photo}</p>

            <label htmlFor="email">Enter email</label>
            <input
            type="text"
            onChange={formik.handleChange}
            value={formik.values.email}  
            name="email"
            />
            <p>{formik.errors.email}</p>

            <label htmlFor="_password_hash">Enter password</label>
            <input
            type="text"
            onChange={formik.handleChange}
            value={formik.values._password_hash}  
            name="_password_hash"
            />
            <p>{formik.errors._password_hash}</p>

            <input
            type="submit"
            value="register"
            />                        
        </form>
    )
}

export default SignUp;
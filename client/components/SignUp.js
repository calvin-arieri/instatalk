import { useFormik } from "formik";
import * as yup from 'yup'

function SignUp(){
    const formSchema=yup.object().shape({
        username:yup.string().required("You must add username").min(5).max(20),
        first_name:yup.string().required("First name must be entered").min(5).max(10),
        second_name:yup.string().required("Must enter second name").min(3).max(10),
        profile_photo:yup.string().required("must enter image link"),
        email:yup.string().required('Email must be entered').email("Invalid email"),
        password:yup.string().required("Must enter password").min(8).max(15),
    })

    const formik=useFormik(
        {
            initialValues:{
                username:"",
                first_name:"",
                second_name:"",
                profile_photo:"",
                email:"",
                password:"",
            },
            validationSchema:formSchema,
            onSubmit:(values, e)=>{
                e.target.preventDefault()
                console.log(values)
                fetch("http://127.0.0.1:5555/users",{
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
            <fieldset>
                <legend>Sign Up</legend>
                    <label htmlFor="username" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Enter username</label>
                    <input
                    type="text"
                    onChange={formik.handleChange}
                    value={formik.values.username}  
                    name="username"
                    class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    />
                    <p>{formik.errors.username}</p>

                    <label htmlFor="first_name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Enter first name</label>
                    <input
                    type="text"
                    onChange={formik.handleChange}
                    value={formik.values.first_name}  
                    name="first_name"
                    class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    />
                    <p>{formik.errors.first_name}</p>
                    
                    <label htmlFor="second_name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Enter second name</label>
                    <input
                    type="text"
                    onChange={formik.handleChange}
                    value={formik.values.second_name}  
                    name="second_name"
                    class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    />
                    <p>{formik.errors.second_name}</p>

                    <label htmlFor="profile_photo" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Enter profile photo</label>
                    <input
                    type="text"
                    onChange={formik.handleChange}
                    value={formik.values.profile_photo}  
                    name="profile_photo"
                    class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    />
                    <p>{formik.errors.profile_photo}</p>

                    <label htmlFor="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Enter email</label>
                    <input
                    type="text"
                    onChange={formik.handleChange}
                    value={formik.values.email}  
                    name="email"
                    class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    />
                    <p>{formik.errors.email}</p>

                    <label htmlFor="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Enter password</label>
                    <input
                    type="text"
                    onChange={formik.handleChange}
                    value={formik.values.password}  
                    name="password"
                    class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    />
                    <p>{formik.errors.password}</p>

                    <input
                    type="submit"
                    value="register"
                    />
            </fieldset>                        
        </form>
    )
}

export default SignUp;
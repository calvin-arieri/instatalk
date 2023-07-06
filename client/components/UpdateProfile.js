import { useFormik } from "formik";
import * as yup from 'yup';

function UpdateProfile(){
  const formSchema=yup.object().shape({
    username:yup.string().max(20),
    _password_hash:yup.string().min(8),
  })

  const formik=useFormik(
    {
      initialValues:{
        username:"",
        _password_hash:"",
      },
      validationSchema:formSchema,
      onSubmit:(values)=>{
        console.log(values)
        fetch({blank_for},{
          method:'PATCH',
          headers:{
            "Content-Type":"application/json",
          },
          body:JSON.stringify(values),
        })
      }
    }
  )

  return(
    <form onSubmit={formik.handleSubmit}>
      <label htmlFor="username">New username</label>
      <input
      onChange={formik.handleChange}
      name="username"
      value={formik.values.username}
      type="text"
      />

      <label htmlFor="_password_hash">New password</label>
      <input
      type="text"
      onChange={formik.handleChange}
      value={formik.values._password_hash}
      name="_password_hash"
      />
      <input
      type="submit"
      name="change"
      />
    </form>
  )
}

export default UpdateProfile;
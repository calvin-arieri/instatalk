import React from 'react'
import { useState } from 'react'
import UserPost from '../components/userPost'
import PostForm from '../components/PostForm'
import UpdateProfile from '../components/UpdateProfile'

const Profile = () => {
  const [display, setComponent]=useState(<UserPost />)
  return (
    <div>
      <div>
      <div  className="shadow-md">
            <div className="flex items-center mb-4">
              <img
                src={"data:image/jpeg;base64,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"}
                alt={"current user"}
                className="rounded-full h-16 w-18 mr-4"
              />
              <div>
                <h2 className="text-xl font-semibold">{"Calvin Arieri"}</h2>
                <p className="text-gray-600">@{"arieri calvin"}</p>
              </div>
            </div>
            <div className="items-center">
              <div className="mr-8">
                <p className="text-white hover:text-gray" onClick={()=>{setComponent(<UserPost />)}}>Posts</p>
                <p className="font-semibold text-lg text-black">{3}</p>

              </div>
              <div className="mr-8">
                <p className="text-black" onClick={()=>{setComponent(<PostForm />)}}>Add Post</p>
                <p className="font-semibold text-lg text-black">{758}</p>     

              </div>
              <div>                
                <p className="text-gray-600" onClick={()=>{setComponent(<UpdateProfile />)}}>Update details</p>
                <p className="font-semibold text-lg text-black">{7585}</p>

              </div>
            </div>
            </div>
      </div>
      <div>
        {display}
      </div>
    </div>
   
  )
}


export default Profile







 


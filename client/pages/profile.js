import React from 'react'
import { useState, useEffect } from 'react'
import UserPost from '../components/userPost'
import PostForm from '../components/PostForm'
import UpdateProfile from '../components/UpdateProfile'

const Profile = () => {
  const [userdata, setUserData]=useState()
  const [display, setComponent]=useState(<UserPost />)
  useEffect(()=>{
    fetch(url)
    .then((r)=>r.json())
    .then((data)=>{setUserData(data)})
  },[])
  return (
    <div>
      <div>
      <div  className="shadow-md">
            <div className="flex items-center mb-4">
              <img
                src={userdata.profile_photo}
                alt={userdata.username}
                className="rounded-full h-16 w-18 mr-4"
              />
              <div>
                <h2 className="text-xl font-semibold">{`${userdata.first_name} ${userdata.second_name}`}</h2>
                <p className="text-gray-600">@{userdata.username}</p>
              </div>
            </div>
            <div className="items-center">
              <div className="mr-8">
                <p className="text-white hover:text-gray" onClick={()=>{setComponent(<UserPost />)}}>Posts</p>
                <p className="font-semibold text-lg text-black">{3}</p>

              </div>
              <div className="mr-8">
                <p className="text-black" onClick={()=>{setComponent(<PostForm  user_get_id={userdata.id}/>)}}>Add Post</p>
                <p className="font-semibold text-lg text-black">{758}</p>     

              </div>
              <div>                
                <p className="text-gray-600" onClick={()=>{setComponent(<UpdateProfile current_user_detaills={userdata} />)}}>Update details</p>
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







 


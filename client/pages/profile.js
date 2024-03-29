import React from 'react';
import { useState, useEffect } from 'react';
import UserPost from '../components/userPost';
import PostForm from '../components/PostForm';
import UpdateProfile from '../components/UpdateProfile';

const Profile = () => {
  const id_of_current_user = 2;
  const [userdata, setUserData] = useState({});
  const [refresh, setRefresh]=useState(false)
  useEffect(() => {
    const user_url = `https://instatok.onrender.com/user/${id_of_current_user}`;
    fetch(user_url)
      .then((r) => r.json())
      .then((data) => {
        setUserData(data);
      });
  }, [refresh]);
  function handle_refresh_page(){
    setRefresh(!refresh)
  }
  console.log(userdata);
  const [display, setComponent] = useState(<UserPost user_idNo={id_of_current_user} />);
  return (
    <div className="mx-auto w-3/4">
      <div>
        <div className="shadow-md mx-auto p-4 bg-gray-700 rounded p-1">
          <div className="flex mb-4">
            <img
              src={userdata.profile_photo}
              alt={userdata.username}
              className="rounded-full h-16 w-18 mr-4"
            />
            <div>
              <h2 className="text-xl font-semibold">{`${userdata.first_name} ${userdata.second_name}`}</h2>
              <p className="text-gray-100">@{userdata.username}</p>
            </div>
          </div>         
          <div className="flex mx-auto w-3/4 bg-gray-700 rounded-10">
            <div className="mr-8">
              <p
                className="text-white  text-bold hover:text-gray-800 cursor-pointer"
                onClick={() => {
                  setComponent(<UserPost user_idNo={userdata.id} />);
                }}
              >
                POSTS
              </p>
            </div>
            <div className="mr-8">
              <p
                className="text-white text-bold cursor-pointer"
                onClick={() => {
                  setComponent(<PostForm user_get_id={userdata.id} />);
                }}
              >
                ADD POST
              </p>
              {/* <p className="font-semibold text-lg text-black">{userdata.number_of_followers}</p> */}
            </div>
            <div>
              <p
                className="text-white cursor-pointer"
                onClick={() => {
                  setComponent(
                    <UpdateProfile current_user_details={userdata} this_function={handle_refresh_page} />
                  );
                }}
              >
                UPDATE DETAILS
              </p>
            </div>
          </div>
        </div>
      </div>
      <div>{display}</div>
    </div>
  );
};

export default Profile;

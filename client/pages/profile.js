import React from 'react';
import { useState, useEffect } from 'react';
import UserPost from '../components/userPost';
import PostForm from '../components/PostForm';
import UpdateProfile from '../components/UpdateProfile';

const Profile = () => {
  const id_of_current_user = 2;
  const [userdata, setUserData] = useState({});
  useEffect(() => {
    const user_url = `http://127.0.0.1:5555/user/${id_of_current_user}`;
    fetch(user_url)
      .then((r) => r.json())
      .then((data) => {
        setUserData(data);
      });
  }, []);
  console.log(userdata);
  const [display, setComponent] = useState(<UserPost user_idNo={id_of_current_user} />);
  return (
    <div className="mx-auto w-3/4">
      <div>
        <div className="shadow-md mx-auto p-4">
          <div className="flex mb-4">
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

          <div className="flex mx-auto w-3/4">
            <div className="mr-8">
              <p
                className="text-gray-600 hover:text-gray-800 cursor-pointer"
                onClick={() => {
                  setComponent(<UserPost user_idNo={userdata.id} />);
                }}
              >
                Posts
              </p>
            </div>
            <div className="mr-8">
              <p
                className="text-black cursor-pointer"
                onClick={() => {
                  setComponent(<PostForm user_get_id={userdata.id} />);
                }}
              >
                Add Post
              </p>
              <p className="font-semibold text-lg text-black">{userdata.number_of_followers}</p>
            </div>
            <div>
              <p
                className="text-gray-600 cursor-pointer"
                onClick={() => {
                  setComponent(
                    <UpdateProfile current_user_details={userdata} changes_url={`http://127.0.0.1:5555/user/${id_of_current_user}`} />
                  );
                }}
              >
                Update Details
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

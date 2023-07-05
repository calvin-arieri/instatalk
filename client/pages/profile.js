import React, { useState } from 'react';
import UserPost from '../components/userPost';
import PostForm from '../components/PostForm';
import UpdateProfile from '../components/UpdateProfile';

const Profile = () => {
  const [display, setComponent] = useState(<UserPost />);

  return (
    <div className="flex flex-col items-center justify-center py-10">
      <div className="shadow-md p-6 bg-white rounded-lg w-96">
        <div className="flex items-center mb-4">
          <img
            className="w-16 h-18 rounded-full mr-4"
            src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fHByb2ZpbGVzfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60" // Replace with the path to the profile image
            alt="Profile Avatar"
          />
          <div>
            <h2 className="text-xl text-black font-semibold">Calvin Arieri</h2>
            <p className="text-gray-600">@arieri_calvin</p>
          </div>
        </div>
        <div className="flex justify-around mb-4">
        <div className="text-center mt-2 cursor-pointer" onClick={() => setComponent(<UserPost />)}>
  <div className="flex text-black flex-col items-center">
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-10 h-10">
  <path fill-rule="evenodd" d="M1.5 6a2.25 2.25 0 012.25-2.25h16.5A2.25 2.25 0 0122.5 6v12a2.25 2.25 0 01-2.25 2.25H3.75A2.25 2.25 0 011.5 18V6zM3 16.06V18c0 .414.336.75.75.75h16.5A.75.75 0 0021 18v-1.94l-2.69-2.689a1.5 1.5 0 00-2.12 0l-.88.879.97.97a.75.75 0 11-1.06 1.06l-5.16-5.159a1.5 1.5 0 00-2.12 0L3 16.061zm10.125-7.81a1.125 1.125 0 112.25 0 1.125 1.125 0 01-2.25 0z" clip-rule="evenodd" />
</svg>

<p className="text-sm text-black hover:text-gray-600">Posts</p>
    <p className="font-semibold text-lg text-black">3</p>
  </div>
</div>

          <div className="text-center">
  <button
    className="text-black hover:text-gray-600 focus:outline-none"
    onClick={() => setComponent(<PostForm />)}
  >
    <span className="flex items-center justify-center bg-gray-200 rounded-full w-10 h-10 mx-auto mb-2">
      <svg
        className="w-6 h-6 text-black"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M12 6v6m0 0v6m0-6h6m-6 0H6"
        ></path>
      </svg>
    </span>
    <p className="text-sm text-black hover:text-gray-600">Add Post</p>
    <p className="font-semibold text-lg text-black">758</p>
  </button>
</div>

<div className="text-center">
  <button
    className="text-gray-600 hover:text-gray-800 focus:outline-none"
    onClick={() => setComponent(<UpdateProfile />)}
  >
    <span className="flex items-center justify-center bg-gray-200 rounded-full w-10 h-10 mx-auto mb-2">
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
  <path fillRule="evenodd" d="M4.755 10.059a7.5 7.5 0 0112.548-3.364l1.903 1.903h-3.183a.75.75 0 100 1.5h4.992a.75.75 0 00.75-.75V4.356a.75.75 0 00-1.5 0v3.18l-1.9-1.9A9 9 0 003.306 9.67a.75.75 0 101.45.388zm15.408 3.352a.75.75 0 00-.919.53 7.5 7.5 0 01-12.548 3.364l-1.902-1.903h3.183a.75.75 0 000-1.5H2.984a.75.75 0 00-.75.75v4.992a.75.75 0 001.5 0v-3.18l1.9 1.9a9 9 0 0015.059-4.035.75.75 0 00-.53-.918z" clipRule="evenodd" />
</svg>

    </span>
    <p className="text-sm text-gray-600 hover:text-gray-800">Update Details</p>
    <p className="font-semibold text-lg text-black">7585</p>
  </button>
</div>


        </div>
      </div>
      <div className="mt-6">
        {display}
      </div>
    </div>
  );
};

export default Profile;





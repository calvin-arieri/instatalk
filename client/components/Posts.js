import { useEffect, useState } from 'react';

const Posts = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8000/users')
      .then((response) => response.json())
      .then((data) => setUsers(data));
  }, []);

  return (
    <div className="container mx-auto px-4">
      <h1 className="text-3xl font-bold mb-4">Posts</h1>
      <div className="grid grid-cols-3 gap-4">
        {users.map((user) => (
          <div key={user.id} className="flex flex-col items-center">
            <div className="w-64 bg-white rounded-lg shadow-md">
              <img
                src={user.profilePicture}
                alt={user.name}
                className="w-full h-64 object-cover rounded-t-lg"
              />
              <div className="px-4 py-3">
                <div className="flex items-center mb-2">
                  <img
                    src={user.profilePicture}
                    alt={user.name}
                    className="w-8 h-8 rounded-full mr-2 object-cover"
                  />
                  <p className="text-gray-700 font-bold">@{user.username}</p>
                </div>
                <p className="text-gray-800 mb-4">
                  {user.caption}
                </p>
                <div className="flex items-center mb-2">
                  <button className="flex items-center text-gray-700 mr-4">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 mr-1"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 15l7-7 7 7"
                      />
                    </svg>
                    <span>{user.likes} Likes</span>
                  </button>
                  <button className="flex items-center text-gray-700 mr-4">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 mr-1"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 19l-7-7 7-7"
                      />
                    </svg>
                    <span>{user.comments} Comments</span>
                  </button>
                  <button className="flex items-center text-gray-700">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 mr-1"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                    <span>{user.shares} Shares</span>
                  </button>
                </div>
                <div className="border-t border-gray-200 pt-3">
                  <input
                    type="text"
                    placeholder="Add a comment..."
                    className="w-full border-none focus:outline-none"
                  />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Posts;

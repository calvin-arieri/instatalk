import { useEffect, useState } from 'react';

const Users = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8000/users')
      .then((response) => response.json())
      .then((data) => setUsers(data));
  }, []);

  return (
    <div className="container mx-auto px-4">
      <h1 className="text-3xl font-bold mb-4">Users</h1>
      <div className="grid grid-cols-3 gap-8">
        {users.map((user) => (
          <div key={user.id} className="bg-white rounded-lg p-6 shadow-md">
            <div className="flex items-center mb-4">
              <img
                src={user.profilePicture}
                alt={user.name}
                className="rounded-full h-16 w-18 mr-4"
              />
              <div>
                <h2 className="text-xl font-semibold">{user.name}</h2>
                <p className="text-gray-600">@{user.username}</p>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div className="mr-8">
                <p className="text-black">Posts</p>
                <p className="font-semibold text-lg text-black">{user.posts}</p>

              </div>
              <div className="mr-8">
                <p className="text-black">Followers</p>
                <p className="font-semibold text-lg text-black">{user.followers}</p>
     

              </div>
              <div>
                
                <p className="text-gray-600">Following</p>
                <p className="font-semibold text-lg text-black">{user.following}</p>

              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Users;

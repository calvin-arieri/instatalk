import { useEffect, useState } from 'react';

const Stories = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8000/users')
      .then((response) => response.json())
      .then((data) => setUsers(data));
  }, []);

  return (
    <div className="container mx-auto px-4">
      <h1 className="text-3xl font-bold mb-4">Stories</h1>
      <div className="grid grid-cols-3 gap-8">
        {users.map((user) => (
          <div key={user.id} className="flex flex-col items-center">
            <div className="w-32 h-32 overflow-hidden rounded-full">
              <img
                src={user.profilePicture}
                alt={user.name}
                className="w-full h-full object-cover"
              />
            </div>
            <p className="text-gray-600 mt-2">@{user.username}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Stories;

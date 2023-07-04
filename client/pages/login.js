import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  useEffect(() => {
    // Check if the user is already logged in and redirect to the desired page
    // This can be done by making a GET request to your Flask API endpoint that checks the session or authentication status
    // Example:
    // fetch("/api/checkAuth")
    //   .then((response) => {
    //     if (response.status === 200) {
    //       router.push("/dashboard");
    //     }
    //   })
    //   .catch((error) => {
    //     console.error(error);
    //   });
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();
    // You can add your login logic here
    // Assuming the login is successful, redirect to the homepage
    router.push("/");
  };



  // const handleLogin = async (e) => {
  //   e.preventDefault();
  //   try {
  //     // Make a POST request to your Flask login route
  //     const response = await fetch("/api/login", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({ username, password }),
  //     });

  //     // Assuming the Flask API returns a success response
  //     if (response.ok) {
    
  //       router.push("/");
  //     }
  //   } catch (error) {
    
  //     console.error(error);
  //   }
  // };

  const handleSignUp = () => {

  };

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="bg-black bg-opacity-31 shadow-md rounded-lg px-8 py-6">
        <h1 className="dark:text-white text-white text-2xl font-bold mb-6">Login</h1>
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="username"
            >
              Username
            </label>
            <input
              className="border border-gray-400 rounded px-3 py-2 w-full focus:outline-none focus:ring focus:border-blue-500"
              type="text"
              id="username"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="mb-6">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="password"
            >
              Password
            </label>
            <input
              className="border border-gray-400 rounded px-3 py-2 w-full focus:outline-none focus:ring focus:border-blue-500"
              type="password"
              id="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring focus:border-blue-500"
              type="submit"
            >
              Login
            </button>
            <button
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring focus:border-green-500"
              type="button"
              onClick={handleSignUp}
            >
              Sign Up
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;





// import React, { useState } from "react";
// import { useRouter } from "next/router";

// function Login() {
//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");
//   const router = useRouter();

//   const handleLogin = (e) => {
//     e.preventDefault();
//     // You can add your login logic here
//     // Assuming the login is successful, redirect to the homepage
//     router.push("/");
//   };

//   return (
//     <div className="flex items-center justify-center h-screen">
//       <div className="bg-black bg-opacity-31 shadow-md rounded-lg px-8 py-6">
//         <h1 className="text-2xl font-bold mb-6">Login</h1>
//         <form onSubmit={handleLogin}>
//           <div className="mb-4">
//             <label
//               className="block text-gray-700 text-sm font-bold mb-2"
//               htmlFor="username"
//             >
//               Username
//             </label>
//             <input
//               className="border border-gray-400 rounded px-3 py-2 w-full focus:outline-none focus:ring focus:border-blue-500"
//               type="text"
//               id="username"
//               placeholder="Username"
//               value={username}
//               onChange={(e) => setUsername(e.target.value)}
//             />
//           </div>
//           <div className="mb-6">
//             <label
//               className="block text-gray-700 text-sm font-bold mb-2"
//               htmlFor="password"
//             >
//               Password
//             </label>
//             <input
//               className="border border-gray-400 rounded px-3 py-2 w-full focus:outline-none focus:ring focus:border-blue-500"
//               type="password"
//               id="password"
//               placeholder="Password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//             />
//           </div>
//           <div className="flex items-center justify-between">
//             <button
//               className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring focus:border-blue-500"
//               type="submit"
//             >
//               Login
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// }

// export default Login;


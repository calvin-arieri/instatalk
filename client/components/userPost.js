import { useEffect, useState } from "react";
import DeleteButton from "./deleteButton";
import PostForm from "./PostForm";
import UpdateCaption from "./UpdateCaption";

function UserPost() {
  const [userPosts, setUserPosts] = useState([]);
  const [refreshPage, setRefreshPage] = useState(false);
  const url = "https://keroka-dealers.onrender.com/Cars";

  useEffect(() => {
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        if (data.length > 0) {
          setUserPosts(data);
        } else {
          setUserPosts([]);
        }
      });
  }, [refreshPage]);

  function handlePageRefresh() {
    setRefreshPage(!refreshPage);
  }

  return (
    <div className="grid gap-4 justify-center md:grid-cols-2 lg:grid-cols-3">
      {userPosts.length === 0 ? (
        <div className="text-center">Loading...</div>
      ) : (
        userPosts.map((post) => (
          <div
            key={post.id}
            className="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
          >
            <img
              className="rounded-t-lg"
              src={post.image}
              alt={`User: ${post.name}`}
            />
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              {post.name}
            </h5>
            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
              {post.comment}
            </p>
            <DeleteButton
              number={post.id}
              deleteLink={url}
              getChange={handlePageRefresh}
            />
            <UpdateCaption receiveLink={url} />
          </div>
        ))
      )}
    </div>
  );
}

export default UserPost;

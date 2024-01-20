
import { useEffect, useState, useRef, } from 'react';
import { useTheme } from 'next-themes';
import images from '../assets';
import Image from 'next/image'




const Posts = () => {
  const { theme } = useTheme();

  const [hideButtons, setHideButtons] = useState(false);


  const scrollRef = useRef(null);

  const parentRef = useRef(null);

  const handleScroll = (direction) => {
    const { current } = scrollRef;

    const scrollAmount = window.innerWidth > 1800 ? 270 : 210;

    if (direction === 'left') {
      current.scrollLeft -= scrollAmount;
    } else {
      current.scrollLeft += scrollAmount;
    }
  };

  // check if scrollRef container is overfilling its parentRef container
  const isScrollable = () => {
    const { current } = scrollRef;
    const { current: parent } = parentRef;

    if (current?.scrollWidth >= parent?.offsetWidth) return setHideButtons(false);
    return setHideButtons(true);
  };

  // if window is resized
  useEffect(() => {
    isScrollable();
    window.addEventListener('resize', isScrollable);

    return () => {
      window.removeEventListener('resize', isScrollable);
    };
  });

  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch('https://instatok.onrender.com/users')
      .then((response) => response.json())
      .then((data) => setUsers(data));
  }, []);

  const handleLike = (userId) => {
    setUsers((prevUsers) =>
      prevUsers.map((user) => {
        if (user.id === userId) {
          return { ...user, liked: !user.liked };
        }
        return user;
      })
    );
  };

  return (
    <div className="flex justify-center sm:px-2 p-2 mt-6 mb-40">
    <div className="w-full minmd:w-4/5">

    <div>
        <h1 className="font-poppins dark:text-white text-nft-black-1 text-2xl minlg:text-4xl font-semibold ml-4 xs:ml-0">Posts</h1>

         <div className="relative flex-1 max-w-full flex mt-3" ref={parentRef}>
        <div className="flex flex-row w-max overflow-x-scroll no-scrollbar select-none gap-6" ref={scrollRef}>
        {users.map((user) => (
          <div key={user.id} className="flex flex-col items-center">
            <div className="w-66 bg-white rounded-lg shadow-md">
              <img
                src={user.profile_photo}
                alt={user.name}
                className="w-full h-64 object-cover rounded-t-lg"
              />
              <div className="px-4 py-3">
                <div className="flex items-center mb-2">
                  <img
                    src={user.profile_photo}
                    alt={user.name}
                    className="w-8 h-8 rounded-full mr-2 object-cover"
                  />
                  <p className="text-gray-700 font-bold">@{user.username}</p>
                </div>
                <p className="text-gray-800 mb-4">
                  {user.caption}
                </p>
                <div className="flex items-center mb-2">
                
                <button
  className={`flex items-center justify-center font-semibold text-black mr-4 ${user.liked ? 'bg-red-500' : ''}`}
  onClick={() => handleLike(user.id)}
>
  <svg xmlns="http://www.w3.org/2000/svg" fill={user.liked ? 'currentColor' : 'none'} viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={`w-10 h-10 ${user.liked ? 'text-white' : ''}`}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
  </svg>
</button>



                    <span className='text-black'>{user.number_of_likes} Likes</span>
               
                  <button className="flex items-center font-semibold text-black mr-4">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
  <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z" />
</svg>

                    <span>{user.number_of_comments} Comments</span>
                  </button>
                  <button className="flex items-center font-semibold text-black">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
</svg>

                    
                    <span>{user.number_of_shares} Shares </span>
                  </button>
                </div>
                <div className="border-t border-gray-200 pt-3">
  <input
    type="text"
    placeholder="Add a comment..."
    className="w-full border-none focus:outline-none px-3 py-2 rounded-lg bg-gray-200 text-gray-800 placeholder-gray-400 focus:bg-white"
    style={{ boxShadow: '0 1px 2px rgba(0, 0, 0, 0.1)' }}
  />
</div>

              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
    {!hideButtons && (
                    <>
                      <div onClick={() => handleScroll('left')} className="absolute w-8 h-8 minlg:w-12 minlg:h-12 top-px-92 cursor-pointer left-0">
                        <Image src={images.left} layout="fill" objectFit="contain" alt="left_arrow" className={theme === 'light' ? 'filter invert' : undefined} />
                      </div>
                      <div onClick={() => handleScroll('right')} className="absolute w-8 h-8 minlg:w-12 minlg:h-12 top-100 cursor-pointer right-0">
                        <Image src={images.right} layout="fill" objectFit="contain" alt="left_arrow" className={theme === 'light' ? 'filter invert' : undefined} />
                      </div>
                    </>
                  )}
                </div>
              </div>
              </div>
    
);
}
  
export default Posts;




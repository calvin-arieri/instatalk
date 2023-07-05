import { useEffect, useState, useRef, } from 'react';
import { useTheme } from 'next-themes';
import images from '../assets';
import Image from 'next/image'




const Users = () => {
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
    fetch('http://localhost:8000/users')
      .then((response) => response.json())
      .then((data) => setUsers(data));
  }, []);

  return (
    <div className="flex justify-center sm:px-2 p-2 mt-4">
    <div className="w-full minmd:w-4/5">

    <div>
        <h1 className="font-poppins dark:text-white text-nft-black-1 text-2xl minlg:text-4xl font-semibold ml-4 xs:ml-0">Users</h1>

         <div className="relative flex-1 max-w-full flex mt-3" ref={parentRef}>
        <div className="flex flex-row w-max overflow-x-scroll no-scrollbar select-none gap-3" ref={scrollRef}>
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
    {!hideButtons && (
                    <>
                      <div onClick={() => handleScroll('left')} className="absolute w-8 h-8 minlg:w-12 minlg:h-12 top-px-47 cursor-pointer left-0">
                        <Image src={images.left} layout="fill" objectFit="contain" alt="left_arrow" className={theme === 'light' ? 'filter invert' : undefined} />
                      </div>
                      <div onClick={() => handleScroll('right')} className="absolute w-8 h-8 minlg:w-12 minlg:h-12 top-50 cursor-pointer right-0">
                        <Image src={images.right} layout="fill" objectFit="contain" alt="left_arrow" className={theme === 'light' ? 'filter invert' : undefined} />
                      </div>
                    </>
                  )}
                </div>
              </div>
              </div>

           






    
    


     

 
 




          
            
);
}
  
export default Users;








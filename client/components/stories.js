import { useEffect, useState, useRef, } from 'react';
import { useTheme } from 'next-themes';
import images from '../assets';
import Image from 'next/image'




const Stories = () => {
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
    <div className="flex justify-center sm:px-2 p-2 ">
    <div className="w-full minmd:w-4/5">

    <div>
        <h1 className="font-poppins dark:text-white text-nft-black-1 text-2xl minlg:text-4xl font-semibold ml-4 xs:ml-0">Stories</h1>

         <div className="relative flex-1 max-w-full flex mt-3" ref={parentRef}>
        <div className="flex flex-row w-max overflow-x-scroll no-scrollbar select-none gap-3" ref={scrollRef}>
        {users.map((user) => (
          <div key={user.id} className="flex flex-col items-center ">
            <div className="w-32 h-32 relative ">
              <img
                src={user.profilePicture}
                alt={user.name}
                className="w-full h-full object-cover rounded-full "
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-32 h-32 border-4 border-green-500 rounded-full"></div>
              </div>
            </div>
            <p className="text-gray-600 mt-2">@{user.username}</p>
          </div>
        ))}
      </div>
    </div>
    {!hideButtons && (
                    <>
                      <div onClick={() => handleScroll('left')} className="absolute w-8 h-8 minlg:w-12 minlg:h-12 top-40 cursor-pointer left-0">
                        <Image src={images.left} layout="fill" objectFit="contain" alt="left_arrow" className={theme === 'light' ? 'filter invert' : undefined} />
                      </div>
                      <div onClick={() => handleScroll('right')} className="absolute w-8 h-8 minlg:w-12 minlg:h-12 top-40 cursor-pointer right-0">
                        <Image src={images.right} layout="fill" objectFit="contain" alt="left_arrow" className={theme === 'light' ? 'filter invert' : undefined} />
                      </div>
                    </>
                  )}
                </div>
              </div>
              </div>

           






    
    


     

 
 




          
            
);
}
  
export default Stories;

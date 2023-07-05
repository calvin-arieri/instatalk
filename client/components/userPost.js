import { useEffect , useState} from "react";
import DeleteButton from "./deleteButton";
import PostForm from "./PostForm";
import UpdateCaption from "./UpdateCaption";

function UserPost(){
    const [user_post , setUserPost]=useState()
    const [refresh_page, setRefreshPage]=useState(false)
    const url= "https://keroka-dealers.onrender.com/Cars"
    useEffect(()=>{
      fetch(url)
      .then((r)=>r.json())
      .then((data)=>{
        if(data.length > 0){
            setUserPost(data)
        }
        else{
            setUserPost( )
        }
      })
      
    },[refresh_page])
    function respond_server_here(){
        setRefreshPage(!refresh_page)
    }
    return(
        <div className='flex ... flex-wrap place-content-center space-x-4 space-y-4'>
            {user_post == undefined ? <div >loading...</div>: user_post.map((post)=>{
                return(
                    <div key={post.id} class="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
                        <img class="rounded-t-lg" src={post.image} alt={`user name: ${post.name}`} />
                        <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{post.name}</h5>
                        <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">
                            {post.comment}
                        </p>
                        <DeleteButton number={post.id} delete_link={url} get_change={respond_server_here}/>
                        <UpdateCaption recieve_link={url}  />
                    </div>

                )
            })}
        </div>
    )

}
 
export default UserPost;
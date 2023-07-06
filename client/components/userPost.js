import { useEffect , useState} from "react";
import DeleteButton from "./deleteButton";
import UpdateCaption from "./UpdateCaption";

function UserPost({user_idNo}){
    const [user_post , setUserPost]=useState([])
    const [refresh_page, setRefreshPage]=useState(false)
    const specific_link="http://127.0.0.1:5000/post"
    useEffect(()=>{
      fetch(`http://127.0.0.1:5000/posts`)
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

   let filtered_post=user_post.filter((post_available)=>{
        if(post_available.user_id== user_idNo){
            return post_available
        }
        else{
            return undefined
        }
    })
    return(
        <div className='flex ... flex-wrap place-content-center space-x-4 space-y-4'>
            {user_post == [] ? <div >loading...</div>: filtered_post.map((post)=>{
                return(
                    <div key={post.id} class="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
                        <img class="rounded-t-lg" src={post.image_url} alt={`user name: ${post.id}`} />
                        <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{post.created_at}</h5>
                        <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">
                            {post.caption}
                        </p>
                        <DeleteButton number={post.id} delete_link={specific_link} get_change={respond_server_here}/>
                        <UpdateCaption get_id={post.id} recieve_link={specific_link} get_change={respond_server_here} />
                    </div>

                )
            })}
        </div>
    )

}
 
export default UserPost;
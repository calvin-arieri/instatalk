import { useRouter } from 'next/router';

function DeleteButton({delete_link, number, get_change}){
    function handleDelete(){
        fetch(`${delete_link}/${number}` ,{
        method: 'DELETE',}
        )
        .then((r)=>{
            if(r.ok){
               get_change() 
            }
        })
        
    }
    return(
        <button className='mt-4' 
        onClick={handleDelete}
        >Delete</button>
    )
}

export default DeleteButton;
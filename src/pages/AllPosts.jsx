import React,{useState,useEffect} from 'react'
import appwriteService from '../appwrite/config'
import { Container,PostCard } from '../components'


function AllPosts() {
    const [post,setPosts] = useState([])
        useEffect(()=>{
            appwriteService.getPost([].then((posts)=>{
                if(posts){setPosts(
                   setPosts(posts.documents)
                )}
            })
               
            )
        },[])
    
  return (
    <div className='w-full py-8'>
        <Container>
           <div className='flex flex-wrap'>
           {posts.map((posts)=>(
                <div key={post.$id} className='p-2 w-1/4'>
                    <PostCard post = {post}/>
                </div>
            ))}
           </div>
        </Container>
    </div>
  )
}

export default AllPosts
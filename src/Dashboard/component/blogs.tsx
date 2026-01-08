import "../../landingpage/componets/Blogs/blog.css";
// import { blogsList } from '../../landingpage/componets/Blogs/blogsList'
import BlogCard from '../../landingpage/componets/Blogs/blogCard'
import CreateBlog from './createBlog';
import useBlogs from '../../Hooks/useBlogs';
import { ClipLoader } from 'react-spinners';
import { useDispatch } from 'react-redux';
import { setCurrentPage } from '../../store/Slice';
const Blogs = () => {
    const {blogs,loading}=useBlogs();
    const dispatch=useDispatch()
  return (
    <div className={`responsive-container d-flex`} style={{padding:10,background:'white',borderRadius:30,maxHeight:"95vh",overflow:"auto"}}>
         <div className={`blogs`}>
                {loading && <ClipLoader size={20} />}
    {blogs.map((blog:any,i:number)=>{
        return <BlogCard onEdit={(item:any)=>{
            dispatch(setCurrentPage("/edit-blogs"))
            sessionStorage.setItem("editBlog",JSON.stringify(item));
            
        }} deleteable item={blog} key={i}/>
    })}
    </div>

     <div className={`others`} style={{padding:10,margin:10}}>
             <CreateBlog/>
            </div>

    </div>
  )
}

export default Blogs
import { MDBBtn } from "mdb-react-ui-kit"
import { BlogItem } from "./blogsList"
import { deleteData } from "../../../Logics/deleteData"
import { ClipLoader } from "react-spinners";
import { useState } from "react";
import toast from "react-hot-toast";
import { Button } from "@mui/material";
import { DeleteIcon, EditIcon } from "lucide-react";
import { truncateString } from "@/Logics/date";


const BlogCard:React.FC<{item:BlogItem,onEdit?:(item:BlogItem)=>void,deleteable?:boolean}> = ({item,onEdit,deleteable}) => {

  const [deleting,setDeleting]=useState<boolean>(false);
  const deleteItem=async ()=>{
    try{
      setDeleting(true)
const res=await deleteData("Blogs",item?.docId as string)
console.log(res);
toast.success("Operation successful")
    }
    catch(err:any){
      console.log(err)
        }
    finally{
console.log("delete operation completed");
setDeleting(false);
    }
  }

  return (
    <div className="blogCard" >
      <img style={{height:200,width:"100%",borderRadius:10,objectFit:"cover",objectPosition:"center"}} src={item.image}/>
      <div style={{padding:10,position:"relative"}}>
<b style={{color:`var(--blue)`}}>{item.title}</b><br/>
<span style={{color:"darkgray"}}>
{truncateString(item.text,150)}    
</span>
<br/>
<br/>
<div style={{gap:10,width:"100%",flexFlow:"row wrap"}} className={onEdit ? `flex items-center justify-content-between`:``}>
<span style={{fontWeight:"bold"}}>{item.date}</span>
{onEdit && <Button variant="outlined" startIcon={<EditIcon />} onClick={() => onEdit(item)}>Edit</Button>}
{deleteable && <Button variant="outlined" startIcon={<DeleteIcon />} onClick={deleteItem}>{deleting ? <ClipLoader size={15}/>:"delete"}</Button>}
</div>
      </div>
    </div>
  )
}

export default BlogCard

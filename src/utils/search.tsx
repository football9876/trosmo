import { IconButton } from '@mui/material';

import { FaSearch } from 'react-icons/fa';
interface Props{
    style:any,
    onChange?:(e:string)=>void;
}
const Search:React.FC<Props>=({style={},onChange})=>{
return (<div className='Search flex ' style={{maxHeight:50,overflow:"visible",marginTop:2,marginLeft:-10,...style}}>
    <IconButton style={{width:35,height:35,margin:-1}}><FaSearch/></IconButton>
    <input onChange={(e)=>{
        const {target:{value}}=e;
        if(onChange)onChange(value)
    }} style={{maxHeight:30}} placeholder='Search Aa..'/>
</div>)

}

export default Search;
import React  from "react";
interface Props{
    children?:any,
    style?:any,
    onClick?:()=>void;
}
const LinkDark:React.FC<Props>=({children,style={},onClick})=>{
    return (<span className="LinkDark" onClick={()=>{
        if(onClick)onClick()
    }}><small style={style}>
{children ||""}
    </small>
    </span>)
}

export default LinkDark
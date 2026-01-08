import React  from "react";
interface Props{
    children?:any,
    style?:any
}
const H3Header:React.FC<Props>=({children,style={}})=>{
    return (<h3 className="PHeader" style={style}><span >
{children ||""}
    </span>
    </h3>)
}

export default H3Header
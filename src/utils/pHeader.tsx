import React  from "react";
interface Props{
    children?:any,
    style?:any
}
const PHeader:React.FC<Props>=({children,style={}})=>{
    return (<h4 className="PHeader" style={style}><span >
{children ||""}
    </span>
    </h4>)
}

export default PHeader
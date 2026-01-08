import React  from "react";
interface Props{
    children?:any,
    style?:any
}
const Small:React.FC<Props>=({children,style={}})=>{
    return (<span className="smallP"><small style={style}>
{children ||""}
    </small>
    </span>)
}

export default Small
import React  from "react";
interface Props{
    children?:any,
    style?:any
}
const BoldBlackP1:React.FC<Props>=({children,style={}})=>{
    return (<span className="boldBlackP"><b style={style}>
{children ||""}
    </b>
    </span>)
}

export default BoldBlackP1
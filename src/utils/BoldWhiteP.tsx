import React  from "react";
interface Props{
    children?:any,
    style?:any
}
const BoldWhiteP:React.FC<Props>=({children,style={}})=>{
    return (<span className="boldWhiteP"><b style={style}>
{children ||""}
    </b>
    </span>)
}

export default BoldWhiteP
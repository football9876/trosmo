import React  from "react";
interface Props{
    children?:any,
    style?:any
}
const SmallLight:React.FC<Props>=({children,style={}})=>{
    return (<span className="smallLightP"><small style={style}>
{children ||""}
    </small>
    </span>)
}

export default SmallLight

import BoldBlackP from './BoldBlackP';
interface Props{
    text?:string | any
}
const NoData:React.FC<Props>=({text="No Data Found Here"})=>{
    return (
        <>
        <div style={{width:"100%",height:"100%"}} className='text-center'>
<img src='/Images/noData.webp' style={{objectFit:"contain",width:80,height:80}} alt=''/>
<BoldBlackP>{text}</BoldBlackP>
        </div>
        </>
    )
}

export default NoData;
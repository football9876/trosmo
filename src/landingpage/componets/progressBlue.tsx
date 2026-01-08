
interface props{
    width:string
}
const ProgressBlue:React.FC<props> = ({width}) => {
  return (
    <div style={{height:4,borderRadius:10,background:"lightgray",overflow:"hidden"}}>
    <div style={{height:4,background:"rgb(0,0,0)",width}}></div>
        </div>
  )
}

export default ProgressBlue
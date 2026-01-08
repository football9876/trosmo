

interface Props{
    image?:string,
    name?:string,
    style?:any,
    textStyle?:any,
    size?:number
}

const AppLogo:React.FC<Props>=({image='/icon.svg',name="Kad Dataset",style,size=50,textStyle={}})=>{
    return (
        <>
        <div className='appLogo d-flex align-items-center'>
<img src={image} alt='' width={size} height={size} style={style? style:{}}/>
<b style={textStyle}>{name}</b>
        </div>
        </>
    )
}

export default AppLogo;
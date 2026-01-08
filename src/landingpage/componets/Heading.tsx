

const Heading:React.FC<{children:React.ReactElement | string}> = ({children}) => {
  return (
    <div style={{fontWeight:"bold",fontSize:26}}>{children}</div>
  )
}

export default Heading
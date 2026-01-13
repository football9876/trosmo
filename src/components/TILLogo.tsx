interface TILLogoProps {
  className?: string;
}
const TILLogo = ({ className = "h-8" }: TILLogoProps) => {
  return (
    <img style={{width:50,height:50,borderRadius:10}} className={className} src="/logo.jpeg"/>
  );
};
export default TILLogo;

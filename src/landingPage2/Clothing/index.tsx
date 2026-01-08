import Header from '../header'
import Responsive from '../../landingpage/componets/Blogs/responsive'
import NestedMenu from '../../landingpage/componets/Nav/pcNavigation'
import Footer from '../Footer'
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { docQr } from '../../Logics/docQr'
import Skeleton from 'react-loading-skeleton'

const ClothingIndex = () => {
  const [loading,setLoading]=useState<boolean>(true);
  const [cloths,setCloths]=useState<{url:string}[]>([])
  
  const GetClothes=async ()=>{
    try{
      setLoading(true)
const _=await docQr("Cloths");
setCloths(_);
    }
    catch(Err:any){
toast.error(Err.message);
    }
    finally{
setLoading(false);
    }

  }

  useEffect(()=>{
GetClothes();
  },[]);
  return (
  <div className="main-body-container">
      <div className="home-content">
        <Header />
        <NestedMenu />
        <Responsive
          left={
            <div className="about-nfb-wrapper">
              <h3 style={{padding:20,fontWeight:"bold",textAlign:"center"}}>NFB Clothing – Hummel Unisport Webshop</h3>
           <p>
            Nørresundby United Football Clubs (Nørresundby Forenede Boldklubber) has an agreement for supplying club sportswear with Hummel and Unisport Webshop.
A collection of Hummel’s htmAuthentic sportswear has been selected as the club’s official clothing.

Use the link below to access the Unisport webshop where the clothing and other items can be purchased:


<br/>
<br/>
<br/>


<div className='d-flex align-items-center ' style={{gap:10,flexFlow:"row wrap",margin:"0 auto"}}>
 {loading
        ? // Show 3 skeleton placeholders (or however many you want)
          Array.from({ length: 6 }).map((_, i) => (
            <Skeleton
              key={i}
              height={200}
              width={180}
              style={{ borderRadius: 8, margin: 5 }}
            />
          ))
        : // Show actual images
          cloths.map((url, i) => (
            <img
              key={i}
              style={{ width: 180, height: "auto", margin: 5 }}
              src={url.url}
              alt={`Cloth ${i}`}
            />
          ))}
</div>
           </p>
            </div>
          }

        />
        <Footer />
      </div>
    </div>
  )
}

export default ClothingIndex

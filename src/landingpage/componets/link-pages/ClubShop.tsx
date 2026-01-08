import { useNavigate } from 'react-router-dom';
import useInnerWidth from '../../../funcs/useInnerWidth';
import TopNavigation from '../Nav/topNavigation';
import './product.css';
import { useDispatch } from 'react-redux';
import { setCurrentPage } from '../../../store/Slice';

const products = [
        {
          "name": "FLØY Trenerpakke Komplett trenerpakke",
          "price": "1 380,-",
          "imageUrl": "/Media/Cache/Images/6/9/WEB_Image_FL__216;Y_Trenerpakke_Komplett_trenerpak_tnyrener-187747708_plid_629289.Jpeg"
        },
        {
          "name": "FLØY håndballpakke spiller Klubbpakke med drakt",
          "price": "1 378,-",
          "imageUrl": "/Media/Cache/Images/6/6/WEB_Image_FL__216;Y_h__229;ndballpakke_spiller_Klu_pk_handball1366179620_plid_626736.Jpeg"
        },
        {
          "name": "FLØY håndballpakke keeper Klubbpakke med drakt",
          "price": "1 378,-",
          "imageUrl": "/Media/Cache/Images/6/2/WEB_Image_FL__216;Y_h__229;ndballpakke_keeper_Klub_pk_handballkeeper1305150401_plid_649632.Jpeg"
        },
        {
          "name": "FLØY Håndballpakke Klubbpakke uten drakt",
          "price": "1 380,-",
          "imageUrl": "/Media/Cache/Images/5/6/WEB_Image_FL__216;Y_H__229;ndballpakke_Klubbpakke__nyfloyhandball-618448191_plid_522446.Jpeg"
        },
        {
          "name": "FLØY Fotballpakke spiller Klubbpakke med drakt",
          "price": "1 348,-",
          "imageUrl": "/Media/Cache/Images/6/5/WEB_Image_FL__216;Y_Fotballpakke_spiller_Klubbpakk_pk_fotball1471889134_plid_626735.Jpeg"
        },
        {
          "name": "FLØY Fotballpakke keeper Klubbpakke med drakt",
          "price": "1 348,-",
          "imageUrl": "/Media/Cache/Images/6/1/WEB_Image_FL__216;Y_Fotballpakke_keeper_Klubbpakke_pk_fotballkeeper1525996967_plid_649631.Jpeg"
        },
        {
          "name": "FLØY Fotballpakke Klubbpakke uten drakt",
          "price": "1 464,-",
          "imageUrl": "/Media/Cache/Images/5/2/WEB_Image_FL__216;Y_Fotballpakke_Klubbpakke_uten_d_nyfloyfotball947121739_plid_522442.Jpeg"
        }
      ]

const ClubShop = () => {
    const width=useInnerWidth()
     const navigate=useNavigate();
     const dispatch=useDispatch();
   return (
     <>
       <TopNavigation />
       <br /><br /><br />
 {width  <700 && <><br/><br/><br/><br/></>}
    <div className="club-shop">
      <h1>Fløy IL Club shop</h1>
      <div className="products">
        {products.map((product, index) => (
          <div onClick={()=>{
            dispatch(setCurrentPage("/payment"))
            navigate("/Dashboard")
          }}  key={index} className="product-card">
            <img style={{backgroundColor:"lightgray",width:"100%",height:300}} src={"https://floy.macron.no/"+product.imageUrl} alt={product.name} />
            <h2>{product.name}</h2>
         
              <p>{product.price}</p>
            {/* <button>Add to Cart</button> */}
          </div>
        ))}
      </div>
    </div>
    </>
  );
};

export default ClubShop;

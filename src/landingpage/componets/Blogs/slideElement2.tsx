
const SlideElement2 = () => {
  return (
    <div className='box-shadow' style={{
        background:"white",
padding:10,
boxShadow:"1px 1px 10px 0px lightgray",
borderRadius:20,
width:"100%"
    }} >
      <h3 className="text-center bold" style={{color:"#100e0e"}}>Hovedsponsor</h3>
      <div
        className="sponsorSlide"
        style={{
          backgroundImage: 'url("/assets/agricSlide1a.png")',
          backgroundColor: '#fff',
          height: '140.2px',
          width: '100%',
          float: 'none',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
          backgroundSize: 'contain'
        }}
      >
        <a
          href="#"
          target="_blank"
          rel="noopener noreferrer"
          style={{ display: 'block', width: '100%', height: '100%' }}
        >
          {/* Empty link covering entire div */}
        </a>
      </div>
    </div>
  );
};

export default SlideElement2;



export const SlideElementNetclub = () => {
  return (
    <div className='box-shadow' style={{
        background:"white",
padding:30,
boxShadow:"1px 1px 10px 0px lightgray",
borderRadius:20,
width:"100%"
    }}>
      <h3 className="text-center bold" style={{color:"#100e0e"}}>DBU Børneklub</h3>
      <div
        className="sponsorSlide"
        style={{
          backgroundImage: 'url("/assets/dbu_boerneklub.png")',
          backgroundColor: '#fff',
          height: '240.2px',
          width: '100%',
          float: 'none',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
          backgroundSize: 'contain'
        }}
      >
        <a
          href="#"
          target="_blank"
          rel="noopener noreferrer"
          style={{ display: 'block', width: '100%', height: '100%' }}
        >
          {/* Empty link covering entire div */}
        </a>
      </div>
    </div>
  );
};


import Section from '../../Pictures/section.webp';
import { useEffect,useState} from 'react';
import './HomeSection.css'
export default function HomeSection() {
  const[data,setData]=useState([]);

  useEffect(() => {
    fetch(' https://strapi-store-server.onrender.com/api/products?featured=true')
      .then(res => res.json())
      .then((json) => {
        setData(json.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    
  <div className="container">
      <div className='section-wrapper'>
        <div className="section-info">
            <h1>We are changing the way people shop</h1>
            <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Tempore repellat explicabo enim soluta temporibus asperiores aut obcaecati perferendis porro nobis.</p>
            <button>our products</button>
        </div>
       <div className="section-img">
        <img src={Section} />
       </div>
    </div>
    <div className='horizontal-line'>
      <h2>Featured Products</h2>
      <hr />
       </div>

       <div>
       <div className="product-item">
      {data.map((e) => {
        console.log(e);
        return(
          <div key={e.id} className="product-img">
            <img src={e.attributes.image}/>
            <h4> <span>Title:</span>{e.attributes.title}</h4>
            <p> <span>Company:</span>{e.attributes.company}</p>
            <p> <span>Category:</span>{e.attributes.category}</p>
            <p> <span>Price:</span>${e.attributes.price}</p>
          </div>
        )
      }
      
      )}
      </div>
       </div>
  </div>
  )
}

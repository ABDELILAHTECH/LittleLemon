import { Link } from 'react-router-dom'
import "./Specials.scss"
import DishIcon from "../assets/Images/dish_icon.svg"
import GreekSaladImg from '../assets/images/greek_salad.jpg'
import BruchettaImg from '../assets/images/bruchetta.svg'
import LemonDessertImg from '../assets/images/lemon_dessert.jpg'
export default function Specials() {
  const specials = [
    {
      name: "Greek Salad",
      img:GreekSaladImg,
      description: "The famous greek salad of crispy lettuce, peppers, olives and our Chicago style feta cheese, garnished with crunchy garlic and rosemary croutons.",
      price: "$12.99"
    },
     {
      name: "Bruschetta",
      img:BruchettaImg,
      description: "Our Bruschetta is made from grilled bread that has been smeared with garlic and seasoned with salt and olive oil.",
      price: "$5.99"
    },
     {
      name: "Lemon Dessert",
      img:LemonDessertImg,
      description: "This comes straight from grandma's recipe book, every last ingredient has been sourced and is as authentic as can be imagined.",
      price: "$4.99"
    },
  ];
  return (
    <section id='menu' className="specials">
      <div className='specials-header'>
        <span>This Week's Specials!</span>
        <button>Online Menu</button>
      </div>
      <ul className='specials-cards'>
          {
            specials.map((special,index)=> (
              <li key={index} className='card'>
                <div className="special-img-container">
                    <img src={special.img} alt="" />
                </div>
                <div className="card-infos">
                  <div className='title-and-price'>
                    <span className='title'>{special.name}</span>
                    <span className='price'>{special.price}</span>
                    
                  </div>
                  <p className='special-description'>{special.description}</p>
                  <Link>
                        Order a delivery
                        <img src={DishIcon} className='delivery-icon'
                        alt="Dish icon" />
                  </Link>
                </div>
              </li>
            ))
          }
      </ul>
    </section>
  )
}

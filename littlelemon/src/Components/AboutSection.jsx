import "./AboutSection.scss"
import RestaurantImg1 from "../assets/Images/restaurantImg1.jpg"
import RestaurantImg2 from "../assets/Images/restaurantImg2.jpg"

export default function About() {
  return (
    <section className="about-section">
        <div className="about-infos">
            <div className="title-and-subtitle">
              <h1>Little Lemon</h1>
              <h3>Chicago</h3>
            </div>
            <p>
              Little Lemon Chicago is a family owned Mediterranean restaurant located in the heart 
              of the city. The restaurant is run by brothers Mario and Adrian, who have always had 
              a passion for cooking and serving delicious food. Growing up in a Mediterranean household, 
              the brothers were exposed to traditional recipes from an early age, and they decided to 
              bring those recipes to the masses with a modern twist. At Little Lemon, you can expect to find a menu full of classic dishes with a creative twist that makes them stand out from the rest. Whether you're looking for a quick lunch or a leisurely dinner, Little Lemon Chicago
               is the perfect place to indulge in a delicious meal in a cozy and welcoming atmosphere.
            </p>
        </div>
        <div className="about-imgs">
          <img src={RestaurantImg1} alt="restaurent image" />
          <img src={RestaurantImg2} alt="restaurant image" />
        </div>
    </section>
  )
}

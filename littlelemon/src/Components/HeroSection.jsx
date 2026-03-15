import "./HeroSection.scss"
import heroImage from "../assets/Images/restauranfood.jpg"
export default function HeroSection() {
  return (
    <section className="hero">
        <div className="hero-infos">
          <div className="title-subtitle">
            <h1>Little Lemon</h1>
            <h3>Chicago</h3>
          </div>
          <p>We are a family owned Mediterranean restaurant, focused
             on traditional recipes served with a modern twist.</p>
          <button>Reserve a Table</button>
        </div>
        <div style={{position:"relative"}}>
          <div className="hero-img-container">
            <img src={heroImage} alt="Little Lemon Hero" />
          </div>
        </div>
    </section>
  )

}

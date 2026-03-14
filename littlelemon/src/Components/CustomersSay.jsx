import "./CustomersSay.scss"
import customer1Img from "../assets/Images/customer.jpg"
import customer2Img from "../assets/Images/customer2.jpg"
import customer3Img from "../assets/Images/customer3.jpg"
import customer4Img from "../assets/Images/customer4.jpg"
export default function CustomersSay() {
  const customers = [ 
    {
      name: "John Doe",
      img:customer1Img,
      feedback: "The food was amazing and the service was excellent! Highly recommend Little Lemon."
    },
    {
      name: "Jane Smith",
      img:customer2Img,
      feedback: "A wonderful dining experience with delicious dishes and a cozy atmosphere."
    },
    {
      name: "Emily Johnson",
      img:customer3Img,
      feedback: "The flavors were incredible and the staff was so friendly. Can't wait to come back!"
    },
    {
      name: "Michael Brown",
      img:customer4Img,
      feedback: "The ambiance is perfect for a romantic dinner, and the food exceeded all expectations."
    }
  ];
  return (
    <section className="customers-say">
      <h2>What Our Customers Say</h2>
      <div className="customers-cards">
        {customers.map((customer, index) => (
          <div key={index} className="customer-card">
            <div className="img-and-rating">
              <img src={customer.img} alt={customer.name} />
              <span>⭐⭐⭐⭐⭐ </span>
            </div>
            <span>{customer.name}</span>
            <p>"{customer.feedback}"</p>
          </div>
        ))}
      </div>
    </section>
  )
}

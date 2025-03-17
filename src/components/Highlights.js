import React from 'react';

function Highlights() {
  const dishes = [
    {
      id: 1,
      name: "Bruschetta",
      description: "Toasted bread topped with fresh tomatoes, basil, and olive oil.",
      price: "$8.99",
      image: "dish1.jpg",
    },
    {
      id: 2,
      name: "Greek Salad",
      description: "Crisp cucumbers, tomatoes, olives, feta, and a tangy vinaigrette.",
      price: "$10.99",
      image: "dish2.jpg",
    },
    {
      id: 3,
      name: "Lemon Cake",
      description: "Moist lemon-infused cake with a zesty glaze.",
      price: "$6.99",
      image: "dish3.jpg",
    },
  ];

  return (
    <section className="highlights">
      <h2>Specials</h2>
      <div className="dish-list">
        {dishes.map((dish) => (
          <div key={dish.id} className="dish">
            <img
              src={require(`../icons_assets/${dish.image}`)}
              alt={dish.name}
              className="dish-image"
            />
            <p>{dish.name}</p>
            <p>{dish.description}</p>
            <p className="price">{dish.price}</p>
            <button>Order Now</button>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Highlights;
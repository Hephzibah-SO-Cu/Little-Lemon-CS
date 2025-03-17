import React from 'react';

function Highlights() {
  const dishes = [
    { id: 1, name: "Greek Salad", description: "Fresh and healthy", image: "dish1.jpg" },
    { id: 2, name: "Lemon Pasta", description: "Zesty and delicious", image: "dish2.jpg" },
    { id: 3, name: "Grilled Fish", description: "Perfectly cooked", image: "dish3.jpg" },
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
            <button>Order Now</button>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Highlights;
import React from 'react';

function About() {
  return (
    <section className="about">
      <h2>About Us</h2>
      <div className="about-content">
        <p>
          Little Lemon is a charming neighborhood bistro that serves simple food and classic cocktails in a lively but casual environment. Founded by Adrian and Mario, two passionate chefs with a love for Mediterranean cuisine, Little Lemon brings traditional recipes with a modern twist to the heart of Chicago. Adrian, with his expertise in fresh, vibrant flavors, and Mario, a master of balancing tradition with innovation, invite you to experience their culinary vision. We would love to hear more about your experience with us!
        </p>
        <div className="image-gallery">
          <figure className="image"><img src={require('../icons_assets/about1.jpg')} alt="Mario and Adrian A" /></figure>
          <figure className="image"><img src={require('../icons_assets/about2.jpg')} alt="Mario and Adrian B" /></figure>
          <figure className="image"><img src={require('../icons_assets/about3.jpg')} alt="Restaurant Chef B" /></figure>
        </div>
      </div>
    </section>
  );
}

export default About;
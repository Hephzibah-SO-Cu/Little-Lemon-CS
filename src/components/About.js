import React from 'react';

function About() {
  return (
    <section className="about">
      <h2>About Us</h2>
      <div className="about-content">
        <p>
          Little Lemon is a charming neighborhood bistro that serves simple food and classic cocktails in a lively but casual environment. We would love to hear more about your experience with us!
        </p>
        <div className="image-grid">
          <div className="image"><img src={require('../icons_assets/about1.jpg')} alt="Mario and Adrian A" /></div>
          <div className="image"><img src={require('../icons_assets/about2.jpg')} alt="Mario and Adrian B" /></div>
          <div className="image"><img src={require('../icons_assets/about3.jpg')} alt="Restaurant Chef B" /></div>
        </div>
      </div>
    </section>
  );
}

export default About;
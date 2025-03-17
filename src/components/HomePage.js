import React from 'react';
import Hero from './Hero';
import Highlights from './Highlights';
import Testimonials from './Testimonials';
import About from './About';
import Footer from './Footer';

function HomePage() {
  return (
    <main>
      <Hero />
      <Highlights />
      <Testimonials />
      <About />
      <Footer />
    </main>
  );
}

export default HomePage;
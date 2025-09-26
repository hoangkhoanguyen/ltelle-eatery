import React from "react";

const AboutMenu = () => {
  return (
    <section>
      <div className="container py-10 lg:pt-16 max-w-4xl">
        <h3 className="section-subtitle text-center mb-5">
          L&#39;TELLE EATERY &bull; PASSION
        </h3>
        <h2 className="section-title text-center mb-10 flex gap-2 justify-center">
          <span className="text-web-content-1">Our Culinary</span>
          <span className="text-web-secondary-1">Philosophy</span>
        </h2>
        <p className="text-center text-web-subtitle-mobile lg:text-web-subtitle text-web-content-2 mb-5">
          At Le Bambou, we believe that exceptional cuisine begins with
          exceptional ingredients. Our chef meticulously sources the finest
          local and imported French ingredients, combining traditional
          techniques with innovative presentations to create unforgettable
          dining experiences.
        </p>
        <p className="text-web-body-mobile lg:text-web-body text-web-content-2 text-center">
          Each dish tells a story of passion, craftsmanship, and our unwavering
          commitment to culinary excellence that has made French cuisine
          renowned worldwide.
        </p>
      </div>
    </section>
  );
};

export default AboutMenu;

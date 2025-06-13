import beardoBanner from "../assets/ma1.jpg"; // Save your banner image here

export default function Hero() {
  return (
    <section className="hero">
      <div className="hero-left">
        <img src={beardoBanner} alt="Beardo Banner" className="hero-banner" />
      </div>
      {/* <div className="hero-right">
        <img src={beardoOffer} alt="Beardo Offer" className="hero-offer" />
      </div> */}
    </section>
  );
}

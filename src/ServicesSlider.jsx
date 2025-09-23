import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

const serviceCards = [
  { title: "Web Development", desc: "Enterprise-grade web apps.", icon: "💻" },
  { title: "AI & Data Science", desc: "AI solutions and analytics.", icon: "🤖" },
  { title: "Digital Marketing", desc: "Data-driven strategies.", icon: "📈" },
  { title: "Cloud Solutions", desc: "Secure, scalable cloud.", icon: "☁️" },
  { title: "UI/UX Design", desc: "Intuitive interfaces.", icon: "🎨" },
  { title: "Automation Projects", desc: "Streamline workflows with AI and automation.", icon: "⚙️" },
];

const ServicesSlider = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 600,
    autoplay: true,
    autoplaySpeed: 2500,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 2 } },
      { breakpoint: 600, settings: { slidesToShow: 1 } },
    ],
  };

  return (
    <section style={{ padding: "80px 20px", maxWidth: "1300px", margin: "0 auto" }}>
      <h3 style={{
        fontSize: "3rem",
        marginBottom: "40px",
        fontWeight: "600",
        color: "#00fff7",
        textAlign: "center",
        textShadow: "0 0 20px rgba(0,255,247,0.7)"
      }}>
        Our Services
      </h3>

      <Slider {...settings}>
        {serviceCards.map((service, idx) => (
          <div key={idx} style={{ padding: "15px" }}>
            <div style={{
              background: "rgba(255, 255, 255, 0.05)",
              border: "1px solid rgba(0,255,255,0.3)",
              borderRadius: "20px",
              padding: "40px 25px",
              textAlign: "center",
              backdropFilter: "blur(10px)",
              color: "#fff",
              boxShadow: "0 0 15px rgba(0,255,255,0.3), 0 0 40px rgba(0,255,255,0.2)",
              transition: "transform 0.3s, box-shadow 0.3s",
            }}
            onMouseEnter={e => {
              e.currentTarget.style.transform = "translateY(-10px) scale(1.05)";
              e.currentTarget.style.boxShadow = "0 0 25px rgba(0,255,255,0.6), 0 0 50px rgba(0,255,255,0.4)";
            }}
            onMouseLeave={e => {
              e.currentTarget.style.transform = "translateY(0) scale(1)";
              e.currentTarget.style.boxShadow = "0 0 15px rgba(0,255,255,0.3), 0 0 40px rgba(0,255,255,0.2)";
            }}>
              <div style={{ fontSize: "3rem", marginBottom: "20px" }}>{service.icon}</div>
              <h4 style={{ fontSize: "1.8rem", marginBottom: "15px", color: "#00fff7" }}>{service.title}</h4>
              <p style={{ fontSize: "1rem", color: "#ccc", lineHeight: "1.6" }}>{service.desc}</p>
            </div>
          </div>
        ))}
      </Slider>
    </section>
  );
};

export default ServicesSlider;

import { useState, useCallback, useRef } from "react";
import Particles from "react-tsparticles";
import { loadSlim } from "tsparticles-slim";
import Slider from "react-slick";
import ReCAPTCHA from "react-google-recaptcha";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function App() {
  const particlesInit = useCallback(async (engine) => {
    await loadSlim(engine);
  }, []);

  const [formData, setFormData] = useState({ name: "", email: "", phone: "" });
  const [submissions, setSubmissions] = useState({});
  const [message, setMessage] = useState("");
  const [captchaValue, setCaptchaValue] = useState(null);
  const [showFormPopup, setShowFormPopup] = useState(false);

  const servicesRef = useRef(null);
  const aboutRef = useRef(null);
  const whyRef = useRef(null);
  const contactRef = useRef(null);

  const scrollToSection = (ref) => {
    if (!ref) {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    ref.current.scrollIntoView({ behavior: "smooth" });
  };

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });
  const handleCaptchaChange = (value) => setCaptchaValue(value);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = formData.email.trim().toLowerCase();
    if (!captchaValue) {
      setMessage("Please complete the CAPTCHA to submit.");
      return;
    }
    if (submissions[email] >= 2) {
      setMessage("You have already submitted twice. Thank you!");
      return;
    }
    try {
      await fetch("/api/sendEmail", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, captchaValue }),
      });
      setSubmissions((prev) => ({
        ...prev,
        [email]: (prev[email] || 0) + 1,
      }));
      setMessage("Form submitted successfully!");
      setFormData({ name: "", email: "", phone: "" });
      setCaptchaValue(null);
      setShowFormPopup(false);
    } catch (err) {
      console.error(err);
      setMessage("Error submitting form.");
    }
  };

  const serviceCards = [
    {
      title: "Web Development",
      desc: "Enterprise-grade web apps with scalable architecture.",
      icon: "💻",
    },
    {
      title: "AI & Data Science",
      desc: "AI solutions and analytics for smarter decisions.",
      icon: "🤖",
    },
    {
      title: "Digital Marketing",
      desc: "Optimize digital presence with data-driven strategies.",
      icon: "📈",
    },
    {
      title: "Cloud Solutions",
      desc: "Secure, scalable cloud infrastructure.",
      icon: "☁️",
    },
    {
      title: "UI/UX Design",
      desc: "Modern, intuitive interfaces.",
      icon: "🎨",
    },
    {
      title: "Automation Projects",
      desc: "Streamline workflows with AI-driven automation.",
      icon: "⚙️🤖",
    },
  ];

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 600,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    pauseOnHover: true,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 2 } },
      { breakpoint: 768, settings: { slidesToShow: 1 } },
    ],
  };

  const sectionStyle = {
    padding: "80px 20px",
    maxWidth: "1200px",
    margin: "0 auto",
  };
  const headingStyle = {
    fontSize: "3rem",
    marginBottom: "40px",
    fontWeight: 500,
    color: "#00ffff",
    textAlign: "center",
  };
  const textStyle = { color: "#ddd", fontSize: "1.2rem", lineHeight: 1.6 };

  return (
    <div
      style={{
        position: "relative",
        minHeight: "100vh",
        backgroundColor: "#0a0f1f",
        fontFamily: "'Poppins', sans-serif",
        overflowX: "hidden",
      }}
    >
      {/* Background Particles */}
      <Particles
        id="main-bg"
        init={particlesInit}
        options={{
          background: { color: "#0a0f1f" },
          fpsLimit: 60,
          particles: {
            number: { value: 60 },
            color: { value: "#00ffff" },
            links: {
              enable: true,
              color: "#00ffff",
              distance: 130,
              opacity: 0.25,
              width: 1,
            },
            move: { enable: true, speed: 0.5 },
            shape: { type: "circle" },
            opacity: { value: 0.5 },
            size: { value: { min: 1, max: 3 } },
          },
          detectRetina: true,
        }}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          zIndex: -1,
        }}
      />

      {/* Navbar */}
      <nav
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "15px 40px",
          backgroundColor: "rgba(0,0,0,0.85)",
          zIndex: 50,
          flexWrap: "wrap",
          boxSizing: "border-box",
        }}
      >
        <h1
          style={{
            color: "#00ffff",
            fontSize: "1.5rem",
            fontWeight: "bold",
            textShadow: "0 0 10px #00ffff",
            margin: 0,
          }}
        >
          Futurify
        </h1>
        <div
          style={{
            display: "flex",
            gap: "25px",
            flexWrap: "wrap",
            justifyContent: "flex-end",
            flexGrow: 1,
          }}
        >
          {[
            { name: "Home", ref: null },
            { name: "Services", ref: servicesRef },
            { name: "About", ref: aboutRef },
            { name: "Why Choose Us", ref: whyRef },
            { name: "Contact Us", ref: contactRef },
          ].map((item) => (
            <span
              key={item.name}
              style={{
                cursor: "pointer",
                color: "#fff",
                textShadow: "0 0 5px #00ffff",
                transition: "0.3s",
              }}
              onClick={() => scrollToSection(item.ref)}
              onMouseEnter={(e) => (e.target.style.color = "#1de9b6")}
              onMouseLeave={(e) => (e.target.style.color = "#fff")}
            >
              {item.name}
            </span>
          ))}
        </div>
      </nav>

      {/* Sections */}
      <div style={{ position: "relative", zIndex: 10 }}>
        {/* Hero */}
        <section
          style={{
            paddingTop: "120px",
            minHeight: "80vh",
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            alignItems: "center",
            gap: "40px",
          }}
        >
          <div
            style={{
              flex: "1 1 400px",
              minWidth: "300px",
              textAlign: "center",
            }}
          >
            <h2
              style={{
                fontSize: "4rem",
                fontWeight: 700,
                textAlign: "center",
                color: "#00ffff",
                textShadow: "0 0 8px #00ffff, 0 0 20px #1de9b6",
                marginBottom: "20px",
              }}
            >
              Build Your Digital Future
            </h2>
            <p
              style={{
                color: "#ddd",
                fontSize: "1.3rem",
                maxWidth: "700px",
                margin: "0 auto 30px auto",
              }}
            >
              Cutting-edge solutions in{" "}
              <span style={{ color: "#1de9b6" }}>Web Development</span>,{" "}
              <span style={{ color: "#1de9b6" }}>AI & Data Science</span>, and{" "}
              <span style={{ color: "#1de9b6" }}>Digital Marketing</span>.
            </p>
            <button
              onClick={() => setShowFormPopup(true)}
              style={{
                padding: "14px 30px",
                background: "linear-gradient(90deg, #00ffff, #1de9b6)",
                border: "none",
                borderRadius: "12px",
                fontWeight: "bold",
                color: "#000",
                fontSize: "1rem",
                cursor: "pointer",
                boxShadow: "0 0 15px #00ffff, 0 0 25px #1de9b6",
              }}
            >
              Start Building
            </button>
          </div>
        </section>

        {/* Services */}
        <section ref={servicesRef} style={sectionStyle}>
          <h3 style={headingStyle}>Our Services</h3>
          <Slider {...sliderSettings}>
            {serviceCards.map((service, idx) => (
              <div key={idx} style={{ padding: "10px" }}>
                <div
                  style={{
                    background: "#111",
                    padding: "30px",
                    borderRadius: "20px",
                    textAlign: "center",
                    minHeight: "280px",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    boxShadow: "0 0 20px rgba(0,255,255,0.3)",
                  }}
                >
                  <div style={{ fontSize: "3rem", marginBottom: "15px" }}>
                    {service.icon}
                  </div>
                  <h4
                    style={{
                      fontSize: "1.5rem",
                      marginBottom: "15px",
                      color: "#1de9b6",
                    }}
                  >
                    {service.title}
                  </h4>
                  <p style={{ color: "#ddd" }}>{service.desc}</p>
                </div>
              </div>
            ))}
          </Slider>
        </section>

        {/* About */}
        <section
          ref={aboutRef}
          style={{
            ...sectionStyle,
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            gap: "40px",
          }}
        >
          <img
            src="https://source.unsplash.com/500x400/?technology,futuristic"
            alt="About"
            style={{
              borderRadius: "20px",
              maxWidth: "500px",
              flex: "1 1 400px",
              boxShadow: "0 0 25px #00ffff",
            }}
          />
          <div style={{ flex: "1 1 400px" }}>
            <h3 style={{ fontSize: "3rem", marginBottom: "20px", color: "#00ffff" }}>
              Who We Are
            </h3>
            <p style={textStyle}>
              We are innovators, developers, and strategists passionate about
              transforming businesses with futuristic technology. Stay ahead in
              the digital era with our solutions.
            </p>
          </div>
        </section>

        {/* Why Choose Us */}
        <section
          ref={whyRef}
          style={{
            ...sectionStyle,
            backgroundColor: "#0c132b",
            borderRadius: "20px",
            marginBottom: "40px",
          }}
        >
          <h3 style={headingStyle}>Why Choose Us</h3>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "30px",
              justifyContent: "center",
            }}
          >
            {[
              {
                title: "Innovation",
                icon: "🚀",
                desc: "Pushing boundaries with latest tech.",
              },
              {
                title: "Scalability",
                icon: "📈",
                desc: "Solutions that grow with your business.",
              },
              {
                title: "Security",
                icon: "🔒",
                desc: "Enterprise-grade data protection.",
              },
              {
                title: "Support",
                icon: "🛠️",
                desc: "24/7 dedicated technical assistance.",
              },
            ].map((feature, idx) => (
              <div
                key={idx}
                style={{
                  backgroundColor: "#111",
                  padding: "30px",
                  borderRadius: "20px",
                  minWidth: "250px",
                  textAlign: "center",
                  boxShadow: "0 0 20px rgba(0,255,255,0.3)",
                }}
              >
                <div style={{ fontSize: "3rem", marginBottom: "15px" }}>
                  {feature.icon}
                </div>
                <h4
                  style={{
                    fontSize: "1.5rem",
                    marginBottom: "15px",
                    color: "#1de9b6",
                  }}
                >
                  {feature.title}
                </h4>
                <p style={{ color: "#ddd" }}>{feature.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Footer */}
        <footer
          ref={contactRef}
          style={{
            padding: "60px 20px",
            textAlign: "center",
            backgroundColor: "#111",
            color: "#fff",
            borderTop: "2px solid #00ffff",
          }}
        >
          <p>&copy; 2025 Futurify. All Rights Reserved.</p>
        </footer>
      </div>

      {/* Popup Form */}
{showFormPopup && (
  <div
    style={{
      position: "fixed",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      background: "rgba(0,0,0,0.85)",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      zIndex: 200,
      padding: "20px",
    }}
  >
    <div
      style={{
        background: "#0c132b",
        padding: "40px",
        borderRadius: "25px",
        maxWidth: "500px",
        width: "100%",
        boxShadow: "0 0 30px #00ffff",
      }}
    >
      <h3
        style={{
          color: "#00ffff",
          marginBottom: "20px",
          textAlign: "center",
        }}
      >
        Start Your Project
      </h3>
      <p
        style={{
          color: "#ddd",
          marginBottom: "20px",
          textAlign: "center",
        }}
      >
        Share your project details and our team will get back to you with futuristic solutions.
      </p>

      <form
        onSubmit={handleSubmit}
        style={{ display: "flex", flexDirection: "column", gap: "15px" }}
      >
        <input
          required
          placeholder="Your Name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          style={{
            padding: "12px",
            borderRadius: "10px",
            border: "none",
            outline: "none",
            backgroundColor: "#111",
            color: "#fff",
          }}
        />
        <input
          required
          placeholder="Your Email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          style={{
            padding: "12px",
            borderRadius: "10px",
            border: "none",
            outline: "none",
            backgroundColor: "#111",
            color: "#fff",
          }}
        />
        <input
          required
          placeholder="Phone Number"
          name="phone"
          type="tel"
          value={formData.phone}
          onChange={handleChange}
          style={{
            padding: "12px",
            borderRadius: "10px",
            border: "none",
            outline: "none",
            backgroundColor: "#111",
            color: "#fff",
          }}
        />
        <textarea
          required
          placeholder="Project Details"
          name="details"
          value={formData.details}
          onChange={handleChange}
          rows={4}
          style={{
            padding: "12px",
            borderRadius: "10px",
            border: "none",
            outline: "none",
            backgroundColor: "#111",
            color: "#fff",
            resize: "none",
          }}
        />

              <ReCAPTCHA
                sitekey="6LeRytIrAAAAALe8-oiz3knc41X4xMDCwVsVti39"
                onChange={handleCaptchaChange}
              />
              <button
                type="submit"
                style={{
                  padding: "12px",
                  borderRadius: "12px",
                  border: "none",
                  fontWeight: "bold",
                  background: "linear-gradient(90deg,#00ffff,#1de9b6)",
                  cursor: "pointer",
                  color: "#000",
                  boxShadow: "0 0 15px #00ffff, 0 0 25px #1de9b6",
                }}
              >
                Submit
              </button>
              {message && (
                <p style={{ color: "#1de9b6", textAlign: "center" }}>{message}</p>
              )}
            </form>
            <button
              onClick={() => setShowFormPopup(false)}
              style={{
                marginTop: "20px",
                background: "transparent",
                color: "#00ffff",
                border: "none",
                cursor: "pointer",
                fontSize: "1rem",
                textDecoration: "underline",
              }}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

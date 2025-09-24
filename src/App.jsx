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

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    details: "",
  });
  const [submissions, setSubmissions] = useState({});
  const [message, setMessage] = useState("");
  const [captchaValue, setCaptchaValue] = useState(null);
  const [showFormPopup, setShowFormPopup] = useState(false);

  const servicesRef = useRef(null);
  const aboutRef = useRef(null);
  const whyRef = useRef(null);
  const contactRef = useRef(null);
  const clientsRef = useRef(null);

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
      setFormData({ name: "", email: "", phone: "", details: "" });
      setCaptchaValue(null);
      setShowFormPopup(false);
    } catch (err) {
      console.error(err);
      setMessage("Error submitting form.");
    }
  };

  const serviceCards = [
    { title: "Web Development", desc: "Enterprise-grade web apps with scalable architecture.", icon: "💻", color: "#00c6ff" },
    { title: "AI & Data Science", desc: "AI solutions and analytics for smarter decisions.", icon: "🤖", color: "#f00000" },
    { title: "Digital Marketing", desc: "Optimize digital presence with data-driven strategies.", icon: "📈", color: "#f7971e" },
    { title: "Cloud Solutions", desc: "Secure, scalable cloud infrastructure.", icon: "☁️", color: "#00c6ff" },
    { title: "UI/UX Design", desc: "Modern, intuitive interfaces.", icon: "🎨", color: "#ff5f6d" },
    { title: "Automation Projects", desc: "Streamline workflows with AI-driven automation.", icon: "⚙️🤖", color: "#1de9b6" },
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
    <div style={{ position: "relative", minHeight: "100vh", backgroundColor: "#0a0f1f", fontFamily: "'Poppins', sans-serif", overflowX: "hidden" }}>
      {/* Particles */}
      <Particles
        id="main-bg"
        init={particlesInit}
        options={{
          background: { color: "#0a0f1f" },
          fpsLimit: 60,
          particles: {
            number: { value: 60 },
            color: { value: "#00ffff" },
            links: { enable: true, color: "#00ffff", distance: 130, opacity: 0.25, width: 1 },
            move: { enable: true, speed: 0.5 },
            shape: { type: "circle" },
            opacity: { value: 0.5 },
            size: { value: { min: 1, max: 3 } },
          },
          detectRetina: true,
        }}
        style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", zIndex: -1 }}
      />
{/* Navbar */}
<nav
  style={{
    position: "fixed",
    top: 0,
    left: 0,
    width: "95%",
    display: "flex",
    flexWrap: "wrap", // allows nav items to wrap on small screens
    justifyContent: "space-between",
    alignItems: "center",
    padding: window.innerWidth < 480 ? "5px 15px" : "5px 50px",
    backgroundColor: "rgba(0,0,0,0.85)",
    zIndex: 50,
  }}
>
  <h1
    style={{
      color: "#00ffff",
      fontSize: window.innerWidth < 480 ? "1.2rem" : "1.5rem",
      fontWeight: "bold",
      textShadow: "0 0 50px #00ffff",
      margin: 0,
    }}
  >
    Futurify
  </h1>

  <div
    style={{
      display: "flex",
      flexWrap: "wrap",
      gap: window.innerWidth < 480 ? "8px" : "20px",
      justifyContent: window.innerWidth < 480 ? "center" : "flex-end", // center on mobile
      width: window.innerWidth < 480 ? "100%" : "auto", // full width on mobile
      marginTop: window.innerWidth < 480 ? "5px" : "0",
      textAlign: window.innerWidth < 480 ? "center" : "right",
    }}
  >
    {[
      { name: "Home", ref: null },
      { name: "Services", ref: servicesRef },
      { name: "About", ref: aboutRef },
      { name: "Why Choose Us", ref: whyRef },
      { name: "Clients", ref: contactRef },
    ].map((item) => (
      <span
        key={item.name}
        style={{
          cursor: "pointer",
          color: "#fff",
          textShadow: "0 0 5px #00ffff",
          transition: "0.3s",
          fontSize: window.innerWidth < 480 ? "0.9rem" : "1rem",
          flex: window.innerWidth < 480 ? "1 1 45%" : "auto", // wrap items nicely on mobile
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




      <div style={{ position: "relative", zIndex: 10 }}>
        {/* Hero */}
        <section style={{ paddingTop: "120px", minHeight: "80vh", display: "flex", flexWrap: "wrap", justifyContent: "center", alignItems: "center", gap: "40px", textAlign: "center" }}>
          <div style={{ flex: "1 1 400px", minWidth: "300px" }}>
            <h2 style={{ fontSize: "3.5rem", fontWeight: 700, color: "#00ffff", textShadow: "0 0 8px #00ffff, 0 0 20px #1de9b6", marginBottom: "20px" }}>Build Your Digital Future</h2>
            <p style={{ color: "#ddd", fontSize: "1.2rem", maxWidth: "700px", margin: "0 auto 30px auto" }}>
              Cutting-edge solutions in <span style={{ color: "#1de9b6" }}>Web Development</span>, <span style={{ color: "#1de9b6" }}>AI & Data Science</span>, and <span style={{ color: "#1de9b6" }}>Digital Marketing</span>.
            </p>
            <button onClick={() => setShowFormPopup(true)} style={{ padding: "12px 28px", background: "linear-gradient(90deg, #00ffff, #1de9b6)", border: "none", borderRadius: "12px", fontWeight: "bold", color: "#000", cursor: "pointer", fontSize: "1rem", boxShadow: "0 0 15px #00ffff, 0 0 25px #1de9b6" }}>
              Start Building
            </button>
          </div>
        </section>

{/* Services */}
<section
  ref={servicesRef}
  style={{
    ...sectionStyle,
    padding: "60px 20px",
    background: "linear-gradient(135deg, #020d1f, #041830)",
  }}
>
  <h2
    style={{
      fontSize: "2.5rem",
      fontWeight: "bold",
      textAlign: "center",
      marginBottom: "40px",
      color: "#00fff7",
    }}
  >
    Our Services
  </h2>

  <Slider
    dots={true}
    infinite={true}
    speed={800}
    slidesToShow={3}
    slidesToScroll={1}
    autoplay={true}
    autoplaySpeed={3000}
    pauseOnHover={true}
    centerMode={false} // remove centerMode to avoid mobile issues
    responsive={[
      { breakpoint: 1024, settings: { slidesToShow: 2 } },
      { breakpoint: 768, settings: { slidesToShow: 1 } },
      { breakpoint: 480, settings: { slidesToShow: 1 } },
    ]}
  >
    {[
      { title: "AI Integration", desc: "Seamlessly integrate AI into your workflows to boost efficiency.", color: "#1de9b6" },
      { title: "Automation Tools", desc: "Eliminate repetitive tasks with advanced automation systems.", color: "#f7971e" },
      { title: "Data Insights", desc: "Unlock hidden value from your data with smart analytics.", color: "#ff5f6d" },
      { title: "Custom Solutions", desc: "Tailored digital solutions to fit your business needs.", color: "#00c6ff" },
      { title: "Cloud Services", desc: "Modernize your infrastructure with secure cloud solutions.", color: "#f00000" },
      { title: "Consulting", desc: "Expert advice to guide your transformation journey.", color: "#ffde59" },
    ].map((service, idx) => (
      <div
        key={idx}
        style={{
          width: "90%", // ensures the card is visible in slider
          maxWidth: "350px",
          margin: "0 auto",
          background: `linear-gradient(145deg, ${service.color}33, #102b45)`, // card gradient with slight color hint
          borderRadius: "20px",
          padding: "30px 25px",
          minHeight: "220px",
          textAlign: "center",
          boxShadow: "0 8px 20px rgba(0, 255, 247, 0.3)",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          transition: "transform 0.3s, box-shadow 0.3s",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = "translateY(-10px)";
          e.currentTarget.style.boxShadow = "0 15px 30px rgba(0,255,247,0.5)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = "translateY(0)";
          e.currentTarget.style.boxShadow = "0 8px 20px rgba(0, 255, 247, 0.3)";
        }}
      >
        <h3 style={{ fontSize: "1.4rem", color: service.color, marginBottom: "12px" }}>
          {service.title}
        </h3>
        <p style={{ color: "#d1eaff", fontSize: "1rem", lineHeight: 1.5 }}>
          {service.desc}
        </p>
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
    padding: "60px 20px",
  }}
>
  <img
  src="https://images.unsplash.com/photo-1581090700227-1d7f0ee6d8f7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxfDB8MXxyYW5kb218MHx8dGVjaG5vbG9neXxlbnwwfHx8fDE2OTUyMzYyNTY&ixlib=rb-4.0.3&q=80&w=500"
    alt="About"
    style={{
      borderRadius: "20px",
      maxWidth: "500px",
      flex: "1 1 400px",
      boxShadow: "0 0 25px #00ffff",
      width: "100%",
    }}
  />
  <div style={{ flex: "1 1 500px" }}>
    <h3 style={{ fontSize: "3rem", marginBottom: "20px", color: "#00ffff" }}>
      Who We Are
    </h3>
    <p style={{ color: "#ddd", fontSize: "1.2rem", lineHeight: 1.8 }}>
      At Futurify, we are a dedicated team of visionaries, technologists, and strategists
      who thrive at the intersection of innovation and business growth. With years of
      experience across industries, we specialize in building intelligent, scalable,
      and secure digital solutions that empower organizations to achieve their
      strategic goals.  
    </p>
    <p style={{ color: "#ddd", fontSize: "1.2rem", lineHeight: 1.8, marginTop: "15px" }}>
      Our expertise spans cutting-edge <span style={{ color: "#1de9b6" }}>web development</span>,
      <span style={{ color: "#1de9b6" }}> AI & data science</span>, <span style={{ color: "#1de9b6" }}>cloud infrastructure</span>,
      <span style={{ color: "#1de9b6" }}> digital marketing</span>, and <span style={{ color: "#1de9b6" }}>automation solutions</span>.
      By combining deep technical knowledge with creative design and strategic thinking,
      we craft solutions that are not only functional but transformative.  
    </p>
    <p style={{ color: "#ddd", fontSize: "1.2rem", lineHeight: 1.8, marginTop: "15px" }}>
      We believe in a collaborative approach, working closely with our clients to
      understand their unique challenges and opportunities. Every project we undertake
      is a journey, from conceptualization to deployment, ensuring optimal performance,
      user engagement, and measurable business outcomes. Our mission is to empower
      companies to stay ahead in the fast-evolving digital landscape with futuristic,
      sustainable, and intelligent solutions.  
    </p>
    <p style={{ color: "#1de9b6", fontSize: "1rem", marginTop: "20px" }}>
      Partner with us, and together we will create a digital future that is innovative,
      resilient, and impactful.
    </p>
  </div>
</section>


    {/* Why Choose Us */}
<section
  ref={whyRef}
  style={{
    ...sectionStyle,
    background: "linear-gradient(135deg, #0a0f1f 0%, #081529 100%)",
    borderRadius: "20px",
    marginBottom: "40px",
    padding: "60px 20px",
  }}
>
  <h3 style={{ ...headingStyle, color: "#1de9b6" }}>Why Choose Us</h3>

  <div className="why-grid">
    {[
      { title: "Innovation", icon: "🚀", desc: "We push the boundaries of technology..." },
      { title: "Scalability", icon: "📈", desc: "Our solutions grow with your business..." },
      { title: "Security", icon: "🔒", desc: "We implement enterprise-grade security protocols..." },
      { title: "Support", icon: "🛠️", desc: "Our dedicated 24/7 support ensures..." },
      { title: "Reliability", icon: "✅", desc: "We deliver consistent, dependable solutions..." },
      { title: "Future-Ready", icon: "🌐", desc: "We anticipate the evolving tech landscape..." },
    ].map((feature, idx) => (
      <div key={idx} className="why-card">
        <div style={{ fontSize: "3rem", marginBottom: "15px" }}>{feature.icon}</div>
        <h4 style={{ fontSize: "1.5rem", marginBottom: "15px", color: "#00ffff" }}>
          {feature.title}
        </h4>
        <p style={{ color: "#ddd", fontSize: "1.05rem", lineHeight: 1.6 }}>{feature.desc}</p>
      </div>
    ))}
  </div>

  <style jsx>{`
    .why-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr); /* desktop unchanged */
      gap: 25px;
      justify-items: center;
    }

    .why-card {
      background: linear-gradient(145deg, #111111, #1a1a1a);
      padding: 35px;
      border-radius: 20px;
      width: 100%;
      max-width: 320px;
      text-align: center;
      box-shadow: 0 0 30px rgba(0, 255, 255, 0.4);
      transition: transform 0.3s, box-shadow 0.3s;
    }

    .why-card:hover {
      transform: translateY(-12px);
      box-shadow: 0 0 45px rgba(0, 255, 255, 0.7);
    }

    /* Tablet */
    @media (max-width: 1024px) {
      .why-grid {
        grid-template-columns: repeat(2, 1fr);
      }
    }

    /* Mobile */
    @media (max-width: 768px) {
      .why-grid {
        grid-template-columns: 1fr;
      }
      .why-card {
        padding: 25px;
      }
    }
  `}</style>
</section>


{/* Clients */}
<section
  ref={clientsRef}
  style={{
    ...sectionStyle,
    padding: "60px 20px",
    background: "linear-gradient(135deg, #010a1a, #02142c)",
  }}
>
  <h2
    style={{
      fontSize: "2.5rem",
      fontWeight: "bold",
      textAlign: "center",
      marginBottom: "40px",
      color: "#00fff7",
    }}
  >
    Our Esteemed Clients
  </h2>

  <Slider
    dots={false}
    infinite={true}
    speed={6000}
    slidesToShow={4}
    slidesToScroll={1}
    autoplay={true}
    autoplaySpeed={0}
    cssEase="linear"
    pauseOnHover={true}
    responsive={[
      { breakpoint: 1400, settings: { slidesToShow: 3 } },
      { breakpoint: 1024, settings: { slidesToShow: 2 } },
      { breakpoint: 768, settings: { slidesToShow: 1 } },
    ]}
  >
    {[
      {
        name: "Tata Consultancy Services",
        work: "Built AI-powered process automation tools.",
        impact: "Saved 30% in operational costs.",
      },
      {
        name: "Reliance Industries",
        work: "Developed smart analytics dashboards.",
        impact: "Boosted decision-making speed by 40%.",
      },
      {
        name: "Infosys",
        work: "Deployed internal chatbot for HR operations.",
        impact: "Improved employee query resolution efficiency.",
      },
      {
        name: "Wipro",
        work: "Created scheduling and workflow system.",
        impact: "Enhanced team productivity by 25%.",
      },
      {
        name: "Bharti Airtel",
        work: "Built customer data insights tool.",
        impact: "Increased customer retention by 15%.",
      },
      {
        name: "Maruti Suzuki",
        work: "Designed predictive maintenance dashboards.",
        impact: "Reduced downtime in operations.",
      },
      {
        name: "HDFC Bank",
        work: "Automated reporting workflows.",
        impact: "Cut manual efforts by 50%.",
      },
      {
        name: "ICICI Bank",
        work: "Developed fraud detection system prototype.",
        impact: "Strengthened risk management processes.",
      },
    ].map((client, index) => (
      <div
        key={index}
        style={{
          background: "linear-gradient(145deg, #0a0f1f, #111c33)",
          borderRadius: "15px",
          padding: "20px",
          minHeight: "200px",
          margin: "10px",
          textAlign: "center",
          boxShadow: "0 0 15px rgba(0, 255, 247, 0.3)",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <h3 style={{ fontSize: "1.2rem", color: "#00fff7", marginBottom: "8px" }}>
          {client.name}
        </h3>
        <p style={{ color: "#d1eaff", fontSize: "0.95rem", marginBottom: "5px" }}>
          <strong>Work:</strong> {client.work}
        </p>
        <p style={{ color: "#a8ffef", fontSize: "0.9rem" }}>
          <strong>Impact:</strong> {client.impact}
        </p>
      </div>
    ))}
  </Slider>
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
                sitekey="6LcDYtIrAAAAAHJVn0jJ9JfZrqwKr2IJSROPkcNN"
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


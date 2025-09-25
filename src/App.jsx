import { useState, useCallback, useRef, useEffect } from "react"; // add useEffect
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

  const servicesData = [
    { title: "AI Integration", desc: "Seamlessly integrate cutting-edge AI into your workflows for enhanced automation.", icon: "🤖", gradient: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)" },
    { title: "Web Development", desc: "Enterprise-grade web applications with modern frameworks and scalable architecture.", icon: "💻", gradient: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)" },
    { title: "Data Analytics", desc: "Transform raw data into actionable insights with advanced machine learning models.", icon: "📊", gradient: "linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)" },
    { title: "Cloud Solutions", desc: "Secure, scalable cloud infrastructure for modern business requirements.", icon: "☁️", gradient: "linear-gradient(135deg, #fa709a 0%, #fee140 100%)" },
    { title: "Automation Tools", desc: "Eliminate repetitive tasks with intelligent process automation solutions.", icon: "⚙️", gradient: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)" },
    { title: "Digital Marketing", desc: "Data-driven marketing strategies to maximize your digital presence and ROI.", icon: "📈", gradient: "linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)" },
    { title: "UI/UX Design", desc: "Modern, intuitive interfaces that deliver exceptional user experiences.", icon: "🎨", gradient: "linear-gradient(135deg, #d299c2 0%, #fef9d7 100%)" },
    { title: "Consulting", desc: "Expert strategic guidance to navigate digital transformation challenges.", icon: "💡", gradient: "linear-gradient(135deg, #89f7fe 0%, #66a6ff 100%)" },
  ];

  const clientsData = [
    { name: "Tata Consultancy Services", work: "Built AI-powered process automation tools", impact: "Saved 30% in operational costs" },
    { name: "Reliance Industries", work: "Developed smart analytics dashboards", impact: "Boosted decision-making speed by 40%" },
    { name: "Infosys", work: "Deployed internal chatbot for HR operations", impact: "Improved employee query resolution efficiency" },
    { name: "Wipro", work: "Created scheduling and workflow system", impact: "Enhanced team productivity by 25%" },
    { name: "Bharti Airtel", work: "Built customer data insights tool", impact: "Increased customer retention by 15%" },
    { name: "Maruti Suzuki", work: "Designed predictive maintenance dashboards", impact: "Reduced downtime in operations" },
    { name: "HDFC Bank", work: "Automated reporting workflows", impact: "Cut manual efforts by 50%" },
    { name: "ICICI Bank", work: "Developed fraud detection system prototype", impact: "Strengthened risk management processes" },
    { name: "Tech Mahindra", work: "Implemented ML-based quality assurance", impact: "Reduced defects by 35%" },
    { name: "HCL Technologies", work: "Built real-time monitoring systems", impact: "Improved system uptime by 45%" },
  ];

  const servicesSliderSettings = {
    dots: true,
    infinite: true,
    speed: 800,
    slidesToShow: 5,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3500,
    pauseOnHover: true,
    responsive: [
      { breakpoint: 1600, settings: { slidesToShow: 4, slidesToScroll: 1 } },
      { breakpoint: 1200, settings: { slidesToShow: 3, slidesToScroll: 1 } },
      { breakpoint: 900, settings: { slidesToShow: 2, slidesToScroll: 1 } },
      { breakpoint: 600, settings: { slidesToShow: 1, slidesToScroll: 1, centerMode: true, centerPadding: "40px" } },
      { breakpoint: 480, settings: { slidesToShow: 1, slidesToScroll: 1, centerMode: true, centerPadding: "20px" } },
    ],
  };

  const clientsSliderSettings = {
    dots: false,
    infinite: true,
    speed: 800,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    pauseOnHover: true,
    responsive: [
      { breakpoint: 1200, settings: { slidesToShow: 3, slidesToScroll: 1 } },
      { breakpoint: 900, settings: { slidesToShow: 2, slidesToScroll: 1 } },
      { breakpoint: 600, settings: { slidesToShow: 1, slidesToScroll: 1, centerMode: true, centerPadding: "40px" } },
      { breakpoint: 480, settings: { slidesToShow: 1, slidesToScroll: 1, centerMode: true, centerPadding: "20px" } },
    ],
  };

  const sectionStyle = {
    padding: "80px 20px",
    maxWidth: "1400px",
    margin: "0 auto",
  };

  const headingStyle = {
    fontSize: "3rem",
    marginBottom: "40px",
    fontWeight: 500,
    color: "#00ffff",
    textAlign: "center",
  };

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

      {/* Enhanced Futuristic Navbar */}
      <nav
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: window.innerWidth < 768 ? "15px 20px" : "20px 40px",
          background: "rgba(10,15,31,0.95)",
          backdropFilter: "blur(30px)",
          borderBottom: "1px solid rgba(0,255,255,0.3)",
          zIndex: 100,
          boxShadow: "0 8px 40px rgba(0,255,255,0.15), 0 0 80px rgba(29,233,182,0.1)"
        }}
      >
        <div
          style={{
            color: "#00ffff",
            fontSize: window.innerWidth < 768 ? "1.8rem" : "2.4rem",
            fontWeight: "900",
            textShadow: "0 0 30px #00ffff, 0 0 60px #1de9b6",
            background: "linear-gradient(45deg, #00ffff, #1de9b6, #00ffff)",
            backgroundSize: "200% 100%",
            backgroundClip: "text",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            letterSpacing: "-0.02em",
            animation: "gradientShift 3s ease-in-out infinite"
          }}
        >
          FUTURIFY
        </div>

        <div
          style={{
            display: "flex",
            gap: window.innerWidth < 768 ? "15px" : "35px",
            alignItems: "center",
            flexWrap: "wrap"
          }}
        >
          {[
            { name: "Home", ref: null },
            { name: "Services", ref: servicesRef },
            { name: "About", ref: aboutRef },
            { name: "Why Us", ref: whyRef },
            { name: "Clients", ref: clientsRef },
          ].map((item) => (
            <button
              key={item.name}
              onClick={() => scrollToSection(item.ref)}
              style={{
                background: "rgba(0,255,255,0.05)",
                border: "1px solid rgba(0,255,255,0.2)",
                color: "#ffffff",
                fontSize: window.innerWidth < 768 ? "0.9rem" : "1rem",
                cursor: "pointer",
                padding: "10px 20px",
                borderRadius: "12px",
                transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                position: "relative",
                fontWeight: "500",
                overflow: "hidden"
              }}
              onMouseEnter={(e) => {
                e.target.style.color = "#000";
                e.target.style.background = "linear-gradient(45deg, #00ffff, #1de9b6)";
                e.target.style.borderColor = "#00ffff";
                e.target.style.boxShadow = "0 0 20px rgba(0,255,255,0.5)";
                e.target.style.transform = "translateY(-2px)";
              }}
              onMouseLeave={(e) => {
                e.target.style.color = "#ffffff";
                e.target.style.background = "rgba(0,255,255,0.05)";
                e.target.style.borderColor = "rgba(0,255,255,0.2)";
                e.target.style.boxShadow = "none";
                e.target.style.transform = "translateY(0)";
              }}
            >
              {item.name}
            </button>
          ))}
        </div>
      </nav>

      <div style={{ position: "relative", zIndex: 10 }}>
        {/* Enhanced Hero Section */}
        <section style={{ 
          paddingTop: "120px", 
          minHeight: "90vh", 
          display: "flex", 
          flexWrap: "wrap", 
          justifyContent: "center", 
          alignItems: "center", 
          gap: "40px", 
          textAlign: "center",
          background: "radial-gradient(ellipse at center, rgba(0,255,255,0.1) 0%, transparent 70%)"
        }}>
          <div style={{ flex: "1 1 400px", minWidth: "300px" }}>
            <h1 style={{ 
              fontSize: window.innerWidth < 768 ? "2.8rem" : "4rem", 
              fontWeight: 900, 
              color: "#00ffff", 
              textShadow: "0 0 20px #00ffff, 0 0 40px #1de9b6, 0 0 80px rgba(0,255,255,0.3)", 
              marginBottom: "25px",
              background: "linear-gradient(45deg, #00ffff, #1de9b6, #00ffff)",
              backgroundSize: "200% 100%",
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              animation: "gradientShift 4s ease-in-out infinite"
            }}>
              Build Your Digital Future
            </h1>
            <p style={{ 
              color: "#cbd5e1", 
              fontSize: "1.3rem", 
              maxWidth: "700px", 
              margin: "0 auto 35px auto",
              lineHeight: 1.7,
              textShadow: "0 2px 10px rgba(0,0,0,0.5)"
            }}>
              Cutting-edge solutions in <span style={{ color: "#1de9b6", fontWeight: "600" }}>Web Development</span>, 
              <span style={{ color: "#1de9b6", fontWeight: "600" }}> AI & Data Science</span>, and 
              <span style={{ color: "#1de9b6", fontWeight: "600" }}> Digital Marketing</span>.
            </p>
            <button 
              onClick={() => setShowFormPopup(true)} 
              style={{ 
                padding: "15px 35px", 
                background: "linear-gradient(45deg, #00ffff, #1de9b6)", 
                border: "none", 
                borderRadius: "15px", 
                fontWeight: "bold", 
                color: "#000", 
                cursor: "pointer", 
                fontSize: "1.1rem", 
                boxShadow: "0 0 25px #00ffff, 0 0 50px #1de9b6",
                transition: "all 0.3s ease",
                transform: "perspective(1000px) rotateX(0deg)"
              }}
              onMouseEnter={(e) => {
                e.target.style.transform = "perspective(1000px) rotateX(-10deg) scale(1.05)";
                e.target.style.boxShadow = "0 10px 35px #00ffff, 0 15px 60px #1de9b6";
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = "perspective(1000px) rotateX(0deg) scale(1)";
                e.target.style.boxShadow = "0 0 25px #00ffff, 0 0 50px #1de9b6";
              }}
            >
              Start Building
            </button>
          </div>
        </section>

     {/* Enhanced Services Section */}
<section
  ref={servicesRef}
  style={{
    ...sectionStyle,
    padding: "80px 20px",
    background: "linear-gradient(135deg, #020d1f 0%, #041830 50%, #0a1a35 100%)",
    position: "relative",
    overflow: "hidden",
  }}
>
  <div
    style={{
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundImage: `radial-gradient(circle at 25% 25%, rgba(0,255,247,0.08) 0%, transparent 50%),
                        radial-gradient(circle at 75% 75%, rgba(29,233,182,0.08) 0%, transparent 50%)`,
      pointerEvents: "none",
    }}
  />

  <h2
    style={{
      fontSize: "3.2rem",
      fontWeight: "900",
      textAlign: "center",
      marginBottom: "25px",
      color: "#00fff7",
      textShadow: "0 0 30px #00fff7, 0 0 60px #00fff799",
      background: "linear-gradient(45deg, #00fff7, #7dd3fc, #1de9b6)",
      backgroundSize: "200% 100%",
      backgroundClip: "text",
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent",
      position: "relative",
      zIndex: 1,
      animation: "gradientShift 5s ease-in-out infinite",
    }}
  >
    Our Services
  </h2>

  <p
    style={{
      textAlign: "center",
      color: "#94a3b8",
      fontSize: "1.2rem",
      maxWidth: "650px",
      margin: "0 auto 60px",
      position: "relative",
      zIndex: 1,
      lineHeight: 1.6,
    }}
  >
    Transforming businesses with cutting-edge technology solutions
  </p>

  <div style={{ position: "relative", zIndex: 1 }}>
    <Slider {...servicesSliderSettings}>
      {servicesData.map((service, idx) => (
        <div key={idx} style={{ padding: "0 8px" }}>
          <div
            style={{
              background: "rgba(0,255,255,0.08)",
              backdropFilter: "blur(20px)",
              borderRadius: "24px",
              height: "340px",
              textAlign: "center",
              boxShadow: "0 20px 60px rgba(0,255,255,0.2), 0 8px 25px rgba(0,0,0,0.15)",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              padding: "30px 20px",
              transition: "all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
              border: "1px solid rgba(0,255,255,0.25)",
              position: "relative",
              overflow: "hidden",
              cursor: "pointer",
              margin: "0 auto",
              maxWidth: "280px",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-15px) scale(1.03)";
              e.currentTarget.style.boxShadow = "0 30px 80px rgba(0, 255, 255, 0.4), 0 15px 35px rgba(0,0,0,0.3)";
              e.currentTarget.style.borderColor = "rgba(0,255,255,0.5)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0) scale(1)";
              e.currentTarget.style.boxShadow = "0 20px 60px rgba(0,255,255,0.2), 0 8px 25px rgba(0,0,0,0.15)";
              e.currentTarget.style.borderColor = "rgba(0,255,255,0.25)";
            }}
          >
            <div
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                height: "4px",
                background: service.gradient,
                borderRadius: "24px 24px 0 0",
                animation: "pulse 3s ease-in-out infinite",
              }}
            />

            <div
              style={{
                fontSize: "3.5rem",
                marginBottom: "20px",
                textShadow: "0 0 20px #00fff7",
                filter: "drop-shadow(0 0 15px rgba(0,255,247,0.4))",
              }}
            >
              {service.icon}
            </div>

            <h3
              style={{
                fontSize: "1.4rem",
                marginBottom: "15px",
                color: "#ffffff",
                textShadow: "0 0 15px rgba(0,255,247,0.6)",
                fontWeight: "700",
                letterSpacing: "-0.02em",
              }}
            >
              {service.title}
            </h3>

            <p
              style={{
                color: "#cbd5e1",
                fontSize: "0.95rem",
                lineHeight: 1.5,
                margin: 0,
                fontWeight: "400",
                opacity: 0.9,
              }}
            >
              {service.desc}
            </p>
          </div>
        </div>
      ))}
    </Slider>
  </div>
</section>


        {/* About Section */}
        <section
          ref={aboutRef}
          style={{
            ...sectionStyle,
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            gap: "50px",
            padding: "80px 20px",
          }}
        >
          <img
            src="https://images.unsplash.com/photo-1581090700227-1d7f0ee6d8f7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxfDB8MXxyYW5kb218MHx8dGVjaG5vbG9neXxlbnwwfHx8fDE2OTUyMzYyNTY&ixlib=rb-4.0.3&q=80&w=500"
            alt="About"
            style={{
              borderRadius: "25px",
              maxWidth: "500px",
              flex: "1 1 400px",
              boxShadow: "0 0 40px rgba(0,255,255,0.3), 0 0 80px rgba(29,233,182,0.2)",
              width: "100%",
              filter: "brightness(1.1) contrast(1.1)",
            }}
          />
          <div style={{ flex: "1 1 500px" }}>
            <h3 style={{ fontSize: "3.2rem", marginBottom: "25px", color: "#00ffff", textShadow: "0 0 25px #00ffff" }}>
              Who We Are
            </h3>
            <p style={{ color: "#e2e8f0", fontSize: "1.15rem", lineHeight: 1.8, marginBottom: "20px" }}>
              At Futurify, we are a dedicated team of visionaries, technologists, and strategists
              who thrive at the intersection of innovation and business growth. With years of
              experience across industries, we specialize in building intelligent, scalable,
              and secure digital solutions that empower organizations to achieve their
              strategic goals.  
            </p>
            <p style={{ color: "#e2e8f0", fontSize: "1.15rem", lineHeight: 1.8, marginBottom: "20px" }}>
              Our expertise spans cutting-edge <span style={{ color: "#1de9b6", fontWeight: "600" }}>web development</span>,
              <span style={{ color: "#1de9b6", fontWeight: "600" }}> AI & data science</span>, <span style={{ color: "#1de9b6", fontWeight: "600" }}>cloud infrastructure</span>,
              <span style={{ color: "#1de9b6", fontWeight: "600" }}> digital marketing</span>, and <span style={{ color: "#1de9b6", fontWeight: "600" }}>automation solutions</span>.
              By combining deep technical knowledge with creative design and strategic thinking,
              we craft solutions that are not only functional but transformative.  
            </p>
            <p style={{ color: "#1de9b6", fontSize: "1.05rem", marginTop: "25px", fontWeight: "500", textShadow: "0 0 10px rgba(29,233,182,0.3)" }}>
              Partner with us, and together we will create a digital future that is innovative,
              resilient, and impactful.
            </p>
          </div>
        </section>

        {/* Why Choose Us Section */}
        <section
          ref={whyRef}
          style={{
            ...sectionStyle,
            background: "linear-gradient(135deg, #0a0f1f 0%, #081529 100%)",
            borderRadius: "25px",
            marginBottom: "40px",
            padding: "80px 20px",
            boxShadow: "0 0 60px rgba(0,255,255,0.1)"
          }}
        >
          <h3 style={{ ...headingStyle, color: "#1de9b6", fontSize: "3.2rem", textShadow: "0 0 25px #1de9b6" }}>Why Choose Us</h3>

          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: "30px",
            justifyItems: "center",
            maxWidth: "1200px",
            margin: "0 auto"
          }}>
            {[
              { title: "Innovation", icon: "🚀", desc: "We push the boundaries of technology to deliver next-generation solutions..." },
              { title: "Scalability", icon: "📈", desc: "Our solutions grow seamlessly with your business requirements..." },
              { title: "Security", icon: "🔒", desc: "We implement enterprise-grade security protocols for maximum protection..." },
              { title: "Support", icon: "🛠️", desc: "Our dedicated 24/7 support ensures your success at every step..." },
              { title: "Reliability", icon: "✅", desc: "We deliver consistent, dependable solutions you can trust..." },
              { title: "Future-Ready", icon: "🌐", desc: "We anticipate the evolving tech landscape and prepare you for tomorrow..." },
            ].map((feature, idx) => (
              <div 
                key={idx} 
                style={{
                  background: "linear-gradient(145deg, rgba(17,17,17,0.8), rgba(26,26,26,0.8))",
                  backdropFilter: "blur(20px)",
                  padding: "40px",
                  borderRadius: "20px",
                  width: "100%",
                  maxWidth: "350px",
                  textAlign: "center",
                  boxShadow: "0 0 40px rgba(0, 255, 255, 0.3)",
                  transition: "all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
                  border: "1px solid rgba(0,255,255,0.2)",
                  cursor: "pointer"
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-15px) scale(1.02)";
                  e.currentTarget.style.boxShadow = "0 0 60px rgba(0, 255, 255, 0.5)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0) scale(1)";
                  e.currentTarget.style.boxShadow = "0 0 40px rgba(0, 255, 255, 0.3)";
                }}
              >
                <div style={{ fontSize: "3.5rem", marginBottom: "20px", filter: "drop-shadow(0 0 10px #00ffff)" }}>
                  {feature.icon}
                </div>
                <h4 style={{ fontSize: "1.6rem", marginBottom: "18px", color: "#00ffff", textShadow: "0 0 15px #00ffff" }}>
                  {feature.title}
                </h4>
                <p style={{ color: "#cbd5e1", fontSize: "1.05rem", lineHeight: 1.6 }}>
                  {feature.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Enhanced Clients Section */}
        <section
          ref={clientsRef}
          style={{
            ...sectionStyle,
            padding: "80px 20px",
            background: "linear-gradient(135deg, #010a1a, #02142c)",
            position: "relative",
            overflow: "hidden"
          }}
        >
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundImage: `radial-gradient(circle at 30% 30%, rgba(0,255,247,0.06) 0%, transparent 50%),
                                radial-gradient(circle at 70% 70%, rgba(29,233,182,0.06) 0%, transparent 50%)`,
              pointerEvents: "none",
            }}
          />

          <h2
            style={{
              fontSize: "3rem",
              fontWeight: "900",
              textAlign: "center",
              marginBottom: "50px",
              color: "#00fff7",
              textShadow: "0 0 30px #00fff7",
              background: "linear-gradient(45deg, #00fff7, #7dd3fc, #1de9b6)",
              backgroundSize: "200% 100%",
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              animation: "gradientShift 5s ease-in-out infinite",
              position: "relative",
              zIndex: 1
            }}
          >
            Our Esteemed Clients
          </h2>

          <div style={{ position: "relative", zIndex: 1 }}>
            <Slider {...clientsSliderSettings}>
              {clientsData.map((client, index) => (
                <div key={index} style={{ padding: "0 10px" }}>
                  <div
                    style={{
                      background: "rgba(0,255,255,0.08)",
                      backdropFilter: "blur(20px)",
                      borderRadius: "20px",
                      minHeight: "220px",
                      textAlign: "center",
                      boxShadow: "0 15px 45px rgba(0, 255, 247, 0.2)",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                      padding: "25px 20px",
                      transition: "all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
                      border: "1px solid rgba(0,255,255,0.25)",
                      position: "relative",
                      overflow: "hidden",
                      cursor: "pointer"
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = "translateY(-10px) scale(1.02)";
                      e.currentTarget.style.boxShadow = "0 25px 60px rgba(0, 255, 247, 0.35)";
                      e.currentTarget.style.borderColor = "rgba(0,255,255,0.5)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = "translateY(0) scale(1)";
                      e.currentTarget.style.boxShadow = "0 15px 45px rgba(0, 255, 247, 0.2)";
                      e.currentTarget.style.borderColor = "rgba(0,255,255,0.25)";
                    }}
                  >
                    <div
                      style={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        right: 0,
                        height: "3px",
                        background: "linear-gradient(90deg, #00fff7, #1de9b6)",
                        borderRadius: "20px 20px 0 0",
                        animation: "pulse 2s ease-in-out infinite"
                      }}
                    />

                    <h3 style={{ 
                      fontSize: "1.25rem", 
                      color: "#00fff7", 
                      marginBottom: "12px",
                      textShadow: "0 0 15px rgba(0,255,247,0.5)",
                      fontWeight: "700"
                    }}>
                      {client.name}
                    </h3>
                    <p style={{ 
                      color: "#cbd5e1", 
                      fontSize: "0.95rem", 
                      marginBottom: "8px",
                      lineHeight: 1.4
                    }}>
                      <strong style={{ color: "#a8ffef" }}>Work:</strong> {client.work}
                    </p>
                    <p style={{ 
                      color: "#a8ffef", 
                      fontSize: "0.9rem",
                      lineHeight: 1.4
                    }}>
                      <strong>Impact:</strong> {client.impact}
                    </p>
                  </div>
                </div>
              ))}
            </Slider>
          </div>
        </section>

        {/* Enhanced Footer */}
        <footer
          ref={contactRef}
          style={{
            padding: "80px 20px 60px",
            textAlign: "center",
            background: "linear-gradient(135deg, #0a0f1f 0%, #111c33 100%)",
            color: "#fff",
            borderTop: "2px solid rgba(0,255,255,0.3)",
            boxShadow: "0 -10px 40px rgba(0,255,255,0.1)"
          }}
        >
          <div style={{ marginBottom: "40px" }}>
            <h3 style={{
              fontSize: "2.5rem",
              color: "#00ffff",
              textShadow: "0 0 25px #00ffff",
              marginBottom: "20px",
              fontWeight: "700"
            }}>
              Ready to Transform Your Business?
            </h3>
            <p style={{ 
              color: "#cbd5e1", 
              fontSize: "1.1rem", 
              maxWidth: "600px", 
              margin: "0 auto 30px",
              lineHeight: 1.6
            }}>
              Let's build something extraordinary together. Contact us today to start your digital transformation journey.
            </p>
            <button
              onClick={() => setShowFormPopup(true)}
              style={{
                padding: "15px 35px",
                background: "linear-gradient(45deg, #00ffff, #1de9b6)",
                border: "none",
                borderRadius: "12px",
                fontWeight: "bold",
                color: "#000",
                cursor: "pointer",
                fontSize: "1.1rem",
                boxShadow: "0 0 25px rgba(0,255,255,0.5)",
                transition: "all 0.3s ease"
              }}
              onMouseEnter={(e) => {
                e.target.style.transform = "scale(1.05)";
                e.target.style.boxShadow = "0 0 35px rgba(0,255,255,0.7)";
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = "scale(1)";
                e.target.style.boxShadow = "0 0 25px rgba(0,255,255,0.5)";
              }}
            >
              Get Started Now
            </button>
          </div>
          
          <div style={{ 
            borderTop: "1px solid rgba(0,255,255,0.2)", 
            paddingTop: "30px",
            color: "#94a3b8"
          }}>
            <p style={{ margin: 0, fontSize: "1rem" }}>
              &copy; 2025 Futurify. All Rights Reserved. | Powered by Innovation
            </p>
          </div>
        </footer>
      </div>

      {/* Enhanced Popup Form */}
      {showFormPopup && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            background: "rgba(0,0,0,0.9)",
            backdropFilter: "blur(10px)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 200,
            padding: "20px",
            animation: "fadeIn 0.3s ease-in-out"
          }}
        >
          <div
            style={{
              background: "linear-gradient(145deg, #0c132b, #1a1f3a)",
              padding: "50px",
              borderRadius: "30px",
              maxWidth: "550px",
              width: "100%",
              boxShadow: "0 0 60px rgba(0,255,255,0.4), 0 0 120px rgba(29,233,182,0.2)",
              border: "1px solid rgba(0,255,255,0.3)",
              position: "relative",
              overflow: "hidden"
            }}
          >
            <div
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                height: "4px",
                background: "linear-gradient(90deg, #00ffff, #1de9b6)",
                borderRadius: "30px 30px 0 0"
              }}
            />

            <h3
              style={{
                color: "#00ffff",
                marginBottom: "15px",
                textAlign: "center",
                fontSize: "2rem",
                fontWeight: "700",
                textShadow: "0 0 20px #00ffff"
              }}
            >
              Start Your Project
            </h3>
            <p
              style={{
                color: "#cbd5e1",
                marginBottom: "30px",
                textAlign: "center",
                fontSize: "1.05rem",
                lineHeight: 1.5
              }}
            >
              Share your project details and our team will get back to you with futuristic solutions.
            </p>

            <form
              onSubmit={handleSubmit}
              style={{ display: "flex", flexDirection: "column", gap: "20px" }}
            >
              <input
                required
                placeholder="Your Name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                style={{
                  padding: "15px",
                  borderRadius: "12px",
                  border: "1px solid rgba(0,255,255,0.3)",
                  outline: "none",
                  backgroundColor: "rgba(17,17,17,0.8)",
                  color: "#fff",
                  fontSize: "1rem",
                  transition: "all 0.3s ease"
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = "#00ffff";
                  e.target.style.boxShadow = "0 0 15px rgba(0,255,255,0.3)";
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = "rgba(0,255,255,0.3)";
                  e.target.style.boxShadow = "none";
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
                  padding: "15px",
                  borderRadius: "12px",
                  border: "1px solid rgba(0,255,255,0.3)",
                  outline: "none",
                  backgroundColor: "rgba(17,17,17,0.8)",
                  color: "#fff",
                  fontSize: "1rem",
                  transition: "all 0.3s ease"
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = "#00ffff";
                  e.target.style.boxShadow = "0 0 15px rgba(0,255,255,0.3)";
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = "rgba(0,255,255,0.3)";
                  e.target.style.boxShadow = "none";
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
                  padding: "15px",
                  borderRadius: "12px",
                  border: "1px solid rgba(0,255,255,0.3)",
                  outline: "none",
                  backgroundColor: "rgba(17,17,17,0.8)",
                  color: "#fff",
                  fontSize: "1rem",
                  transition: "all 0.3s ease"
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = "#00ffff";
                  e.target.style.boxShadow = "0 0 15px rgba(0,255,255,0.3)";
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = "rgba(0,255,255,0.3)";
                  e.target.style.boxShadow = "none";
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
                  padding: "15px",
                  borderRadius: "12px",
                  border: "1px solid rgba(0,255,255,0.3)",
                  outline: "none",
                  backgroundColor: "rgba(17,17,17,0.8)",
                  color: "#fff",
                  resize: "none",
                  fontSize: "1rem",
                  transition: "all 0.3s ease"
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = "#00ffff";
                  e.target.style.boxShadow = "0 0 15px rgba(0,255,255,0.3)";
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = "rgba(0,255,255,0.3)";
                  e.target.style.boxShadow = "none";
                }}
              />

              <div style={{ display: "flex", justifyContent: "center" }}>
                <ReCAPTCHA
                  sitekey="6LcDYtIrAAAAAHJVn0jJ9JfZrqwKr2IJSROPkcNN"
                  onChange={handleCaptchaChange}
                  theme="dark"
                />
              </div>
              
              <button
                type="submit"
                style={{
                  padding: "15px",
                  borderRadius: "12px",
                  border: "none",
                  fontWeight: "bold",
                  background: "linear-gradient(45deg, #00ffff, #1de9b6)",
                  cursor: "pointer",
                  color: "#000",
                  boxShadow: "0 0 25px rgba(0,255,255,0.5)",
                  fontSize: "1.1rem",
                  transition: "all 0.3s ease"
                }}
                onMouseEnter={(e) => {
                  e.target.style.transform = "scale(1.02)";
                  e.target.style.boxShadow = "0 0 35px rgba(0,255,255,0.7)";
                }}
                onMouseLeave={(e) => {
                  e.target.style.transform = "scale(1)";
                  e.target.style.boxShadow = "0 0 25px rgba(0,255,255,0.5)";
                }}
              >
                Submit Project Details
              </button>
              
              {message && (
                <p style={{ 
                  color: message.includes("Error") ? "#ff6b6b" : "#1de9b6", 
                  textAlign: "center", 
                  fontWeight: "500",
                  textShadow: "0 0 10px currentColor"
                }}>
                  {message}
                </p>
              )}
            </form>
            
            <button
              onClick={() => setShowFormPopup(false)}
              style={{
                position: "absolute",
                top: "20px",
                right: "25px",
                background: "transparent",
                color: "#00ffff",
                border: "none",
                cursor: "pointer",
                fontSize: "1.5rem",
                fontWeight: "bold",
                width: "35px",
                height: "35px",
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                transition: "all 0.3s ease"
              }}
              onMouseEnter={(e) => {
                e.target.style.background = "rgba(0,255,255,0.2)";
                e.target.style.transform = "scale(1.1)";
              }}
              onMouseLeave={(e) => {
                e.target.style.background = "transparent";
                e.target.style.transform = "scale(1)";
              }}
            >
              ×
            </button>
          </div>
        </div>
      )}

      <style jsx global>{`
        @keyframes gradientShift {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }

        @keyframes pulse {
          0%, 100% { opacity: 0.6; }
          50% { opacity: 1; }
        }

        @keyframes fadeIn {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }

        .slick-dots {
          bottom: -60px !important;
        }

        .slick-dots li button:before {
          color: #00fff7 !important;
          font-size: 14px !important;
          opacity: 0.6 !important;
        }

        .slick-dots li.slick-active button:before {
          opacity: 1 !important;
          color: #00fff7 !important;
          text-shadow: 0 0 15px #00fff7 !important;
        }

        .slick-slide > div {
          height: 100%;
        }

        .slick-track {
          display: flex;
          align-items: stretch;
        }

        @media (max-width: 768px) {
          .slick-dots {
            bottom: -50px !important;
          }
        }

        /* Custom scrollbar */
        ::-webkit-scrollbar {
          width: 8px;
        }

        ::-webkit-scrollbar-track {
          background: #0a0f1f;
        }

        ::-webkit-scrollbar-thumb {
          background: linear-gradient(135deg, #00ffff, #1de9b6);
          border-radius: 10px;
        }

        ::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(135deg, #1de9b6, #00ffff);
        }
      `}</style>
    </div>
  );
}
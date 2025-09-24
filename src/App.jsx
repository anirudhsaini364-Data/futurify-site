import { useState, useRef, useEffect } from "react";

export default function App() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    details: "",
  });
  const [submissions, setSubmissions] = useState({});
  const [message, setMessage] = useState("");
  const [showFormPopup, setShowFormPopup] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [currentClientSlide, setCurrentClientSlide] = useState(0);

  const servicesRef = useRef(null);
  const aboutRef = useRef(null);
  const whyRef = useRef(null);
  const contactRef = useRef(null);
  const clientsRef = useRef(null);

  // Parallax scroll effect
  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Auto-slide for services
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % services.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  // Auto-slide for clients
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentClientSlide((prev) => (prev + 1) % clients.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const scrollToSection = (ref) => {
    if (!ref) {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    ref.current.scrollIntoView({ behavior: "smooth" });
  };

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = formData.email.trim().toLowerCase();
    
    if (submissions[email] >= 2) {
      setMessage("You have already submitted twice. Thank you!");
      return;
    }
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setSubmissions((prev) => ({
        ...prev,
        [email]: (prev[email] || 0) + 1,
      }));
      setMessage("Form submitted successfully!");
      setFormData({ name: "", email: "", phone: "", details: "" });
      setShowFormPopup(false);
    } catch (err) {
      console.error(err);
      setMessage("Error submitting form.");
    }
  };

  const services = [
    { 
      title: "AI Integration", 
      desc: "Seamlessly integrate cutting-edge AI into your existing workflows and processes with intelligent automation.", 
      icon: "🤖",
      gradient: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      tech: ["Machine Learning", "Neural Networks", "Computer Vision"]
    },
    { 
      title: "Web Development", 
      desc: "Modern, responsive web applications built with the latest technologies and optimized for performance.", 
      icon: "💻",
      gradient: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
      tech: ["React", "Next.js", "Node.js"]
    },
    { 
      title: "Data Analytics", 
      desc: "Transform raw data into actionable insights with advanced analytics and interactive visualizations.", 
      icon: "📊",
      gradient: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
      tech: ["Python", "TensorFlow", "Power BI"]
    },
    { 
      title: "Cloud Solutions", 
      desc: "Scalable, secure cloud infrastructure that grows with your business and optimizes costs.", 
      icon: "☁️",
      gradient: "linear-gradient(135deg, #fa709a 0%, #fee140 100%)",
      tech: ["AWS", "Azure", "Kubernetes"]
    },
    { 
      title: "Mobile Apps", 
      desc: "Native and cross-platform mobile applications with stunning UI and seamless performance.", 
      icon: "📱",
      gradient: "linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)",
      tech: ["React Native", "Flutter", "Swift"]
    },
    { 
      title: "Consulting", 
      desc: "Strategic technology consulting to guide your digital transformation journey effectively.", 
      icon: "💡",
      gradient: "linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)",
      tech: ["Strategy", "Architecture", "DevOps"]
    },
  ];

  const clients = [
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
  ];

  const whyFeatures = [
    { 
      title: "Innovation", 
      icon: "🚀", 
      desc: "We push the boundaries of technology with cutting-edge solutions that keep you ahead of the competition.",
      color: "#667eea"
    },
    { 
      title: "Scalability", 
      icon: "📈", 
      desc: "Our solutions grow with your business, ensuring seamless expansion without performance bottlenecks.",
      color: "#f093fb"
    },
    { 
      title: "Security", 
      icon: "🔒", 
      desc: "We implement enterprise-grade security protocols to protect your data and digital assets.",
      color: "#4facfe"
    },
    { 
      title: "24/7 Support", 
      icon: "🛠️", 
      desc: "Our dedicated support team ensures your systems run smoothly around the clock.",
      color: "#43e97b"
    },
    { 
      title: "Reliability", 
      icon: "✅", 
      desc: "We deliver consistent, dependable solutions with 99.9% uptime and robust performance.",
      color: "#fa709a"
    },
    { 
      title: "Future-Ready", 
      icon: "🌐", 
      desc: "We anticipate technology trends and build solutions that adapt to tomorrow's challenges.",
      color: "#a8edea"
    },
  ];

  const sectionStyle = {
    padding: "80px 20px",
    maxWidth: "1400px",
    margin: "0 auto",
  };

  return (
    <div style={{ 
      position: "relative", 
      minHeight: "100vh", 
      backgroundColor: "#0a0f1f", 
      fontFamily: "'Inter', 'Poppins', sans-serif", 
      overflowX: "hidden",
      color: "#ffffff"
    }}>
      {/* Custom CSS Animations */}
      <style>
        {`
          @keyframes float {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-20px); }
          }
          @keyframes bounce {
            0%, 20%, 53%, 80%, 100% { transform: translate3d(0,0,0); }
            40%, 43% { transform: translate3d(0,-15px,0); }
            70% { transform: translate3d(0,-7px,0); }
            90% { transform: translate3d(0,-3px,0); }
          }
          @keyframes scroll {
            0% { transform: translateX(-50%) translateY(0); }
            50% { transform: translateX(-50%) translateY(10px); }
            100% { transform: translateX(-50%) translateY(0); }
          }
          @keyframes grid-move {
            0% { transform: translate(0, 0); }
            100% { transform: translate(50px, 50px); }
          }
          @keyframes pulse {
            0%, 100% { opacity: 0.6; }
            50% { opacity: 1; }
          }
          @keyframes glow {
            0%, 100% { box-shadow: 0 0 20px rgba(0,255,255,0.3); }
            50% { box-shadow: 0 0 40px rgba(0,255,255,0.6), 0 0 60px rgba(0,255,255,0.3); }
          }
          .particle {
            position: absolute;
            background: #00ffff;
            border-radius: 50%;
            animation: float 6s ease-in-out infinite;
          }
          .particle:nth-child(1) { width: 3px; height: 3px; top: 20%; left: 10%; animation-delay: 0s; }
          .particle:nth-child(2) { width: 2px; height: 2px; top: 60%; left: 20%; animation-delay: 1s; }
          .particle:nth-child(3) { width: 4px; height: 4px; top: 40%; left: 80%; animation-delay: 2s; }
          .particle:nth-child(4) { width: 2px; height: 2px; top: 80%; left: 60%; animation-delay: 3s; }
          .particle:nth-child(5) { width: 3px; height: 3px; top: 30%; left: 90%; animation-delay: 4s; }
          .particle:nth-child(6) { width: 2px; height: 2px; top: 70%; left: 5%; animation-delay: 5s; }
        `}
      </style>

      {/* Animated Background Particles */}
      <div style={{ position: "fixed", top: 0, left: 0, width: "100%", height: "100%", zIndex: -1, pointerEvents: "none" }}>
        {[...Array(6)].map((_, i) => (
          <div key={i} className="particle" />
        ))}
      </div>

      {/* Futuristic Navbar */}
      <nav
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: window.innerWidth < 768 ? "15px 20px" : "20px 60px",
          background: "rgba(10,15,31,0.95)",
          backdropFilter: "blur(20px)",
          borderBottom: "1px solid rgba(0,255,255,0.2)",
          zIndex: 100,
          boxShadow: "0 4px 30px rgba(0,255,255,0.1)"
        }}
      >
        <div
          style={{
            color: "#00ffff",
            fontSize: window.innerWidth < 768 ? "1.8rem" : "2.2rem",
            fontWeight: "900",
            textShadow: "0 0 20px #00ffff",
            background: "linear-gradient(45deg, #00ffff, #1de9b6)",
            backgroundClip: "text",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            letterSpacing: "-0.02em"
          }}
        >
          FUTURIFY
        </div>

        <div
          style={{
            display: "flex",
            gap: window.innerWidth < 768 ? "15px" : "30px",
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
          ].map((item, idx) => (
            <button
              key={item.name}
              onClick={() => scrollToSection(item.ref)}
              style={{
                background: "transparent",
                border: "none",
                color: "#ffffff",
                fontSize: window.innerWidth < 768 ? "0.9rem" : "1rem",
                cursor: "pointer",
                padding: "8px 16px",
                borderRadius: "8px",
                transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                position: "relative",
                fontWeight: "500"
              }}
              onMouseEnter={(e) => {
                e.target.style.color = "#00ffff";
                e.target.style.textShadow = "0 0 10px #00ffff";
                e.target.style.background = "rgba(0,255,255,0.1)";
              }}
              onMouseLeave={(e) => {
                e.target.style.color = "#ffffff";
                e.target.style.textShadow = "none";
                e.target.style.background = "transparent";
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
          paddingTop: "140px", 
          minHeight: "100vh", 
          display: "flex", 
          flexDirection: "column",
          justifyContent: "center", 
          alignItems: "center", 
          textAlign: "center",
          position: "relative",
          overflow: "hidden"
        }}>
          {/* Animated background elements */}
          <div
            style={{
              position: "absolute",
              top: "20%",
              left: "10%",
              width: "300px",
              height: "300px",
              background: "radial-gradient(circle, rgba(0,255,255,0.1), transparent)",
              borderRadius: "50%",
              animation: "float 8s ease-in-out infinite",
              transform: `translateY(${scrollY * -0.2}px)`
            }}
          />
          <div
            style={{
              position: "absolute",
              top: "60%",
              right: "15%",
              width: "200px",
              height: "200px",
              background: "radial-gradient(circle, rgba(29,233,182,0.15), transparent)",
              borderRadius: "50%",
              animation: "float 6s ease-in-out infinite reverse",
              transform: `translateY(${scrollY * -0.3}px)`
            }}
          />

          <div style={{ maxWidth: "900px", padding: "0 20px" }}>
            <h1 style={{ 
              fontSize: window.innerWidth < 768 ? "3rem" : "4.5rem",
              fontWeight: "900", 
              background: "linear-gradient(135deg, #00ffff 0%, #1de9b6 50%, #7dd3fc 100%)",
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              marginBottom: "30px",
              letterSpacing: "-0.03em",
              lineHeight: 1.1,
              textShadow: "0 0 30px rgba(0,255,255,0.3)"
            }}>
              Build Your Digital Future
            </h1>
            
            <p style={{ 
              color: "#cbd5e1", 
              fontSize: window.innerWidth < 768 ? "1.1rem" : "1.4rem",
              lineHeight: 1.6,
              marginBottom: "40px",
              maxWidth: "700px",
              margin: "0 auto 40px auto"
            }}>
              Cutting-edge solutions in <span style={{ color: "#1de9b6", fontWeight: "600" }}>Web Development</span>, 
              <span style={{ color: "#1de9b6", fontWeight: "600" }}> AI & Data Science</span>, and 
              <span style={{ color: "#1de9b6", fontWeight: "600" }}> Digital Marketing</span>.
            </p>
            
            <button 
              onClick={() => setShowFormPopup(true)} 
              style={{ 
                padding: "18px 40px",
                background: "linear-gradient(135deg, #00ffff 0%, #1de9b6 100%)",
                border: "none",
                borderRadius: "50px",
                fontWeight: "700",
                color: "#000",
                cursor: "pointer",
                fontSize: "1.1rem",
                boxShadow: "0 10px 30px rgba(0,255,255,0.4), 0 0 0 1px rgba(255,255,255,0.1)",
                transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                textTransform: "uppercase",
                letterSpacing: "0.05em"
              }}
              onMouseEnter={(e) => {
                e.target.style.transform = "translateY(-2px) scale(1.05)";
                e.target.style.boxShadow = "0 20px 40px rgba(0,255,255,0.6), 0 0 0 1px rgba(255,255,255,0.2)";
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = "translateY(0) scale(1)";
                e.target.style.boxShadow = "0 10px 30px rgba(0,255,255,0.4), 0 0 0 1px rgba(255,255,255,0.1)";
              }}
            >
              Start Building
            </button>
          </div>

          {/* Scroll indicator */}
          <div
            style={{
              position: "absolute",
              bottom: "40px",
              left: "50%",
              transform: "translateX(-50%)",
              animation: "bounce 2s infinite"
            }}
          >
            <div
              style={{
                width: "30px",
                height: "50px",
                border: "2px solid rgba(0,255,255,0.6)",
                borderRadius: "20px",
                position: "relative"
              }}
            >
              <div
                style={{
                  width: "4px",
                  height: "8px",
                  background: "#00ffff",
                  borderRadius: "2px",
                  position: "absolute",
                  top: "8px",
                  left: "50%",
                  transform: "translateX(-50%)",
                  animation: "scroll 2s infinite"
                }}
              />
            </div>
          </div>
        </section>

        {/* Enhanced Services Section */}
        <section
          ref={servicesRef}
          style={{
            ...sectionStyle,
            padding: "100px 20px",
            background: "linear-gradient(135deg, #020d1f 0%, #041830 50%, #0a1a35 100%)",
            position: "relative",
            overflow: "hidden",
          }}
        >
          {/* Animated background grid */}
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundImage: `
                linear-gradient(rgba(0,255,247,0.03) 1px, transparent 1px),
                linear-gradient(90deg, rgba(0,255,247,0.03) 1px, transparent 1px)
              `,
              backgroundSize: "50px 50px",
              animation: "grid-move 20s linear infinite",
            }}
          />
          
          <h2
            style={{
              fontSize: window.innerWidth < 768 ? "2.5rem" : "3.5rem",
              fontWeight: "900",
              textAlign: "center",
              marginBottom: "20px",
              background: "linear-gradient(45deg, #00fff7, #7dd3fc, #a78bfa)",
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              position: "relative",
              zIndex: 1,
              letterSpacing: "-0.02em"
            }}
          >
            Our Services
          </h2>
          
          <p
            style={{
              textAlign: "center",
              color: "#94a3b8",
              fontSize: "1.2rem",
              marginBottom: "60px",
              maxWidth: "600px",
              margin: "0 auto 60px",
              position: "relative",
              zIndex: 1,
            }}
          >
            Transforming businesses with cutting-edge technology solutions
          </p>

          {/* Custom Slider */}
          <div style={{ position: "relative", overflow: "hidden", padding: "20px 0" }}>
            <div 
              style={{
                display: "flex",
                transform: `translateX(-${currentSlide * (100 / (window.innerWidth < 768 ? 1 : window.innerWidth < 1200 ? 2 : 3))}%)`,
                transition: "transform 0.5s ease-in-out",
                gap: "30px"
              }}
            >
              {services.map((service, idx) => (
                <div 
                  key={idx} 
                  style={{ 
                    minWidth: window.innerWidth < 768 ? "calc(100% - 60px)" : window.innerWidth < 1200 ? "calc(50% - 45px)" : "calc(33.333% - 40px)",
                    margin: "0 20px"
                  }}
                >
                  <div
                    style={{
                      background: "rgba(15,23,42,0.8)",
                      backdropFilter: "blur(20px)",
                      borderRadius: "24px",
                      height: "450px",
                      textAlign: "center",
                      boxShadow: "0 25px 50px rgba(0,0,0,0.3), 0 0 0 1px rgba(255,255,255,0.1)",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "space-between",
                      padding: "40px 30px",
                      transition: "all 0.5s cubic-bezier(0.4, 0, 0.2, 1)",
                      border: "1px solid rgba(0,255,255,0.2)",
                      position: "relative",
                      overflow: "hidden",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = "translateY(-15px) scale(1.02)";
                      e.currentTarget.style.boxShadow = "0 40px 80px rgba(0,255,255,0.2), 0 0 0 1px rgba(0,255,255,0.3)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = "translateY(0) scale(1)";
                      e.currentTarget.style.boxShadow = "0 25px 50px rgba(0,0,0,0.3), 0 0 0 1px rgba(255,255,255,0.1)";
                    }}
                  >
                    {/* Animated top border */}
                    <div
                      style={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        right: 0,
                        height: "4px",
                        background: service.gradient,
                        borderRadius: "24px 24px 0 0",
                      }}
                    />
                    
                    <div>
                      <div 
                        style={{ 
                          fontSize: "4rem", 
                          marginBottom: "20px",
                          filter: "drop-shadow(0 0 15px rgba(0,255,247,0.4))",
                          animation: "pulse 3s ease-in-out infinite"
                        }}
                      >
                        {service.icon}
                      </div>
                      
                      <h3 
                        style={{ 
                          fontSize: "1.8rem", 
                          marginBottom: "15px", 
                          color: "#ffffff", 
                          fontWeight: "700",
                          letterSpacing: "-0.02em"
                        }}
                      >
                        {service.title}
                      </h3>
                      
                      <p 
                        style={{ 
                          color: "#cbd5e1", 
                          fontSize: "1rem", 
                          lineHeight: 1.6,
                          marginBottom: "20px"
                        }}
                      >
                        {service.desc}
                      </p>
                    </div>

                    {/* Tech stack tags */}
                    <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", justifyContent: "center" }}>
                      {service.tech.map((tech, techIdx) => (
                        <span
                          key={techIdx}
                          style={{
                            background: "rgba(0,255,255,0.1)",
                            color: "#00ffff",
                            padding: "4px 12px",
                            borderRadius: "12px",
                            fontSize: "0.8rem",
                            border: "1px solid rgba(0,255,255,0.2)"
                          }}
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Navigation dots */}
            <div style={{ display: "flex", justifyContent: "center", gap: "10px", marginTop: "30px" }}>
              {Array.from({ length: services.length - (window.innerWidth < 768 ? 0 : window.innerWidth < 1200 ? 1 : 2) }).map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentSlide(idx)}
                  style={{
                    width: "12px",
                    height: "12px",
                    borderRadius: "50%",
                    border: "none",
                    background: currentSlide === idx ? "#00ffff" : "rgba(255,255,255,0.3)",
                    cursor: "pointer",
                    transition: "all 0.3s ease",
                    boxShadow: currentSlide === idx ? "0 0 15px #00ffff" : "none"
                  }}
                />
              ))}
            </div>
          </div>
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


import { motion, useAnimation } from "framer-motion";
import Particles from "react-tsparticles";
import { loadSlim } from "tsparticles-slim";
import { useEffect, useState, useCallback } from "react";

export default function App() {
  const particlesInit = useCallback(async (engine) => {
    await loadSlim(engine);
  }, []);

  const sectionStyle = { padding: "80px 20px", maxWidth: "1200px", margin: "0 auto" };
  const headingStyle = { fontSize: "3rem", marginBottom: "40px", fontWeight: 500, color: "#00ffff" };
  const textStyle = { color: "#ddd", fontSize: "1.2rem", lineHeight: 1.6 };
  const buttonStyle = {
    padding: "12px 30px",
    background: "linear-gradient(90deg, #00ffff, #1de9b6)",
    color: "#000",
    fontWeight: "bold",
    border: "none",
    borderRadius: "12px",
    cursor: "pointer",
    fontSize: "1rem",
    boxShadow: "0 0 10px #00ffff, 0 0 20px #1de9b6",
  };

  const headlineStyle = {
    fontSize: "4rem",
    fontWeight: 700,
    textAlign: "center",
    color: "#00ffff",
    textShadow: "0 0 8px #00ffff, 0 0 20px #1de9b6",
    marginBottom: "20px",
  };

  const serviceCards = [
    { title: "Web Development", desc: "Enterprise-grade web apps with scalable architecture.", icon: "💻" },
    { title: "AI & Data Science", desc: "AI solutions and analytics for smarter decisions.", icon: "🤖" },
    { title: "Digital Marketing", desc: "Optimize digital presence with data-driven strategies.", icon: "📈" },
    { title: "Cloud Solutions", desc: "Secure, scalable cloud infrastructure.", icon: "☁️" },
    { title: "UI/UX Design", desc: "Modern, intuitive interfaces.", icon: "🎨" },
  ];

  const [isPaused, setIsPaused] = useState(false);
  const controls = useAnimation();
  const allCards = [...serviceCards, ...serviceCards];

  useEffect(() => {
    if (!isPaused) {
      controls.start({
        x: ["0%", "-50%"],
        transition: { repeat: Infinity, repeatType: "loop", duration: 100, ease: "linear" },
      });
    } else controls.stop();
  }, [isPaused, controls]);

  // Animated gradient for form background
  const [gradient, setGradient] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setGradient(prev => (prev + 1) % 360);
    }, 50);
    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{ position: "relative", minHeight: "100vh", backgroundColor: "#0a0f1f", fontFamily: "'Poppins', sans-serif", overflowX: "hidden" }}>
      {/* Particles Background */}
      <Particles
        id="tsparticles"
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
          interactivity: { events: { onHover: { enable: false }, onClick: { enable: false } } },
          detectRetina: true,
        }}
        style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", zIndex: -1 }}
      />

      {/* Navbar */}
      <nav style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "15px 30px",
        backgroundColor: "rgba(0,0,0,0.85)",
        zIndex: 50,
        flexWrap: "wrap",
      }}>
        <h1 style={{ color: "#00ffff", fontSize: "1.5rem", fontWeight: "bold", textShadow: "0 0 10px #00ffff" }}>Futurify</h1>
        <ul style={{ display: "flex", gap: "20px", listStyle: "none", color: "#fff", flexWrap: "wrap" }}>
          {["Home", "Services", "About", "Features", "Contact"].map((item) => (
            <li key={item} style={{ cursor: "pointer", textShadow: "0 0 5px #00ffff", transition: "0.3s" }}
                onMouseEnter={e => e.target.style.color="#1de9b6"}
                onMouseLeave={e => e.target.style.color="#fff"}
            >
              {item}
            </li>
          ))}
        </ul>
      </nav>

      <div style={{ position: "relative", zIndex: 10 }}>
        {/* Hero + Contact Form */}
        <section style={{
          paddingTop: "120px",
          minHeight: "80vh",
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          alignItems: "center",
          gap: "40px",
        }}>
          {/* Hero Text */}
          <motion.div style={{ flex: "1 1 400px", minWidth: "300px", textAlign: "center" }}
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
          >
            <motion.h2 style={headlineStyle}
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
            >
              Build Your Digital Future
            </motion.h2>
            <motion.p style={{ color: "#ddd", fontSize: "1.3rem", maxWidth: "700px", margin: "0 auto 30px auto" }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 1 }}
            >
              Cutting-edge solutions in <span style={{ color: "#1de9b6" }}>Web Development</span>,{" "}
              <span style={{ color: "#1de9b6" }}>AI & Data Science</span>, and{" "}
              <span style={{ color: "#1de9b6" }}>Digital Marketing</span>.
            </motion.p>
          </motion.div>

          {/* Contact Form */}
          <motion.form style={{
            flex: "1 1 400px",
            minWidth: "300px",
            background: `linear-gradient(135deg, rgba(255,255,255,0.04) ${gradient}%, rgba(255,255,255,0.06) ${gradient + 50}%)`,
            padding: "50px 30px",
            borderRadius: "20px",
            backdropFilter: "blur(12px)",
            color: "#fff",
            display: "flex",
            flexDirection: "column",
            gap: "20px",
            transition: "background 0.3s linear",
          }}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
          >
            <h3 style={{ color: "#1de9b6", marginBottom: "20px", textAlign: "center" }}>Get In Touch</h3>
            <input type="text" placeholder="Name" style={{
              padding: "16px",
              borderRadius: "10px",
              border: "none",
              fontSize: "1rem",
              background: "rgba(255,255,255,0.06)",
              color: "#fff",
              outline: "none"
            }} />
            <input type="email" placeholder="Email" style={{
              padding: "16px",
              borderRadius: "10px",
              border: "none",
              fontSize: "1rem",
              background: "rgba(255,255,255,0.06)",
              color: "#fff",
              outline: "none"
            }} />
            <input type="tel" placeholder="Phone" style={{
              padding: "16px",
              borderRadius: "10px",
              border: "none",
              fontSize: "1rem",
              background: "rgba(255,255,255,0.06)",
              color: "#fff",
              outline: "none"
            }} />
            <button type="submit" style={{
              padding: "14px 0",
              background: "linear-gradient(90deg, #00ffff, #1de9b6)",
              border: "none",
              borderRadius: "12px",
              fontWeight: "bold",
              color: "#000",
              fontSize: "1rem",
              cursor: "pointer",
              boxShadow: "0 0 15px #00ffff, 0 0 25px #1de9b6",
            }}>Submit</button>
          </motion.form>
        </section>

        {/* Services Slider */}
        <section style={{ ...sectionStyle, overflow: "hidden", position: "relative" }}>
          <h3 style={headingStyle}>Our Services</h3>
          <div
            style={{ display: "flex", perspective: "1200px" }}
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            <motion.div style={{ display: "flex", gap: "30px" }} animate={controls}>
              {allCards.map((service, idx) => (
                <motion.div
                  key={idx}
                  style={{
                    background: "linear-gradient(135deg, #0ff, #1de9b6)",
                    padding: "30px",
                    borderRadius: "20px",
                    minWidth: "250px",
                    maxWidth: "300px",
                    textAlign: "center",
                    boxShadow: "0 0 30px rgba(0,255,255,0.4), 0 0 40px rgba(29,233,182,0.3)",
                    color: "#000",
                    fontWeight: "500",
                    cursor: "pointer",
                    transformStyle: "preserve-3d",
                  }}
                  whileHover={{ scale: 1.08, boxShadow: "0 0 35px #00ffff, 0 0 45px #1de9b6", rotateY: 5 }}
                >
                  <div style={{ fontSize: "3rem", marginBottom: "15px" }}>{service.icon}</div>
                  <h4 style={{ fontSize: "1.5rem", marginBottom: "15px" }}>{service.title}</h4>
                  <p style={{ color: "#000" }}>{service.desc}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* About Section */}
        <section style={{ ...sectionStyle, display: "flex", flexWrap: "wrap", alignItems: "center", gap: "40px" }}>
          <motion.img
            src="https://source.unsplash.com/500x400/?technology,futuristic"
            alt="About"
            style={{ borderRadius: "20px", maxWidth: "500px", flex: "1 1 400px" }}
            initial={{ opacity: 0, x: -100 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
          />
          <motion.div
            style={{ flex: "1 1 400px" }}
            initial={{ opacity: 0, x: 100 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
          >
            <h3 style={{ fontSize: "3rem", marginBottom: "20px", color: "#00ffff" }}>Who We Are</h3>
            <p style={textStyle}>
              We are innovators, developers, and strategists passionate about transforming businesses
              with futuristic technology. Stay ahead in the digital era with our solutions.
            </p>
            <div style={{ marginTop: "20px" }}>
              <h4 style={{ color: "#1de9b6", marginBottom: "10px" }}>Our Mission</h4>
              <p style={textStyle}>Deliver enterprise-grade solutions that empower businesses globally with cutting-edge technology.</p>
              <h4 style={{ color: "#1de9b6", marginTop: "20px", marginBottom: "10px" }}>Our Vision</h4>
              <p style={textStyle}>Be the leading futuristic tech partner for enterprises worldwide.</p>
            </div>
          </motion.div>
        </section>

        {/* Features Section */}
        <section style={{ ...sectionStyle, backgroundColor: "#0c132b", borderRadius: "20px", marginBottom: "40px" }}>
          <h3 style={headingStyle}>Why Choose Us</h3>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "30px", justifyContent: "center" }}>
            {[
              { title: "Innovation", icon: "🚀", desc: "Pushing boundaries with latest tech." },
              { title: "Scalability", icon: "📈", desc: "Solutions that grow with your business." },
              { title: "Security", icon: "🔒", desc: "Enterprise-grade data protection." },
              { title: "Support", icon: "🛠️", desc: "24/7 dedicated technical assistance." },
            ].map((feature, idx) => (
              <motion.div
                key={idx}
                style={{
                  backgroundColor: "#111",
                  padding: "30px",
                  borderRadius: "20px",
                  minWidth: "250px",
                  textAlign: "center",
                  boxShadow: "0 0 20px rgba(0,255,255,0.3)",
                }}
                whileHover={{ scale: 1.05, boxShadow: "0 0 35px #00ffff, 0 0 45px #1de9b6" }}
              >
                <div style={{ fontSize: "3rem", marginBottom: "15px" }}>{feature.icon}</div>
                <h4 style={{ fontSize: "1.5rem", marginBottom: "15px", color: "#1de9b6" }}>{feature.title}</h4>
                <p style={{ color: "#ddd" }}>{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Footer */}
        <footer style={{ padding: "40px 20px", textAlign: "center", borderTop: "1px solid #333", color: "#888", backgroundColor: "#0a0f1f" }}>
          <p>© 2025 Futurify. All rights reserved.</p>
          <div style={{ marginTop: "10px", display: "flex", gap: "20px", justifyContent: "center" }}>
            {["🌐","🐦","💼"].map((icon, idx) => (
              <span key={idx} style={{ fontSize: "1.5rem", color: "#00ffff", textShadow: "0 0 8px #00ffff", cursor: "pointer" }}
                    onMouseEnter={e => e.style.color="#1de9b6"}
                    onMouseLeave={e => e.style.color="#00ffff"}
              >{icon}</span>
            ))}
          </div>
        </footer>
      </div>
    </div>
  );
}

import Particles from "react-tsparticles";
import { loadSlim } from "tsparticles-slim";
import { useCallback } from "react";

export default function Projects() {
  // Particles init
  const particlesInit = useCallback(async (engine) => {
    await loadSlim(engine);
  }, []);

  return (
    <div className="relative min-h-screen bg-gray-950 text-white overflow-hidden">
      {/* Background Particles */}
      <Particles
        id="tsparticles"
        init={particlesInit}
        options={{
          background: { color: { value: "#0f0f0f" } },
          particles: {
            number: { value: 50 },
            size: { value: 3 },
            move: { enable: true, speed: 1 },
            color: { value: "#00f5d4" },
            links: { enable: true, color: "#00f5d4" },
          },
        }}
        className="absolute inset-0 -z-10"
      />

      {/* Header */}
      <div className="text-center py-16">
        <h1 className="text-5xl font-extrabold tracking-wide">
          🚀 Our Projects
        </h1>
        <p className="mt-4 text-lg text-gray-300">
          Showcasing some of our futuristic work that blends innovation,
          creativity, and results.
        </p>
      </div>

      {/* Projects Grid */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 px-6 pb-20">
        {/* Project Card */}
        <div className="bg-gray-900 p-6 rounded-2xl shadow-lg border border-gray-800 hover:border-cyan-400 hover:shadow-cyan-400/30 transition">
          <h2 className="text-2xl font-semibold mb-3 text-cyan-400">
            AI-Powered Portfolio
          </h2>
          <p className="text-gray-300 mb-4">
            A sleek, futuristic portfolio website built for a tech founder,
            integrating AI chatbots to interact with visitors.
          </p>
          <p className="text-sm text-gray-500">Tech: React, Tailwind, OpenAI API</p>
        </div>

        {/* Project Card */}
        <div className="bg-gray-900 p-6 rounded-2xl shadow-lg border border-gray-800 hover:border-cyan-400 hover:shadow-cyan-400/30 transition">
          <h2 className="text-2xl font-semibold mb-3 text-cyan-400">
            Startup Automation Suite
          </h2>
          <p className="text-gray-300 mb-4">
            A business automation tool for startups to manage leads, invoices,
            and tasks—all in one futuristic dashboard.
          </p>
          <p className="text-sm text-gray-500">Tech: Next.js, Node.js, MongoDB</p>
        </div>

        {/* Project Card */}
        <div className="bg-gray-900 p-6 rounded-2xl shadow-lg border border-gray-800 hover:border-cyan-400 hover:shadow-cyan-400/30 transition">
          <h2 className="text-2xl font-semibold mb-3 text-cyan-400">
            Futuristic E-Commerce
          </h2>
          <p className="text-gray-300 mb-4">
            Designed a next-gen e-commerce store with 3D product previews,
            instant checkout, and AI-based recommendations.
          </p>
          <p className="text-sm text-gray-500">Tech: React, Stripe, Three.js</p>
        </div>

        {/* Add more projects below as needed */}
      </div>
    </div>
  );
}

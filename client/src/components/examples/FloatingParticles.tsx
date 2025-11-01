import { FloatingParticles } from "../FloatingParticles";

export default function FloatingParticlesExample() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-pink-900 relative">
      <FloatingParticles />
      <div className="relative z-10 flex items-center justify-center h-screen">
        <p className="text-white text-2xl">Floating Particles Background</p>
      </div>
    </div>
  );
}

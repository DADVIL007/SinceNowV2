import { Confetti } from "../Confetti";

export default function ConfettiExample() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-pink-900">
      <Confetti />
      <div className="flex items-center justify-center h-screen">
        <h1 className="text-white text-4xl font-poppins">Confetti Effect!</h1>
      </div>
    </div>
  );
}

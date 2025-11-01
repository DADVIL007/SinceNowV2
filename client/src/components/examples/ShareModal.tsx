import { ShareModal } from "../ShareModal";

export default function ShareModalExample() {
  const mockEvent = {
    id: "1",
    name: "Quit Smoking",
    date: new Date(Date.now() - 142 * 24 * 60 * 60 * 1000),
    mode: "since" as const,
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-pink-900">
      <ShareModal
        event={mockEvent}
        onClose={() => console.log("Close modal")}
      />
    </div>
  );
}

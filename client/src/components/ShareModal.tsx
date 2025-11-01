import { X, Copy, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

type EventMode = "since" | "until";

interface Event {
  id: string;
  name: string;
  date: Date;
  mode: EventMode;
}

interface ShareModalProps {
  event: Event;
  onClose: () => void;
}

export function ShareModal({ event, onClose }: ShareModalProps) {
  const [copied, setCopied] = useState(false);

  const getDaysCount = () => {
    const now = new Date();
    const eventDate = new Date(event.date);
    const diffMs = event.mode === "since"
      ? now.getTime() - eventDate.getTime()
      : eventDate.getTime() - now.getTime();
    return Math.floor(Math.abs(diffMs) / (1000 * 60 * 60 * 24));
  };

  const getShareText = () => {
    const days = getDaysCount();
    const formattedDate = new Date(event.date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });

    if (event.mode === "since") {
      return `✨ ${days} days strong since ${event.name}! Started on ${formattedDate}. Track your moments with SinceNow.`;
    } else {
      return `🎯 Only ${days} days until ${event.name}! Coming on ${formattedDate}. Track your moments with SinceNow.`;
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(getShareText());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4" onClick={onClose}>
      <div 
        className="backdrop-blur-3xl bg-white/10 dark:bg-white/5 border border-white/20 dark:border-white/10 rounded-3xl p-8 max-w-md w-full shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-poppins font-semibold text-foreground">Share Your Moment</h2>
          <Button
            size="icon"
            variant="ghost"
            onClick={onClose}
            className="rounded-full"
            data-testid="button-close-modal"
          >
            <X className="h-5 w-5" />
          </Button>
        </div>

        <div className="backdrop-blur-xl bg-white/10 dark:bg-white/5 border border-white/20 dark:border-white/10 rounded-2xl p-6 mb-6">
          <p className="text-foreground font-inter text-center leading-relaxed" data-testid="text-share-content">
            {getShareText()}
          </p>
        </div>

        <Button
          onClick={handleCopy}
          className="w-full rounded-full py-6 text-lg font-poppins font-medium bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 hover:from-purple-600 hover:via-pink-600 hover:to-blue-600 transition-all duration-300"
          data-testid="button-copy-text"
        >
          {copied ? (
            <>
              <Check className="h-5 w-5 mr-2" />
              Copied!
            </>
          ) : (
            <>
              <Copy className="h-5 w-5 mr-2" />
              Copy to Clipboard
            </>
          )}
        </Button>
      </div>
    </div>
  );
}

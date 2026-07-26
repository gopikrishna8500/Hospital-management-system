import React from "react";
import { ArrowUp } from "lucide-react";

const ScrollToTopButton = () => {
  return (
    <button
      onClick={() =>
        window.scrollTo({
          top: 0,
          behavior: "smooth",
        })
      }
      className="fixed bottom-6 right-6 z-50 w-12 h-12 bg-teal-700 hover:bg-teal-600 text-white rounded-full shadow-lg flex items-center justify-center transition-all duration-300"
      title="Scroll to Top"
    >
      <ArrowUp size={20} />
    </button>
  );
};

export default ScrollToTopButton;
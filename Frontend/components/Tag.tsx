import { useState } from "react";
export function Tag({ text }: { text: string }) {
  // Use a simple boolean since this state is local to THIS specific tag
  const [isToggled, setIsToggled] = useState(false);

  return (
    <div>
      <div
        onClick={() => setIsToggled(!isToggled)}
        className={`
          cursor-pointer border rounded-2xl w-20 h-10 transition-colors duration-200 
          flex justify-center items-center text-center select-none
          ${isToggled
            ? "bg-emerald-700 text-white border-green-500" 
            : "bg-white text-green-600 border-green-200 hover:bg-green-100"
          }
        `}
      >
        {text}
      </div>
    </div>
  );
}
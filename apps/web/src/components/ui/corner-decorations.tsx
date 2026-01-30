import React from "react";

export const CornerDecorations: React.FC = () => {
  return (
    <div className="pointer-events-none absolute inset-0 z-20">
      {/* Top Left */}
      <div className="absolute -top-1.5 -left-1.5 h-6 w-6 border-t-2 border-l-2 border-zinc-600" />

      {/* Top Right */}
      <div className="absolute -top-1.5 -right-1.5 h-6 w-6 border-t-2 border-r-2 border-zinc-600" />

      {/* Bottom Left */}
      <div className="absolute -bottom-1.5 -left-1.5 h-6 w-6 border-b-2 border-l-2 border-zinc-600" />

      {/* Bottom Right */}
      <div className="absolute -right-1.5 -bottom-1.5 h-6 w-6 border-r-2 border-b-2 border-zinc-600" />
    </div>
  );
};

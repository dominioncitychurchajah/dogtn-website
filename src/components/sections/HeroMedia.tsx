"use client";

import * as React from "react";
import Image from "next/image";

const poster = "/images/pastor/hero-preaching-stage.png";

type NavigatorConnection = {
  effectiveType?: string;
  saveData?: boolean;
  addEventListener?: (type: string, listener: () => void) => void;
  removeEventListener?: (type: string, listener: () => void) => void;
};

export function HeroMedia() {
  const [videoEnabled, setVideoEnabled] = React.useState(false);

  React.useEffect(() => {
    const mediaQuery = window.matchMedia("(min-width: 768px)");
    const connection = (navigator as Navigator & { connection?: NavigatorConnection }).connection;
    const slowNetwork = connection?.saveData || connection?.effectiveType === "slow-2g" || connection?.effectiveType === "2g";

    function updateVideoPolicy() {
      setVideoEnabled(mediaQuery.matches && !slowNetwork);
    }

    updateVideoPolicy();
    mediaQuery.addEventListener("change", updateVideoPolicy);
    connection?.addEventListener?.("change", updateVideoPolicy);

    return () => {
      mediaQuery.removeEventListener("change", updateVideoPolicy);
      connection?.removeEventListener?.("change", updateVideoPolicy);
    };
  }, []);

  return (
    <div className="absolute inset-0">
      <Image
        src={poster}
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />
      {videoEnabled && (
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          poster={poster}
          aria-hidden="true"
          className="absolute inset-0 h-full w-full object-cover"
        >
          <source src="/video/home-hero.mp4" type="video/mp4" />
        </video>
      )}
      {/* Keep the copy legible over both the poster and moving footage. */}
      <div className="absolute inset-0 bg-gradient-to-r from-ink-900 via-ink-900/75 to-ink-900/20" />
      <div className="absolute inset-0 bg-gradient-to-t from-ink-900/60 via-transparent to-ink-900/30" />
    </div>
  );
}

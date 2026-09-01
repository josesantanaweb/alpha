import type { ReactElement } from "react";
import Image from "next/image";
import { SOCIAL_LINKS } from "@/constants";

export const SocialLinks = (): ReactElement => (
  <div className="flex items-center gap-3">
    {SOCIAL_LINKS.map((link) => (
      <a
        key={link.key}
        href={link.href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={link.label}
        className="bg-surface border-stroke hover:bg-surface/80 flex h-10 w-10 items-center justify-center rounded-full border transition-colors cursor-pointer"
      >
        <Image
          src={link.image}
          alt={link.label}
          width={100}
          height={100}
          className="h-5 w-5"
        />
      </a>
    ))}
  </div>
);
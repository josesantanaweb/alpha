import Image from "next/image";
import type { ReactElement } from "react";

interface PerfumeImageProps {
  src: string | null;
  alt: string;
}

export const PerfumeImage = ({ src, alt }: PerfumeImageProps): ReactElement => (
  <div className="relative z-10 w-35">
    <Image
      width={400}
      height={400}
      alt={alt}
      src={src || "/images/versache.png"}
      className="h-full w-full object-cover"
    />
  </div>
);

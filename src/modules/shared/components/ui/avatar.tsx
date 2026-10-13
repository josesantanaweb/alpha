import Image from "next/image";
import { cn } from "@/modules/shared/utils/cn";

interface AvatarProps {
  src?: string | null;
  name?: string | null;
  size?: number;
  className?: string;
}

export const Avatar = ({ src, name, size = 40, className }: AvatarProps) => {
  const style = {
    width: size,
    height: size,
    fontSize: Math.round(size * 0.4),
  };
  const initial = (name?.trim().charAt(0) ?? "?").toUpperCase();

  const containerClass = cn(
    "shrink-0 rounded-full border border-stroke font-semibold inline-flex items-center justify-center overflow-hidden",
    "bg-surface text-white",
    className
  );

  return (
    <span style={style} className={containerClass}>
      {src ? (
        <Image
          src={src}
          alt={name ?? "Avatar"}
          width={size}
          height={size}
          style={{ width: "100%", height: "100%" }}
          className="object-cover"
        />
      ) : (
        <span className="flex items-center justify-center w-full h-full">
          {initial}
        </span>
      )}
    </span>
  );
};

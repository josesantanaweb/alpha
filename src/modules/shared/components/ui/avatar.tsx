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

  if (src) {
    return (
      <Image
        src={src}
        alt={name ?? "Avatar"}
        width={size}
        height={size}
        style={style}
        className={cn("shrink-0 rounded-full object-cover", className)}
      />
    );
  }

  const initial = (name?.trim().charAt(0) ?? "?").toUpperCase();

  return (
    <span
      style={style}
      className={cn(
        "bg-surface text-white flex shrink-0 items-center justify-center rounded-full border border-stroke font-semibold",
        className
      )}
    >
      {initial}
    </span>
  );
};
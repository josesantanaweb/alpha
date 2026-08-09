"use client";
import type { ReactElement } from "react";
import Link from "next/link";
import Image from "next/image";
import { Calendar } from "lucide-react";

type PostCardProps = {
  image: string;
  title: string;
  date: string;
  excerpt: string;
  href: string;
};

export const PostCard = ({
  image,
  title,
  date,
  excerpt,
  href,
}: PostCardProps): ReactElement => {
  return (
    <div className="bg-surface border-stroke relative overflow-hidden rounded-lg border">
      <div className="h-48 w-full overflow-hidden bg-red-100">
        <Image
          src={image}
          alt={title}
          width={400}
          height={400}
          className="h-full w-full object-cover grayscale-70"
        />
      </div>
      <div className="flex flex-col gap-1 p-5">
        <h4 className="truncate text-lg font-bold text-white">
          {title}
        </h4>
        <div className="flex items-center gap-1 mb-2">
          <Calendar size={14} className="text-body" />
          <p className="text-body text-xs">{date}</p>
        </div>
        <p className="text-body text-sm italic">{excerpt}</p>
        <Link href={href} className="mt-3 text-sm font-bold text-white">
          Ver más
        </Link>
      </div>
    </div>
  );
};

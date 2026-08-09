"use client";
import type { ReactElement } from "react";
import Link from "next/link";
import Image from "next/image";

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
    <div className="relative overflow-hidden rounded-lg bg-surface border border-stroke">
      <div className="w-full h-48 bg-red-100 overflow-hidden">
        <Image
          src={image}
          alt={title}
          width={400}
          height={400}
          className="object-cover w-full h-full"
        />
      </div>
      <div className="flex flex-col gap-1 p-5">
        <h4 className="text-base text-white font-bold">{title}</h4>
        <p className="text-sm text-body italic">{date}</p>
        <p className="text-sm text-body">{excerpt}</p>
        <Link href={href} className="text-sm text-white font-bold mt-3">
          Ver más
        </Link>
      </div>
    </div>
  );
};

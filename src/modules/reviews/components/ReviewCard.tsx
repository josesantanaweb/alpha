import type { ReactElement } from "react";
import { Star } from "lucide-react";
import type { ReviewWithUser } from "../types";

interface ReviewCardProps {
  review?: ReviewWithUser;
}

export const ReviewCard = ({ review }: ReviewCardProps): ReactElement => {
  const userName = review?.user?.name ?? "Jose Santana";
  const userInitial = userName.charAt(0).toUpperCase();
  const title = review?.title ?? "Slightly Mysterious";
  const comment =
    review?.comment ??
    "I absolutely love Guidance! The hazelnut and vanilla combo is to die for—it’s like a warm hug in a bottle. The way it blends with the sandalwood gives it this unique depth that I can’t get enough of. Definitely lasts all day on my skin too, which is a plus. Perfect for fall/winter nights out or just chilling at home.";
  const rating = review?.rating ?? 5;
  const dateStr = review?.createdAt
    ? new Date(review.createdAt).toLocaleDateString("es-ES", {
        day: "numeric",
        month: "long",
        year: "numeric",
      })
    : "12 Julio 2026";

  return (
    <div className="border-stroke flex w-full flex-col gap-3 border-b py-3">
      <div className="flex w-full items-center gap-3">
        {review?.user?.avatar ? (
          <img
            src={review.user.avatar}
            alt={userName}
            className="h-10 w-10 rounded-full object-cover"
          />
        ) : (
          <span className="bg-white text-surface flex h-10 w-10 items-center justify-center rounded-full text-lg font-semibold">
            {userInitial}
          </span>
        )}
        <div className="flex flex-col">
          <h4 className="text-base font-semibold text-white">{userName}</h4>
          <p className="text-body text-sm">{dateStr}</p>
        </div>
      </div>
      <div className="flex flex-col gap-3 pl-14">
        <div className="flex flex-col gap-2">
          {title && <h5 className="text-sm font-semibold text-white">{title}</h5>}
          <p className="text-body text-xs">{comment}</p>
        </div>
        <div className="flex items-center gap-1">
          {Array.from({ length: 5 }).map((_, index) => (
            <Star
              key={index}
              className="text-yellow-500"
              size={14}
              fill={index < rating ? "currentColor" : "none"}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

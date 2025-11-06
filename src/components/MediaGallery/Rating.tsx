import { StarIcon } from "lucide-react";

interface RatingStarsProps {
    rating: number; // 1 ~ 5
    size?: number;
}

const RatingStars = ({ rating, size = 13 }: RatingStarsProps) => {
    return (
        <div className="flex w-28 m-auto mb-2">
            {Array.from({ length: 5 }, (_, i) => {
                const filled = i < rating;
                return (
                    <StarIcon
                        key={i}
                        size={size}
                        className={`${filled
                                ? "text-yellow-400 fill-yellow-400"
                                : "text-yellow-400"
                            }`}
                    />
                );
            })}
        </div>
    );
};

export default RatingStars;

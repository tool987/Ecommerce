import React from "react";

interface ReviewCardProps {
  username: string;
  rating: number; // out of 5
  comment: string;
  date: string;
}

const ReviewCard: React.FC<ReviewCardProps> = ({ username, rating, comment, date }) => {
  return (
    <div className="border p-4 rounded-md shadow-sm mb-3">
      <div className="flex justify-between items-center mb-2">
        <h4 className="font-semibold">{username}</h4>
        <span className="text-yellow-500">{'★'.repeat(rating)}{'☆'.repeat(5 - rating)}</span>
      </div>
      <p className="text-gray-700">{comment}</p>
      <p className="text-gray-400 text-sm mt-2">{date}</p>
    </div>
  );
};

export default ReviewCard;

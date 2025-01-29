import React from 'react';

interface TechCardProps {
    title: string;
    image: string;
    description: string;
    rating: number;
}

export default function TechCard({ title, image, description, rating }: TechCardProps) {
    return (
        <div className="bg-white rounded-lg shadow-md p-4">
            <img
                src={image}
                alt={title}
                className="mx-auto w-24 h-24 object-contain"
            />
            <h3 className="text-xl font-bold text-center mt-4">{title}</h3>
            <p className="text-gray-600 text-center mt-2">{description}</p>
            <p className="text-yellow-500 text-center font-semibold mt-4">
                {'★'.repeat(rating)}
            </p>
        </div>
    );
}

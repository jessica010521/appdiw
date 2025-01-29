'use client';

import Image from 'next/image';

interface CardProps {
    title: string;
    description: string;
    price: number;
    image: string;
}

export default function Card({ title, description, price, image }: CardProps) {
    return (
        <div className="bg-white rounded-lg shadow-lg p-4">
            <Image
                src={image}
                alt={title}
                width={200}
                height={200}
                className="rounded-md mx-auto"
            />
            <h3 className="text-xl font-bold text-center mt-4">{title}</h3>
            <p className="text-gray-600 text-center">{description}</p>
            <p className="text-orange-500 font-semibold text-center mt-2">
                {price.toFixed(2)} €
            </p>
        </div>
    );
}

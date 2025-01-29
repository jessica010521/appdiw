'use client';

import React from 'react';
import tecnologias from '@/app/data/tecnologias.json';
import TechCard from '@/components/TechCard';

export default function Tecnologias() {
    return (
        <main >
        <div className="p-6 max-w-7xl mx-auto">
            <h1 className="text-3xl font-bold text-center mb-6">Tecnologias Aprendidas</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10 p-10 max-w-7xl mx-auto">
            {tecnologias.map((tecnologia) => (
                    <TechCard
                        key={tecnologia.title}
                        title={tecnologia.title}
                        image={tecnologia.image}
                        description={tecnologia.description}
                        rating={tecnologia.rating}
                    />
                ))}
            </div>
        </div>
        </main>
    );
}

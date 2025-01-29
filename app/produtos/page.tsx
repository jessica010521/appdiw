'use client';

import React from 'react';
import useSWR from 'swr';
import { Produto } from '../models/interfaces';
import Card from '../../components/Card';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function Produtos() {
    const { data, error, isLoading } = useSWR<Produto[]>('https://deisishop.pythonanywhere.com/products/', fetcher);

    if (isLoading) return <p className="text-center text-gray-500">A carregar os produtos...</p>;
    if (error) return <p className="text-center text-red-500">Erro ao carregar os produtos.</p>;
    if (!data || data.length === 0) return <p className="text-center text-gray-500">Nenhum produto encontrado.</p>;

    return (
        <main>
<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10 p-10 max-w-7xl mx-auto">
{data.map((produto) => (
                <Card
                    key={produto.id}
                    title={produto.title}
                    description={produto.description}
                    price={produto.price}
                    image={produto.image}
                />
            ))}
        </div>
        </main>
    );
}

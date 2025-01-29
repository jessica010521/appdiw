'use client';

import Image from 'next/image';
import styles from './Card.module.css';
import { ReactNode } from 'react';

interface CardProps {
  title: string;
  description: string;
  price: number;
  image: string;
  onAddToCart?: () => void; // Tornar opcional para produtos
  children?: ReactNode; // Para o botão personalizado no Carrinho
}

export default function Card({ title, description, price, image, onAddToCart, children }: CardProps) {
  return (
    <div className={styles.card}>
      <Image
        src={image}
        alt={title}
        width={300}
        height={300}
        className={styles.cardImage}
      />
      <h3 className={styles.cardTitle}>{title}</h3>
      <p className={styles.cardDescription}>{description}</p>
      <p className={styles.cardPrice}>{price.toFixed(2)} €</p>
      {/* Priorizar o botão "children" para o Carrinho */}
      {children ? (
        <div className="mt-4">{children}</div>
      ) : (
        // Botão "Adicionar ao Carrinho" para Produtos
        onAddToCart && (
          <button
            className={styles.cardButton}
            onClick={onAddToCart}
          >
            Adicionar ao Carrinho
          </button>
        )
      )}
    </div>
  );
}

'use client';

import React, { useState, useEffect } from 'react';
import Card from '../../components/Card/Card';
import { Produto } from '../models/interfaces';

export default function Produtos() {
    const [produtos, setProdutos] = useState<Produto[]>([]);
    const [produtosFiltrados, setProdutosFiltrados] = useState<Produto[]>([]);
    const [carrinho, setCarrinho] = useState<Produto[]>([]);
    const [categoria, setCategoria] = useState('all');
    const [ordenarPor, setOrdenarPor] = useState('nenhum');
    const [pesquisa, setPesquisa] = useState('');

    // Fetch dos produtos na API
    useEffect(() => {
        fetch('https://deisishop.pythonanywhere.com/products/')
            .then((res) => res.json())
            .then((data) => {
                setProdutos(data);
                setProdutosFiltrados(data);
            })
            .catch((err) => console.error('Erro ao buscar produtos:', err));
    }, []);

    // Atualizar a lista de produtos com base nos filtros
    useEffect(() => {
        let lista = [...produtos];

         // Filtrar por categoria (verifica os valores reais das categorias na API)
         if (categoria !== 'all') {
            lista = lista.filter((produto) =>
              produto.category.toLowerCase() === categoria.toLowerCase()
            );
          }

        // Filtrar por nome
        if (pesquisa.trim() !== '') {
            lista = lista.filter((produto) =>
                produto.title.toLowerCase().includes(pesquisa.toLowerCase())
            );
        }

        // Ordenar por preço
        if (ordenarPor === 'crescente') {
            lista.sort((a, b) => a.price - b.price);
        } else if (ordenarPor === 'decrescente') {
            lista.sort((a, b) => b.price - a.price);
        }

        setProdutosFiltrados(lista);
    }, [categoria, pesquisa, ordenarPor, produtos]);

    // Adicionar produto ao carrinho
    const adicionarAoCarrinho = (produto: Produto) => {
        setCarrinho((prevCarrinho) => [...prevCarrinho, produto]);
    };

    //remover do carrinho 
    const removerDoCarrinho = (index: number) => {
        setCarrinho((prevCarrinho) => prevCarrinho.filter((_, i) => i !== index));
      };
      

    // Finalizar compra
    const comprar = () => {
        if (carrinho.length === 0) {
            alert('O carrinho está vazio! Adicione produtos antes de comprar.');
            return;
        }
    
        // Coleta os IDs dos produtos do carrinho
        const productIds = carrinho.map((produto) => produto.id);
    
        // Dados do estudante e cupom (podes ajustar se tiveres inputs específicos)
        const isEstudante = false; // Define false por padrão (ou adiciona lógica para verificar)
        const cupom = ''; // Adiciona lógica se quiseres permitir cupões
    
        // Payload da compra
        const payload = {
            products: productIds,
            student: isEstudante,
            coupon: cupom,
        };
    
        // Faz o POST para o endpoint da API
        fetch('https://deisishop.pythonanywhere.com/buy', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            body: JSON.stringify(payload),
        })
            .then(async (response) => {
                let data;
                try {
                    data = await response.json();
                } catch (e) {
                    data = { error: 'Resposta inválida da API.' };
                }
    
                if (response.ok) {
                    mostrarSucesso(data);
                } else {
                    mostrarErro(data.error || 'Ocorreu um erro inesperado.');
                }
            })
            .catch((error) => {
                console.error('Erro ao finalizar a compra:', error);
                mostrarErro('Erro ao finalizar a compra. Tente novamente.');
            });
    };
    
    // Mensagem de sucesso
    const mostrarSucesso = (data: { totalCost: number; reference: string }) => {
        const { totalCost, reference } = data;
        alert(
            `Compra realizada com sucesso! 🎉\n\nValor Final: ${totalCost} €\nReferência de Pagamento: ${reference}`
        );
        setCarrinho([]); // Limpa o carrinho após a compra
    };
    
    // Mensagem de erro
    const mostrarErro = (mensagem: string) => {
        alert(`Erro ao finalizar a compra: ${mensagem}`);
    };
    

    return (
        <main className="p-6">
            <div className="mb-6">
                <h1 className="text-2xl font-bold text-center mb-4">Loja de Produtos</h1>
                {/* Filtros */}
                <div className="flex flex-wrap justify-center gap-4 mb-6">
  <select
    className="p-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-pink-500"
    value={categoria}
    onChange={(e) => setCategoria(e.target.value)}
  >
    <option value="all">Todas as Categorias</option>
    <option value="electronics">Eletrónicos</option>
    <option value="clothing">Roupas</option>
  </select>
  <select
    className="p-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-pink-500"
    value={ordenarPor}
    onChange={(e) => setOrdenarPor(e.target.value)}
  >
    <option value="nenhum">Ordenar por Preço</option>
    <option value="crescente">Preço Crescente</option>
    <option value="decrescente">Preço Decrescente</option>
  </select>
  <input
    type="text"
    className="p-2 border border-gray-300 rounded-lg shadow-sm w-64 focus:outline-none focus:ring-2 focus:ring-pink-500"
    placeholder="Procurar Produto"
    value={pesquisa}
    onChange={(e) => setPesquisa(e.target.value)}
  />
</div>

            </div>

            {/* Lista de Produtos */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {produtosFiltrados.map((produto) => (
                    <Card
                    key={produto.id}
                    title={produto.title}
                    description={produto.description}
                    price={produto.price}
                    image={produto.image}
                    onAddToCart={() => adicionarAoCarrinho(produto)}
                  />
                  
                  
                ))}
            </div>

            {/* Carrinho */}
            <div className="mt-6 bg-pink-50 rounded-xl shadow-lg p-6">
  <h2 className="text-xl font-bold text-pink-800 text-center mb-4">Cesto</h2>
  {carrinho.length === 0 ? (
    <p className="text-center text-gray-500">O carrinho está vazio. Adicione produtos para comprar!</p>
  ) : (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {carrinho.map((item, index) => (
        <Card
          key={index}
          title={item.title}
          description={item.description}
          price={item.price}
          image={item.image}
        >
      <button
  className="btn-remove"
  onClick={() => removerDoCarrinho(index)}
>
  Remover
</button>


        </Card>
      ))}
    </div>
  )}
</div>



            {/* Resumo do pagamento */}
            <div className="mt-6 bg-pink-100 rounded-xl shadow-lg p-6">
  <h2 className="text-2xl font-bold text-center text-pink-800 mb-4">Resumo do Pagamento</h2>
  <p className="text-center text-lg font-semibold text-pink-700">
    Custo total: {carrinho.reduce((total, item) => total + item.price, 0).toFixed(2)} €
  </p>
  <div className="mt-4 flex items-center justify-between">
    <label className="text-pink-700 font-medium flex items-center">
      <input type="checkbox" className="mr-2" /> És estudante do DEISI?
    </label>
  </div>
  <div className="mt-4">
    <label htmlFor="cupom" className="block text-pink-700 font-medium">Cupão de desconto:</label>
    <input
      id="cupom"
      type="text"
      className="w-full p-2 border border-pink-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
      placeholder="Insira o seu cupão"
    />
  </div>
  <button
    className="mt-6 bg-pink-500 hover:bg-pink-600 text-white font-bold py-2 px-4 rounded-lg w-full transition-all duration-300"
    onClick={comprar}
  >
    Comprar
  </button>
</div>

        </main>
    );
}

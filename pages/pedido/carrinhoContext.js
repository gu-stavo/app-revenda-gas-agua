import React, { createContext, useContext, useState } from 'react';

// Criação do contexto
const CarrinhoContext = createContext();

// Provedor do contexto
export const CarrinhoProvider = ({ children }) => {
    const [carrinho, setCarrinho] = useState([]);

    const adicionarAoCarrinho = (produto, quantidade) => {
        const novoProduto = { ...produto, quantidade }; // Adiciona a quantidade ao produto
        setCarrinho((prev) => [...prev, novoProduto]); // Adiciona o novo produto ao carrinho
    };

    const calcularTotal = () => {
        const subtotal = carrinho.reduce((acc, item) => acc + item.preco * item.quantidade, 0);
        const taxaEntrega = 5.00; // Taxa fixa de entrega
        return subtotal + taxaEntrega;
    };

    return (
        <CarrinhoContext.Provider value={{ carrinho, setCarrinho, adicionarAoCarrinho, calcularTotal }}>
            {children}
        </CarrinhoContext.Provider>
    );
};

// Hook para usar o contexto
export const useCarrinho = () => {
    return useContext(CarrinhoContext);
};

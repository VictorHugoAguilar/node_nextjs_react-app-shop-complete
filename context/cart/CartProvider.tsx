import { FC, useReducer } from 'react';
import { ICartProduct } from '../../interfaces';
import { cartReducer, CartContext } from './';

export interface CartState {
    cart: ICartProduct[];
}

const CART_INITIAL_STATE: CartState = {
    cart: []
}

interface Props {
    children: React.ReactNode;
}

export const CartProvider: FC<Props> = ({ children }) => {

    const [state, dispatch] = useReducer(cartReducer, CART_INITIAL_STATE);

    const addProductToCart = (product: ICartProduct) => {
        // NIVEL 1
        // dispatch({ type: '[Cart] - Add Product', payload: product });

        // NIVEL 2
        // const productsInCart = state.cart.filter(p => p._id !== product._id && p.size !== product.size);
        // dispatch({ type: '[Cart] - Add Product', payload: [...productsInCart, product] });

        // NIVEL 3
        const productInCart = state.cart.some(p => p._id === product._id);
        if (!productInCart) return dispatch({ type: '[Cart] - Update products in cart', payload: [...state.cart, product] })

        const productInCartButDifferentSize = state.cart.some(p => p._id === product._id && p.size === product.size);
        if (!productInCartButDifferentSize) return dispatch({ type: '[Cart] - Update products in cart', payload: [...state.cart, product] })

        // Acumular
        const updatedProducts = state.cart.map(p => {
            if (p._id !== product._id) return p;
            if (p.size !== product.size) return p;

            // Actualizar la cantidad
            p.quantity += product.quantity;
            return p;
        });

        dispatch({ type: '[Cart] - Update products in cart', payload: updatedProducts });
    }

    return (
        <CartContext.Provider value={{
            ...state,

            // Methods
            addProductToCart
        }}>
            {children}
        </CartContext.Provider>
    )
}
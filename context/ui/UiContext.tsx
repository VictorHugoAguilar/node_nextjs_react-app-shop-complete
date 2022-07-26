import { createContext } from 'react';

interface ContextProps {
    isMenuOpen: boolean;

    toogleSideMenu: () => void;
}

export const UiContext = createContext({} as ContextProps);
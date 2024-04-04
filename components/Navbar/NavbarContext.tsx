import { createContext, useContext } from "react";


type NavbarContextProps = {
    isOpen?: boolean;
    setIsOpen: (isOpen: boolean) => void;
};
export const NavbarContext = createContext<NavbarContextProps | undefined >(undefined);
export function useNavbarContext() {
    const context = useContext(NavbarContext);
    if (!context) {
        throw new Error('useNavBarContext should be used within the NavbarContext provider!');
    }
    return context;
};
export {};

import { createContext, useContext } from "react";

export type SidebarItemContextProps = {
    isInsideCollapse: boolean;
};
export const  SidebarItemContext =  createContext<SidebarItemContextProps | undefined>(undefined);
export const useSidebarItemContext = () => {
    const context = useContext(SidebarItemContext);
    if(!context) {
        throw new Error('useSidebarItemContext should be used within the SidebarItemContext provider');
    }

    return context;
}

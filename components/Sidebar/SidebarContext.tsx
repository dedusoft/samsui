import { createContext, useContext } from "react";

export type SidebarContextProps = {
    isCollapsed: boolean;
};
export const SidebarContext =  createContext<SidebarContextProps | undefined>(undefined);

export function useSidebarContext() {
    const context = useContext(SidebarContext);
    if (!context) {
        throw new Error('useSidebarContext should be used within the SidebarContext provider!');
    }
    return context;
}

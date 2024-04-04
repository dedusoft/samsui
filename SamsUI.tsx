import { FC, HTMLAttributes, ReactNode, useEffect, useMemo } from "react";
import type { DeepPartial } from "./helpers/deep-partial";
import { mergeDeep } from "./helpers/merge-deep";
import type { SamsUITheme } from "./SamsUITheme";
import { ThemeContext, useTheme, useThemeMode } from "./SamsUIThemeContext";
import { theme as defaultTheme } from "./theme";

export interface ThemeProps {
    dark?: boolean;
    theme?: DeepPartial<SamsUITheme>;
}

interface SamsUIProps extends HTMLAttributes<HTMLDivElement> {
    children: ReactNode;
    theme?: ThemeProps
}

export const SamsUI: FC<SamsUIProps> = ({ children, theme = {}}) => {
    const { theme: customTheme = {}, dark } = theme;
    const [ mode, setMode, toggleMode ] = useThemeMode();
    const mergedTheme = mergeDeep(defaultTheme, customTheme);

    useEffect(() => {
        if(dark) {
            setMode('dark');
            document.documentElement.classList.add('dark');
        } else {
            setMode('light');
            document.documentElement.classList.remove('dark');
        }
    }, [dark, setMode]);

    const themeContextValue = useMemo(() => ({
        theme: mergedTheme,
        mode,
        toggleMode
    }), [mode, toggleMode, mergedTheme]);
    return (
        <ThemeContext.Provider value={ themeContextValue }>
            {children}
        </ThemeContext.Provider>
    );
}

export { useTheme, useThemeMode };
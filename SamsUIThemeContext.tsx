import { FC, ReactNode, createContext, useCallback, useContext, useEffect, useState } from 'react';
import { isClient } from './helpers/is-client';
import { SamsUITheme } from './SamsUITheme';
import { theme } from './theme';

export type Mode = 'light' | 'dark';
export interface ThemeContextProps {
    mode?: Mode;
    theme: SamsUITheme;
    toggleMode?: (mode?: Mode) => void;
}
interface ThemeProviderProps {
    children: ReactNode;
    value: ThemeContextProps;
}
export const ThemeContext = createContext<ThemeContextProps>({theme});
export const ThemeProvider: FC<ThemeProviderProps> = ({ children, value }) => {
    return (
        <ThemeContext.Provider value={value}>
            {children}
        </ThemeContext.Provider>);
};
export const useTheme = () => {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error('useTheme should be used within the ThemeContext provider!');
    }
    return context;
};
const prefersColorScheme = () => {
    if (!isClient()) {
        return 'light';
    }
    return window.matchMedia?.('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
};
export const useThemeMode = (): [Mode, (mode: Mode) => void, () => void] => {

    const onToggleMode = (value:any) => {
        const newMode = value ?? (mode === 'dark' ? 'light' : 'dark');
        setModeOnBody(newMode);
        setMode(newMode);
    };
    const setModeOnBody = useCallback((mode:Mode) => {
        if (!isClient()) {
            return;
        }
        if (mode === 'dark') {
            document.documentElement.classList.add('dark');
        }
        else {
            document.documentElement.classList.remove('dark');
        }
    }, []);
    const { mode: initialMode, toggleMode =onToggleMode } = useTheme();
    const [mode, setMode] = useState<Mode>('light');
    useEffect(() => {
        if (initialMode) {
            setModeOnBody(initialMode);
            setMode(initialMode);
        }
        else {
            setMode(prefersColorScheme());
        }
    }, [initialMode, setModeOnBody, setMode]);
    return [mode, setMode, toggleMode];
};

export {};
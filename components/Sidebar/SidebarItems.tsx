import type { ComponentProps, FC, PropsWithChildren } from 'react';
import { useTheme } from '../../SamsUIThemeContext';
import { twMerge } from 'tailwind-merge';
export interface SidebarItemsProps extends PropsWithChildren, ComponentProps<'div'> {
}
export const SidebarItems: FC<SidebarItemsProps> = ({ children, className, ...props }) => {
    const theme = useTheme().theme.sidebar.items;

    return (
        <div className={twMerge(theme, className)} {...props}  > { children } </div>
    );
};

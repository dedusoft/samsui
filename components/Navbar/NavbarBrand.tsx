import type { ComponentProps, ElementType, FC, PropsWithChildren } from 'react';
import type { DeepPartial } from "../../helpers/deep-partial";
import { mergeDeep } from '../../helpers/merge-deep';
import { useTheme } from '../../SamsUIThemeContext';
import { twMerge } from 'tailwind-merge';

export interface SamsUINavbarBrandTheme {
    base: string;
}
export interface NavbarBrandProps extends PropsWithChildren, ComponentProps<'a'>, Record<string, unknown> {
    as?: ElementType;
    href?: string;
    theme?: DeepPartial<SamsUINavbarBrandTheme>;
}
export const NavbarBrand: FC<NavbarBrandProps> = ({
    as: Component = "a",
  children,
  className,
  theme: customTheme = {},
  ...props 
}) => {
  const theme = mergeDeep(useTheme().theme.navbar.brand, customTheme);

return (
    <Component {...props} className={twMerge(theme.base, className)} >
        {children}
    </Component>
);
};

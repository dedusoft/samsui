import type { ComponentProps, FC } from 'react';
import type { DeepPartial } from "../../helpers/deep-partial";
import { FaBars } from "react-icons/fa";
import { useTheme } from '../../SamsUIThemeContext';
import { mergeDeep } from '../../helpers/merge-deep';
import { useNavbarContext } from './NavbarContext';
import { twMerge } from 'tailwind-merge';

export interface SamsUINavbarToggleTheme {
    base: string;
    icon: string;
}
export interface NavbarToggleProps extends ComponentProps<'button'> {
    barIcon?: FC<ComponentProps<'svg'>>;
    theme?: DeepPartial<SamsUINavbarToggleTheme>;
}
export const NavbarToggle: FC<NavbarToggleProps> = ({
    barIcon: BarIcon = FaBars,
    className,
    theme: customTheme = {},
    ...props
  }) => {
    const { isOpen, setIsOpen } = useNavbarContext();
    const theme = mergeDeep(useTheme().theme.navbar.toggle, customTheme);
    const handleClick = () => {
      setIsOpen(!isOpen);
    };

    return (
        <button onClick={handleClick} className={ twMerge(theme.base, className)} {...props}>
            <span className="sr-only">Open main menu</span>
            <BarIcon aria-hidden="true" className={theme.icon} />
        </button>
    );
};

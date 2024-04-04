import type { ComponentProps, FC, PropsWithChildren } from 'react';
import type { DeepPartial } from '../../helpers/deep-partial';
import { SamsUIColors } from '../../SamsUITheme';
import { mergeDeep } from '../../helpers/merge-deep';
import { useTheme } from '../../SamsUIThemeContext';
import { twMerge } from 'tailwind-merge';

export interface SamsUIHelperTextTheme {
    root: SamsUIHelperTextRootTheme;
}
export interface SamsUIHelperTextRootTheme {
    base: string;
    colors: HelperColors;
}
export interface HelperColors extends Pick<SamsUIColors, 'gray' | 'info' | 'failure' | 'warning' | 'success'> {
    [key: string]: string;
}
export interface HelperTextProps extends PropsWithChildren<Omit<ComponentProps<'p'>, 'color'>> {
    color?: keyof HelperColors;
    theme?: DeepPartial<SamsUIHelperTextTheme>;
    value?: string;
}
export const HelperText: FC<HelperTextProps> = ({
    children,
    className,
    color = "default",
    theme: customTheme = {},
    value,
    ...props
  }) => {
    const theme = mergeDeep(useTheme().theme.helperText, customTheme);

    return (
        <p {...props} className={twMerge(theme.root.base, theme.root.colors[color], className)} >{value ?? children ?? ""}</p>
    );
};

import type { ComponentProps, FC, PropsWithChildren } from 'react';
import type { DeepPartial } from '../../helpers/deep-partial';
import { mergeDeep } from '../../helpers/merge-deep';
import { useTheme } from '../../SamsUIThemeContext';
import { useModalContext } from './ModalContext';
import { twMerge } from 'tailwind-merge';
export interface SamsUIModalBodyTheme {
    base: string;
    popup: string;
}
export interface ModalBodyProps extends PropsWithChildren<ComponentProps<'div'>> {
    theme?: DeepPartial<SamsUIModalBodyTheme>;
}
export  const ModalBody: FC<ModalBodyProps> = ({
    children,
    className,
    theme: customTheme = {},
    ...props
  }) => {
    const theme = mergeDeep(useTheme().theme.modal.body, customTheme);
    const { popup } = useModalContext();

    return (
        <div className={twMerge(theme.base, popup && [theme.popup], className)} {...props} >{children}</div>
    );
};

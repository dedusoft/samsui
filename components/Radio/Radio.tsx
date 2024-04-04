import { forwardRef, type ComponentProps } from "react";
import type { DeepPartial } from "../../helpers/deep-partial";
import { twMerge } from "tailwind-merge";
import { mergeDeep } from "../../helpers/merge-deep";
import { useTheme } from "../../SamsUIThemeContext";
export interface SamsUIRadioTheme {
  root: SamsUIRadioRootTheme;
}
export interface SamsUIRadioRootTheme {
  base: string;
}
export interface RadioProps
  extends Omit<ComponentProps<"input">, "ref" | "type"> {
  theme?: DeepPartial<SamsUIRadioTheme>;
}
export const Radio: import("react").ForwardRefExoticComponent<
  RadioProps & import("react").RefAttributes<HTMLInputElement>
> = forwardRef((
    { className, theme: customTheme = {}, ...props }, ref
) => {
    const theme = mergeDeep(useTheme().theme.radio, customTheme);

    return (
        <input ref={ref} className={twMerge(theme.root.base, className)}  type="radio" />
    );
});

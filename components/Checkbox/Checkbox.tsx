import {
  forwardRef,
  type ComponentProps,
  type ForwardRefExoticComponent,
} from "react";
import type { DeepPartial } from "../../helpers/deep-partial";
import { mergeDeep } from "../../helpers/merge-deep";
import { useTheme } from "../../SamsUIThemeContext";
import { twMerge } from "tailwind-merge";

export interface SamsUICheckboxTheme {
  root: SamsUICheckboxRootTheme;
}
export interface SamsUICheckboxRootTheme {
  base: string;
}
export interface CheckboxProps
  extends Omit<ComponentProps<"input">, "type" | "ref"> {
  theme?: DeepPartial<SamsUICheckboxTheme>;
}
export const Checkbox: ForwardRefExoticComponent<
  CheckboxProps & import("react").RefAttributes<HTMLInputElement>
> = forwardRef(({ className, theme: customTheme = {}, ...props }, ref) => {
  const theme = mergeDeep(useTheme().theme.checkbox, customTheme);

  return (
    <input
      ref={ref}
      type="checkbox"
      className={twMerge(theme.root.base, className)}
      {...props}
    />
  );
});

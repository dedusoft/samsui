import { forwardRef, type ComponentProps, type ReactNode } from "react";
import type { DeepPartial } from "../../helpers/deep-partial";
import { useTheme, type SamsUITextInputColors, type SamsUITextInputSizes, HelperText } from "../../";
import { mergeDeep } from "../../helpers/merge-deep";
import { twMerge } from "tailwind-merge";
export interface SamsUIFileInputTheme {
  root: SamsUIFileInputRootTheme;
  field: SamsUIFileInputFieldTheme;
}
export interface SamsUIFileInputRootTheme {
  base: string;
}
export interface SamsUIFileInputFieldTheme {
  base: string;
  input: SamsUIFileInputFieldInputTheme;
}
export interface SamsUIFileInputFieldInputTheme {
  base: string;
  colors: SamsUITextInputColors;
  sizes: SamsUITextInputSizes;
}
export interface FileInputProps
  extends Omit<ComponentProps<"input">, "type" | "ref" | "color"> {
  color?: keyof SamsUITextInputColors;
  helperText?: ReactNode;
  sizing?: keyof SamsUITextInputSizes;
  theme?: DeepPartial<SamsUIFileInputTheme>;
}
export const FileInput: import("react").ForwardRefExoticComponent<
  FileInputProps & import("react").RefAttributes<HTMLInputElement>
> = forwardRef(({
    className,
    color = "gray",
    helperText,
    sizing = "md",
    theme: customTheme = {},
    ...props
  },
  ref) => {
    const theme = mergeDeep(useTheme().theme.fileInput, customTheme);

    return (
        <>
            <div className={twMerge(theme.root.base, className)}>
                <div className={theme.field.base} >
                    <input className={twMerge(
                theme.field.input.base,
                theme.field.input.colors[color],
                theme.field.input.sizes[sizing]
              )}  type="file" ref={ref} {...props} />
                </div>
            </div>

            {helperText && <HelperText color={color}>{helperText}</HelperText>}
        </>
    );
  });

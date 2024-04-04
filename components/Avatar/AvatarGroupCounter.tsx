import type { ComponentProps, FC, PropsWithChildren } from "react";
import { twMerge } from "tailwind-merge";
import { DeepPartial } from "../../helpers/deep-partial";
import { mergeDeep } from "../../helpers/merge-deep";
import { useTheme } from "../../SamsUIThemeContext";
export interface SamsUIAvatarGroupCounterTheme {
  base: string;
}
export interface AvatarGroupCounterProps
  extends PropsWithChildren<ComponentProps<"a">> {
  theme?: DeepPartial<SamsUIAvatarGroupCounterTheme>;
  total?: number;
}
export const AvatarGroupCounter: FC<AvatarGroupCounterProps> = ({
  className,
  href,
  theme: customTheme = {},
  total,
  ...props
}) => {
  const theme = mergeDeep(useTheme().theme.avatar.groupCounter, customTheme);
  return (
    <a {...props} href={href} className={twMerge(theme.base, className)}>
      +{total}
    </a>
  );
};

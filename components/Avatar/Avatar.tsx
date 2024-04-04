import type {
  ComponentProps,
  FC,
  PropsWithChildren,
  ReactElement,
} from "react";
import type {
  SamsUIBoolean,
  SamsUIColors,
  SamsUIPositions,
  SamsUISizes,
} from "../../SamsUITheme";
import type { SamsUIAvatarGroupTheme } from "./AvatarGroup";
import type { SamsUIAvatarGroupCounterTheme } from "./AvatarGroupCounter";
import { AvatarGroup } from "./AvatarGroup";
import { AvatarGroupCounter } from "./AvatarGroupCounter";
import { DeepPartial } from "../../helpers/deep-partial";
import { mergeDeep } from "../../helpers/merge-deep";
import { twMerge } from "tailwind-merge";
import { useTheme } from "../../SamsUIThemeContext";
export interface SamsUIAvatarTheme {
  root: SamsUIAvatarRootTheme;
  group: SamsUIAvatarGroupTheme;
  groupCounter: SamsUIAvatarGroupCounterTheme;
}
export interface SamsUIAvatarRootTheme {
  base: string;
  bordered: string;
  color: AvatarColors;
  img: SamsUIAvatarImageTheme;
  initials: SamsUIAvatarInitialsTheme;
  rounded: string;
  size: AvatarSizes;
  stacked: string;
  status: SamsUIAvatarStatusTheme;
  statusPosition: SamsUIPositions;
}
export interface SamsUIAvatarImageTheme extends SamsUIBoolean {
  base: string;
  placeholder: string;
}
export interface SamsUIAvatarStatusTheme {
  away: string;
  base: string;
  busy: string;
  offline: string;
  online: string;
}
export interface SamsUIAvatarInitialsTheme {
  base: string;
  text: string;
}
export interface AvatarColors
  extends Pick<
    SamsUIColors,
    "failure" | "gray" | "info" | "pink" | "purple" | "success" | "warning"
  > {
  [key: string]: string;
}
export interface AvatarSizes
  extends Pick<SamsUISizes, "xs" | "sm" | "md" | "lg" | "xl"> {
  [key: string]: string;
}
export interface AvatarImageProps {
  alt?: string;
  className: string;
  "data-testid": string;
}
export interface AvatarProps
  extends PropsWithChildren<Omit<ComponentProps<"div">, "color">> {
  alt?: string;
  bordered?: boolean;
  img?: string | ((props: AvatarImageProps) => ReactElement);
  color?: keyof AvatarColors;
  rounded?: boolean;
  size?: keyof AvatarSizes;
  stacked?: boolean;
  status?: "away" | "busy" | "offline" | "online";
  statusPosition?: keyof SamsUIPositions;
  placeholderInitials?: string;
  theme?: DeepPartial<SamsUIAvatarTheme>;
}
export const Avatar: FC<AvatarProps> & {
  Group: FC<import("./AvatarGroup").AvatarGroupProps>;
  Counter: FC<import("./AvatarGroupCounter").AvatarGroupCounterProps>;
} = ({
  alt = "",
  bordered = false,
  children,
  className,
  color = "light",
  img,
  placeholderInitials = "",
  rounded = false,
  size = "md",
  stacked = false,
  status,
  statusPosition = "top-left",
  theme: customTheme = {},
  ...props
}) => {
  const theme = mergeDeep(useTheme().theme.avatar, customTheme);
  const imgClassName = twMerge(
    theme.root.img.base,
    bordered && theme.root.bordered,
    bordered && theme.root.color[color],
    rounded && theme.root.rounded,
    stacked && theme.root.stacked,
    theme.root.img.on,
    theme.root.size[size]
  );

  const imgProps = {
    className: twMerge(imgClassName, theme.root.img.on),
    "data-testid": "flowbite-avatar-img",
  };
  return (
    <div className="relative">
      {img ? (
        typeof img === "string" ? (
          <img alt={alt} src={img} {...imgProps} />
        ) : (
          img({ alt, ...imgProps })
        )
      ) : placeholderInitials ? (
        <div
          className={twMerge(
            theme.root.img.off,
            theme.root.initials.base,
            stacked && theme.root.stacked,
            bordered && theme.root.bordered,
            bordered && theme.root.color[color],
            theme.root.size[size],
            rounded && theme.root.rounded
          )}
        >
          <span className={twMerge(theme.root.initials.text)}>
            {placeholderInitials}
          </span>
        </div>
      ) : (
        <div className={twMerge(imgClassName, theme.root.img.off)}>
          <svg
            className={theme.root.img.placeholder}
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
              clipRule="evenodd"
            ></path>
          </svg>
        </div>
      )}

      {status && (
        <span
          className={twMerge(
            theme.root.status.base,
            theme.root.status[status],
            theme.root.statusPosition[statusPosition]
          )}
        ></span>
      )}
      {children && <div>{children}</div>}
    </div>
  );
};

Avatar.Group = AvatarGroup;
Avatar.Counter = AvatarGroupCounter;

// export const Avatar = Object.assign(AvatarComponent, {
//     Group: AvatarGroup,
//     Counter: AvatarGroupCounter
// })

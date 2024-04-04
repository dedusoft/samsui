import type {
  // SamsUIAccordionTheme,
  SamsUIAlertTheme,
  SamsUIAvatarTheme,
  SamsUIBadgeTheme,
  SamsUIBreadcrumbTheme,
  SamsUIButtonGroupTheme,
  SamsUIButtonTheme,
  SamsUICardTheme,
  // SamsUICarouselTheme,
  SamsUICheckboxTheme,
  SamsUIDarkThemeToggleTheme,
  // SamsUIDatepickerTheme,
  // SamsUIDropdownTheme,
  SamsUIFileInputTheme,
  // SamsUIFooterTheme,
  SamsUIHelperTextTheme,
  // SamsUIKbdTheme,
  SamsUILabelTheme,
  // SamsUIListGroupTheme,
  SamsUIModalTheme,
  SamsUINavbarTheme,
  // SamsUIPaginationTheme,
  // SamsUIProgressTheme,
  SamsUIRadioTheme,
  // SamsUIRangeSliderTheme,
  // SamsUIRatingTheme,
  SamsUISelectTheme,
  SamsUISidebarTheme,
  SamsUISpinnerTheme,
  // SamsUITabTheme,
  SamsUITableTheme,
  SamsUITextInputTheme,
  SamsUITextareaTheme,
  // SamsUITimelineTheme,
  SamsUIToastTheme,
  // SamsUIToggleSwitchTheme,
  SamsUITooltipTheme,
} from "./components";

import type { DeepPartial } from "./helpers/deep-partial";

export type CustomSamsUITheme = DeepPartial<SamsUITheme>;
export interface SamsUITheme {
  // accordion: SamsUIAccordionTheme;
  alert: SamsUIAlertTheme;
  avatar: SamsUIAvatarTheme;
  badge: SamsUIBadgeTheme;
  breadcrumb: SamsUIBreadcrumbTheme;
  button: SamsUIButtonTheme;
  buttonGroup: SamsUIButtonGroupTheme;
  card: SamsUICardTheme;
  // carousel: SamsUICarouselTheme;
  checkbox: SamsUICheckboxTheme;
  // datepicker: SamsUIDatepickerTheme;
  darkThemeToggle: SamsUIDarkThemeToggleTheme;
  // footer: SamsUIFooterTheme;
  // kbd: SamsUIKbdTheme;
  // listGroup: SamsUIListGroupTheme;
  modal: SamsUIModalTheme;
  navbar: SamsUINavbarTheme;
  // rating: SamsUIRatingTheme;
  // pagination: SamsUIPaginationTheme;
  sidebar: SamsUISidebarTheme;
  // progress: SamsUIProgressTheme;
  spinner: SamsUISpinnerTheme;
  // tab: SamsUITabTheme;
  toast: SamsUIToastTheme;
  tooltip: SamsUITooltipTheme;
  // dropdown: SamsUIDropdownTheme;
  fileInput: SamsUIFileInputTheme;
  label: SamsUILabelTheme;
  radio: SamsUIRadioTheme;
  // rangeSlider: SamsUIRangeSliderTheme;
  select: SamsUISelectTheme;
  textInput: SamsUITextInputTheme;
  textarea: SamsUITextareaTheme;
  // toggleSwitch: SamsUIToggleSwitchTheme;
  helperText: SamsUIHelperTextTheme;
  table: SamsUITableTheme;
  // timeline: SamsUITimelineTheme;
}
export interface SamsUIBoolean {
  off: string;
  on: string;
}
export interface SamsUIStateColors {
  info: string;
  failure: string;
  success: string;
  warning: string;
}
export interface SamsUIColors extends SamsUIStateColors {
  [key: string]: string;
  blue: string;
  cyan: string;
  dark: string;
  gray: string;
  green: string;
  indigo: string;
  light: string;
  lime: string;
  pink: string;
  purple: string;
  red: string;
  teal: string;
  yellow: string;
}
export interface SamsUIGradientColors
  extends Omit<SamsUIStateColors, "warning"> {
  [key: string]: string;
  cyan: string;
  lime: string;
  pink: string;
  purple: string;
  teal: string;
}
export interface SamsUIGradientDuoToneColors {
  cyanToBlue: string;
  greenToBlue: string;
  pinkToOrange: string;
  purpleToBlue: string;
  purpleToPink: string;
  redToYellow: string;
  tealToLime: string;
}
export type SamsUIHeadingLevel = "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
export interface SamsUIPositions {
  "bottom-left": string;
  "bottom-right": string;
  "bottom-center": string;
  "top-left": string;
  "top-center": string;
  "top-right": string;
  "center-left": string;
  center: string;
  "center-right": string;
}
export interface SamsUISizes {
  xs: string;
  sm: string;
  md: string;
  lg: string;
  xl: string;
  "2xl": string;
  "3xl": string;
  "4xl": string;
  "5xl": string;
  "6xl": string;
  "7xl": string;
}
export interface SamsUIContentPositions {
  center: string;
}

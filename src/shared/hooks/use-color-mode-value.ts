import { useColorMode } from "@/shared/hooks/use-color-mode.ts";

export function useColorModeValue<T>(light: T, dark: T) {
  const { colorMode } = useColorMode();
  return colorMode === "light" ? light : dark;
}

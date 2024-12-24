"use client";

import * as React from "react";

import type { IconButtonProps } from "@chakra-ui/react";
import { ClientOnly, IconButton, Skeleton } from "@chakra-ui/react";
import { ThemeProvider } from "next-themes";
import type { ThemeProviderProps } from "next-themes";
import { LuMoon, LuSun } from "react-icons/lu";

import { useColorMode } from "@/shared/hooks";

export function ColorModeProvider(props: ThemeProviderProps) {
  return (
    <ThemeProvider attribute="class" disableTransitionOnChange {...props} />
  );
}

export function ColorModeIcon() {
  const { colorMode } = useColorMode();
  return colorMode === "light" ? <LuSun /> : <LuMoon />;
}

export const ColorModeButton = React.forwardRef<
  HTMLButtonElement,
  Omit<IconButtonProps, "aria-label">
>(function ColorModeButton(props, ref) {
  const { toggleColorMode } = useColorMode();
  return (
    <ClientOnly fallback={<Skeleton boxSize="8" />}>
      <IconButton
        onClick={toggleColorMode}
        variant="ghost"
        aria-label="Toggle color mode"
        size="sm"
        ref={ref}
        {...props}
        css={{
          _icon: {
            width: "5",
            height: "5"
          }
        }}
      >
        <ColorModeIcon />
      </IconButton>
    </ClientOnly>
  );
});

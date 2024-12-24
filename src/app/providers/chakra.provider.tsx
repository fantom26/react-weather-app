import {
  ColorModeProvider,
  ColorModeProviderProps
} from "@/components/ui/color-mode.tsx";
import { ChakraProvider as Provider, defaultSystem } from "@chakra-ui/react";

export function ChakraProvider(props: ColorModeProviderProps) {
  return (
    <Provider value={defaultSystem}>
      <ColorModeProvider {...props} />
    </Provider>
  );
}

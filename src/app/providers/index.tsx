import { RouterProvider } from "react-router-dom";

import router from "@/app/config/routing/router.tsx";
import { ChakraProvider } from "@/app/providers/chakra.provider.tsx";

function Providers() {
  return (
    <ChakraProvider>
      <RouterProvider router={router} />
    </ChakraProvider>
  );
}

export default Providers;

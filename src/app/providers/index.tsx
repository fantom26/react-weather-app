import { RouterProvider } from "react-router-dom";

import router from "@/app/config/routing/router.tsx";
import { ChakraProvider } from "@/app/providers/chakra.provider.tsx";
import { ReactQueryProvider } from "@/app/providers/react-query.provider.tsx";

function Providers() {
  return (
    <ReactQueryProvider>
      <ChakraProvider>
        <RouterProvider router={router} />
      </ChakraProvider>
    </ReactQueryProvider>
  );
}

export default Providers;

"use client";

import { PersistGate } from "redux-persist/integration/react";
import { Provider } from "react-redux";
import { store, persistor } from "@/lib/redux/store";
import { Toaster } from "react-hot-toast";

export default function AppProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        {children}
        <Toaster
          toastOptions={{
            style: { background: "#333", color: "#fff" },
            success: { style: { background: "#166534" } },
            error: { style: { background: "#b91c1c" } },
          }}
        />
      </PersistGate>
    </Provider>
  );
}

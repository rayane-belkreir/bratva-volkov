"use client";

import { useState } from "react";
import { ConfirmPopup } from "@/components/ConfirmPopup";

interface AlertOptions {
  title: string;
  message: string;
  type?: "danger" | "warning" | "info" | "success";
  buttonText?: string;
}

export function useAlert() {
  const [alertState, setAlertState] = useState<{
    isOpen: boolean;
    options: AlertOptions | null;
  }>({
    isOpen: false,
    options: null,
  });

  const alert = (options: AlertOptions): void => {
    setAlertState({
      isOpen: true,
      options,
    });
  };

  const closeAlert = () => {
    setAlertState({
      isOpen: false,
      options: null,
    });
  };

  const AlertComponent = () => {
    if (!alertState.options) return null;

    return (
      <ConfirmPopup
        isOpen={alertState.isOpen}
        onClose={closeAlert}
        onConfirm={closeAlert}
        title={alertState.options.title}
        message={alertState.options.message}
        type={alertState.options.type || "info"}
        confirmText={alertState.options.buttonText || "OK"}
        cancelText=""
      />
    );
  };

  return {
    alert,
    AlertComponent,
  };
}


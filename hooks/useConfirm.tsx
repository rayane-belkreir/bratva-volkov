"use client";

import { useState } from "react";
import { ConfirmPopup } from "@/components/ConfirmPopup";

interface ConfirmOptions {
  title: string;
  message: string;
  type?: "danger" | "warning" | "info" | "success";
  confirmText?: string;
  cancelText?: string;
}

export function useConfirm() {
  const [confirmState, setConfirmState] = useState<{
    isOpen: boolean;
    options: ConfirmOptions | null;
    onConfirm: (() => void) | null;
  }>({
    isOpen: false,
    options: null,
    onConfirm: null,
  });

  const confirm = (
    options: ConfirmOptions,
    onConfirm: () => void
  ): void => {
    setConfirmState({
      isOpen: true,
      options,
      onConfirm,
    });
  };

  const closeConfirm = () => {
    setConfirmState({
      isOpen: false,
      options: null,
      onConfirm: null,
    });
  };

  const handleConfirm = () => {
    if (confirmState.onConfirm) {
      confirmState.onConfirm();
    }
    closeConfirm();
  };

  const ConfirmComponent = () => {
    if (!confirmState.options) return null;

    return (
      <ConfirmPopup
        isOpen={confirmState.isOpen}
        onClose={closeConfirm}
        onConfirm={handleConfirm}
        title={confirmState.options.title}
        message={confirmState.options.message}
        type={confirmState.options.type}
        confirmText={confirmState.options.confirmText}
        cancelText={confirmState.options.cancelText}
      />
    );
  };

  return {
    confirm,
    ConfirmComponent,
  };
}


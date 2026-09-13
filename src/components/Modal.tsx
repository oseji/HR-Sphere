import { ReactNode } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

// ─── Base Modal ───────────────────────────────────────────────────────────────
// Radix Dialog supplies role="dialog", aria-modal, focus trap, Escape-to-close,
// scroll lock and return-focus. framer-motion handles the enter/exit animation.

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
  maxWidth?: string;
}

export const Modal = ({
  isOpen,
  onClose,
  title,
  children,
  maxWidth = "max-w-lg",
}: ModalProps) => (
  <Dialog.Root open={isOpen} onOpenChange={(open) => !open && onClose()}>
    <AnimatePresence>
      {isOpen && (
        <Dialog.Portal forceMount>
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <Dialog.Overlay asChild forceMount>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.15 }}
                className="absolute inset-0 bg-black/40 backdrop-blur-sm"
              />
            </Dialog.Overlay>

            {/* Panel */}
            <Dialog.Content asChild forceMount aria-modal="true">
              <motion.div
                initial={{ opacity: 0, scale: 0.96, y: 8 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.96, y: 8 }}
                transition={{ duration: 0.15, ease: "easeOut" }}
                className={`relative z-10 w-full ${maxWidth} card overflow-hidden focus:outline-none`}
              >
                {/* Header */}
                <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 dark:border-slate-800">
                  <Dialog.Title className="text-sm font-semibold text-slate-900 dark:text-white">
                    {title}
                  </Dialog.Title>
                  <Dialog.Close asChild>
                    <button
                      type="button"
                      className="btn-icon text-slate-500 hover:text-slate-700 dark:hover:text-slate-300"
                      aria-label="Close dialog"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </Dialog.Close>
                </div>

                {children}
              </motion.div>
            </Dialog.Content>
          </div>
        </Dialog.Portal>
      )}
    </AnimatePresence>
  </Dialog.Root>
);

// ─── Confirm Modal ────────────────────────────────────────────────────────────

interface ConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void | Promise<void>;
  title: string;
  message: string;
  confirmText?: string;
  isDanger?: boolean;
  loading?: boolean;
}

export const ConfirmModal = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmText = "Confirm",
  isDanger = false,
  loading = false,
}: ConfirmModalProps) => (
  <Modal isOpen={isOpen} onClose={onClose} title={title} maxWidth="max-w-md">
    <div className="p-6">
      <Dialog.Description className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
        {message}
      </Dialog.Description>

      <div className="flex items-center justify-end gap-3 mt-6">
        <button
          type="button"
          onClick={onClose}
          disabled={loading}
          className="btn btn-ghost btn-sm"
        >
          Cancel
        </button>
        <button
          type="button"
          onClick={onConfirm}
          disabled={loading}
          className={isDanger ? "btn btn-danger btn-sm" : "btn btn-primary btn-sm"}
        >
          {loading ? (
            <span className="flex items-center gap-2">
              <span className="spinner" style={{ width: 14, height: 14 }} />
              Processing…
            </span>
          ) : (
            confirmText
          )}
        </button>
      </div>
    </div>
  </Modal>
);

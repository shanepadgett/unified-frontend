import React, { Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { twMerge } from 'tailwind-merge';

export type ModalSize = 'sm' | 'md' | 'lg' | 'xl' | 'full';

export interface ModalProps {
  /**
   * Whether the modal is open
   */
  isOpen: boolean;
  
  /**
   * Callback function when the modal is closed
   */
  onClose: () => void;
  
  /**
   * Modal title
   */
  title?: React.ReactNode;
  
  /**
   * Modal content
   */
  children: React.ReactNode;
  
  /**
   * Modal footer content
   */
  footer?: React.ReactNode;
  
  /**
   * Modal size
   * @default 'md'
   */
  size?: ModalSize;
  
  /**
   * Whether to show the close button in the header
   * @default true
   */
  showCloseButton?: boolean;
  
  /**
   * Whether to close the modal when clicking outside
   * @default true
   */
  closeOnClickOutside?: boolean;
  
  /**
   * Whether to close the modal when pressing escape
   * @default true
   */
  closeOnEscape?: boolean;
  
  /**
   * Additional CSS classes for the modal
   */
  className?: string;
  
  /**
   * Additional CSS classes for the modal content
   */
  contentClassName?: string;
}

/**
 * Modal/Dialog component for displaying content in a layer above the app
 */
export function Modal({
  isOpen,
  onClose,
  title,
  children,
  footer,
  size = 'md',
  showCloseButton = true,
  closeOnClickOutside = true,
  closeOnEscape = true,
  className,
  contentClassName,
}: ModalProps) {
  const sizeStyles = {
    sm: "sm:max-w-sm",
    md: "sm:max-w-md",
    lg: "sm:max-w-lg",
    xl: "sm:max-w-xl",
    full: "sm:max-w-full sm:h-screen sm:m-0 sm:rounded-none"
  };
  
  const modalStyles = twMerge(
    "relative transform overflow-hidden rounded-lg bg-white dark:bg-gray-800 px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:p-6",
    sizeStyles[size],
    contentClassName
  );
  
  return (
    <Transition.Root show={isOpen} as={Fragment}>
      <Dialog 
        as="div" 
        className={twMerge("relative z-50", className)} 
        onClose={closeOnClickOutside ? onClose : () => {}}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 dark:bg-gray-900 bg-opacity-75 dark:bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className={modalStyles}>
                {(title || showCloseButton) && (
                  <div className="flex items-start justify-between mb-4">
                    {title && (
                      <Dialog.Title className="text-lg font-medium text-gray-900 dark:text-white">
                        {title}
                      </Dialog.Title>
                    )}
                    {showCloseButton && (
                      <button
                        type="button"
                        className="rounded-md bg-white dark:bg-gray-800 text-gray-400 hover:text-gray-500 dark:hover:text-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                        onClick={onClose}
                      >
                        <span className="sr-only">Close</span>
                        <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                      </button>
                    )}
                  </div>
                )}
                <div className="mt-2">{children}</div>
                {footer && (
                  <div className="mt-5 sm:mt-6 sm:flex sm:flex-row-reverse">
                    {footer}
                  </div>
                )}
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}

export interface ConfirmModalProps extends Omit<ModalProps, 'children' | 'footer'> {
  /**
   * Modal message content
   */
  message: React.ReactNode;
  
  /**
   * Confirm button text
   * @default 'Confirm'
   */
  confirmText?: string;
  
  /**
   * Cancel button text
   * @default 'Cancel'
   */
  cancelText?: string;
  
  /**
   * Callback function when the confirm button is clicked
   */
  onConfirm: () => void;
  
  /**
   * Whether the confirm action is destructive (red button)
   * @default false
   */
  isDestructive?: boolean;
  
  /**
   * Whether the confirm button is in a loading state
   * @default false
   */
  isLoading?: boolean;
}

/**
 * Confirmation modal with confirm and cancel buttons
 */
export function ConfirmModal({
  isOpen,
  onClose,
  title,
  message,
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  onConfirm,
  isDestructive = false,
  isLoading = false,
  size = 'sm',
  ...props
}: ConfirmModalProps) {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={title}
      size={size}
      footer={
        <>
          <button
            type="button"
            className={`inline-flex w-full justify-center rounded-md px-3 py-2 text-sm font-semibold ${
              isDestructive
                ? 'bg-red-600 text-white hover:bg-red-500 focus:ring-red-500'
                : 'bg-indigo-600 text-white hover:bg-indigo-500 focus:ring-indigo-500'
            } shadow-sm sm:ml-3 sm:w-auto`}
            onClick={onConfirm}
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <svg 
                  className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" 
                  xmlns="http://www.w3.org/2000/svg" 
                  fill="none" 
                  viewBox="0 0 24 24"
                >
                  <circle 
                    className="opacity-25" 
                    cx="12" 
                    cy="12" 
                    r="10" 
                    stroke="currentColor" 
                    strokeWidth="4"
                  />
                  <path 
                    className="opacity-75" 
                    fill="currentColor" 
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  />
                </svg>
                Loading...
              </>
            ) : (
              confirmText
            )}
          </button>
          <button
            type="button"
            className="mt-3 inline-flex w-full justify-center rounded-md bg-white dark:bg-gray-700 px-3 py-2 text-sm font-semibold text-gray-900 dark:text-gray-200 shadow-sm ring-1 ring-inset ring-gray-300 dark:ring-gray-600 hover:bg-gray-50 dark:hover:bg-gray-600 sm:mt-0 sm:w-auto"
            onClick={onClose}
            disabled={isLoading}
          >
            {cancelText}
          </button>
        </>
      }
      {...props}
    >
      <div className="text-sm text-gray-500 dark:text-gray-400">
        {message}
      </div>
    </Modal>
  );
}

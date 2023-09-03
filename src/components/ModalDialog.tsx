import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";

interface ModalDialogProps {
  title: string;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  ModalElement: React.ComponentType;
}

export default function ModalDialog({
  title,
  ModalElement,
  isOpen,
  setIsOpen,
}: ModalDialogProps) {
  return (
    <Transition show={isOpen} as={Fragment}>
      <Dialog
        open={isOpen}
        onClose={() => setIsOpen(false)}
        className="absolute inset-0 z-50"
        static
      >
        {/* Backdrop child */}
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/30 bg-opacity-25 backdrop-blur-sm" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            {/* Content child */}
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-md rounded-sm bg-theme-secondary p-4">
                <Dialog.Title
                  as="h3"
                  className="pb-2 text-lg font-medium leading-6 text-stone-900 dark:text-stone-300"
                >
                  {title}
                </Dialog.Title>
                <ModalElement />
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}

'use client';
import type { DialogProps } from '@mui/material';
import { Dialog, DialogContent, DialogTitle } from '@mui/material';
import type { ReactNode } from 'react';
import { memo, useState } from 'react';

interface ModalProps {
  title?: string;
  modalSize?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | string;
  setSelectedItem?: (item: any) => void;
}

export function useModal({
  modalSize = 'md',
  title = 'Информация',
  setSelectedItem,
}: ModalProps = {}) {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => setIsOpen(true);
  const closeModal = () => {
    setIsOpen(false);
    setSelectedItem && setSelectedItem(null);
  };

  const ModalContent = memo(
    ({
      children,
      customSize,
      customTitle,
      ...props
    }: {
      children: ReactNode;
      customTitle?: string;
      customSize?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | string;
    } & Omit<DialogProps, 'open' | 'onClose'>) => (
      <Dialog
        open={isOpen}
        onClose={closeModal}
        maxWidth={customSize || (modalSize as DialogProps['maxWidth'])}
        fullWidth
        {...props}
      >
        <DialogTitle>{customTitle || title}</DialogTitle>
        <DialogContent>{children}</DialogContent>
      </Dialog>
    )
  );

  return {
    openModal,
    closeModal,
    ModalContent,
  };
}

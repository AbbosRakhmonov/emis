// utils/snackbarUtils.ts
export type SnackbarSeverity = 'success' | 'error' | 'warning' | 'info';

export interface SnackbarOptions {
  message: string;
  severity?: SnackbarSeverity;
  autoHideDuration?: number;
  anchorOrigin?: { vertical: 'top' | 'bottom'; horizontal: 'left' | 'center' };
  variant?: 'standard' | 'filled' | 'outlined';
  title?: string;
}

let useSnackbarRef: ((options: SnackbarOptions) => void) | undefined;

export const setSnackbarRef = (
  ref: (options: SnackbarOptions) => void
): void => {
  useSnackbarRef = ref;
};

export const notification = {
  show: (options: SnackbarOptions): void => {
    if (typeof window !== 'undefined' && useSnackbarRef) {
      useSnackbarRef(options);
    } else {
      console.error('Snackbar reference not initialized or called during SSR');
    }
  },
};

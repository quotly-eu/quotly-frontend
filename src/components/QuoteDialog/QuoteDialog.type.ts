import { DialogType } from "components/Dialog/Dialog.type";

/**
 * QuoteDialogType type for QuoteDialog component
 * @example
 * <QuoteDialog open={true} toggleDialog={() => {}} />
 */
export type QuoteDialogType = Omit<DialogType, 'children'> & {
  isActive: boolean;
};
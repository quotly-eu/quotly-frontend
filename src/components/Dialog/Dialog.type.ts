/**
 * DialogType type for Dialog component
 * @example
 * <Dialog open={true} toggleDialog={() => {}} />
 */
export type DialogType = {
  open?: boolean;
  children?: React.ReactNode,
  toggleDialog: () => void;
};
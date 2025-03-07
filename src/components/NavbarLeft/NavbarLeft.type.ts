import { ApiResponse } from "types/ApiResponse.type";
import { User } from "types/User.type";

/**
 * NavbarLeftType type for NavbarLeft component
 * @example
 * <NavbarLeft toggleDialog={() => {}} />
 */
export type NavbarLeftProps = {
  toggleDialog?: () => void;
};
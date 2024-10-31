import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { WebTarget } from "styled-components";

/**
 * InputType type for the Input component
 * @example
 * <Input />
 */
export type InputType = {
  id?: string;
  name?: string;
  placeholder?: string;
  icon?: IconProp;
  required?: boolean;
  testing?: boolean;
  as?: void | WebTarget;
};
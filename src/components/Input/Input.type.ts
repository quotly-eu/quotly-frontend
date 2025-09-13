import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { Dispatch, SetStateAction } from "react";
import { WebTarget } from "styled-components";

/**
 * InputType type for the Input component
 * @example
 * <Input />
 */
export interface InputType {
  id?: string;
  name?: string;
  placeholder?: string;
  icon?: IconProp;
  required?: boolean;
  testing?: boolean;
  as?: void | WebTarget;
  onChange?: Dispatch<SetStateAction<string>>
};
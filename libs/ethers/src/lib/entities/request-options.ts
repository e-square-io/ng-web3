import { RequestInputs } from './request-inputs';

export interface RequestOptions {
  /**
   * Arguments of the method being called.
   */
  inputs?: RequestInputs;

  /**
   * Amount of ERC-20 tokens being sent
   * with the request.
   */
  value?: number;
}

/**
 * Base Domain Model
 */

import type { Identifier, Timestamped } from "../types";

export interface BaseModel extends Identifier, Timestamped {
  version: string;
}

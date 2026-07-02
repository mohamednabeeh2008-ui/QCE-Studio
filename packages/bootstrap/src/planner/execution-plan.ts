/**
 * Execution Plan
 *
 * Represents a list of executable
 * architectural tasks.
 */

export interface ExecutionTask {
  type: string;

  description: string;
}

export interface ExecutionPlan {
  tasks: ExecutionTask[];
}

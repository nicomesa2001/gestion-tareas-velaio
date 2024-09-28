import { Person } from "./person.model";

export interface Task {
  id: number;
  name: string;
  dueDate: Date;
  completed: boolean;
  people: Person[];
}

import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Task } from '../models/task.model';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private tasks: Task[] = [];
  private tasksSubject: BehaviorSubject<Task[]> = new BehaviorSubject<Task[]>([]);

  constructor() { }

  getTasks(): Observable<Task[]> {
    return this.tasksSubject.asObservable();
  }

  addTask(task: Task): void {
    task.id = this.tasks.length + 1;
    this.tasks.push(task);
    this.tasksSubject.next([...this.tasks]);
  }

  updateTask(task: Task): void {
    const index = this.tasks.findIndex(t => t.id === task.id);
    if (index !== -1) {
      this.tasks[index] = task;
      this.tasksSubject.next([...this.tasks]);
    }
  }

  toggleTaskCompletion(taskId: number): void {
    const task = this.tasks.find(t => t.id === taskId);
    if (task) {
      task.completed = !task.completed;
      this.tasksSubject.next([...this.tasks]);
    }
  }
}

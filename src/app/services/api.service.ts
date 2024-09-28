import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Task } from '../models/task.model';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private storageKey = 'tasks';

  constructor() {
    if (!sessionStorage.getItem(this.storageKey)) {
      sessionStorage.setItem(this.storageKey, JSON.stringify([]));
    }
  }

  getTasks(): Observable<Task[]> {
    const tasks = JSON.parse(sessionStorage.getItem(this.storageKey) || '[]');
    return of(tasks);
  }

  addTask(task: Task): Observable<Task> {
    const tasks = JSON.parse(sessionStorage.getItem(this.storageKey) || '[]');
    tasks.push(task);
    sessionStorage.setItem(this.storageKey, JSON.stringify(tasks));
    return of(task);
  }

  updateTask(task: Task): Observable<Task> {
    const tasks = JSON.parse(sessionStorage.getItem(this.storageKey) || '[]');
    const index = tasks.findIndex((t: Task) => t.id === task.id);
    if (index !== -1) {
      tasks[index] = task;
      sessionStorage.setItem(this.storageKey, JSON.stringify(tasks));
    }
    return of(task);
  }

  deleteTask(id: number): Observable<void> {
    const tasks = JSON.parse(sessionStorage.getItem(this.storageKey) || '[]');
    const filteredTasks = tasks.filter((t: Task) => t.id !== id);
    sessionStorage.setItem(this.storageKey, JSON.stringify(filteredTasks));
    return of(void 0);
  }
}

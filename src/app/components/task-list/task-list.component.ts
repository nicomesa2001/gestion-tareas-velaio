import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { Task } from '../../models/task.model';
import * as TaskActions from '../../store/actions/task.actions';
import * as fromTask from '../../store/selectors/task.selectors';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss']
})
export class TaskListComponent implements OnInit {
  tasks$!: Observable<Task[]>;
  filter: 'all' | 'completed' | 'pending' = 'all';

  constructor(private store: Store) { }

  ngOnInit(): void {
    this.store.dispatch(TaskActions.loadTasks());
    this.tasks$ = this.store.pipe(select(fromTask.selectAllTasks));
  }

  toggleTaskCompletion(task: Task): void {
    const updatedTask = { ...task, completed: !task.completed };
    this.store.dispatch(TaskActions.updateTask({ task: updatedTask }));
  }

  setFilter(filter: 'all' | 'completed' | 'pending'): void {
    this.filter = filter;
    switch (filter) {
      case 'completed':
        this.tasks$ = this.store.pipe(select(fromTask.selectCompletedTasks));
        break;
      case 'pending':
        this.tasks$ = this.store.pipe(select(fromTask.selectPendingTasks));
        break;
      default:
        this.tasks$ = this.store.pipe(select(fromTask.selectAllTasks));
    }
  }

  deleteTask(id: number): void {
    this.store.dispatch(TaskActions.deleteTask({ id }));
  }
}

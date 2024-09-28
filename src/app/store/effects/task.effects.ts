import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, mergeMap, catchError } from 'rxjs/operators';
import { ApiService } from '../../services/api.service';
import * as TaskActions from '../actions/task.actions';

@Injectable()
export class TaskEffects {
  loadTasks$ = createEffect(() => this.actions$.pipe(
    ofType(TaskActions.loadTasks),
    mergeMap(() => this.apiService.getTasks()
      .pipe(
        map(tasks => TaskActions.loadTasksSuccess({ tasks })),
        catchError(() => of(TaskActions.loadTasksFailure({ error: 'Error al cargar las tareas' })))
      ))
  ));

  addTask$ = createEffect(() => this.actions$.pipe(
    ofType(TaskActions.addTask),
    mergeMap(action => this.apiService.addTask(action.task)
      .pipe(
        map(task => TaskActions.addTaskSuccess({ task })),
        catchError(() => of(TaskActions.addTaskFailure({ error: 'Error al añadir la tarea' })))
      ))
  ));

  updateTask$ = createEffect(() => this.actions$.pipe(
    ofType(TaskActions.updateTask),
    mergeMap(action => this.apiService.updateTask(action.task)
      .pipe(
        map(task => TaskActions.updateTaskSuccess({ task })),
        catchError(() => of(TaskActions.updateTaskFailure({ error: 'Error al actualizar la tarea' })))
      ))
  ));

  deleteTask$ = createEffect(() => this.actions$.pipe(
    ofType(TaskActions.deleteTask),
    mergeMap(action => this.apiService.deleteTask(action.id)
      .pipe(
        map(() => TaskActions.deleteTaskSuccess({ id: action.id })),
        catchError(() => of(TaskActions.deleteTaskFailure({ error: 'Error al eliminar la tarea' })))
      ))
  ));

  constructor(
    private actions$: Actions,
    private apiService: ApiService
  ) { }
}

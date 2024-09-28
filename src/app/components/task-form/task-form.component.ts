import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray, ReactiveFormsModule, AbstractControl } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Task } from '../../models/task.model';
import * as TaskActions from '../../store/actions/task.actions';
import { CommonModule } from '@angular/common';
import { CustomValidators } from 'src/app/validators/custom-validators';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.scss'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule]
})
export class TaskFormComponent implements OnInit {
  taskForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private store: Store,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    this.taskForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(5)]],
      dueDate: ['', Validators.required],
      people: this.fb.array([])
    });
  }

  get people(): FormArray {
    return this.taskForm.get('people') as FormArray;
  }

  getSkillControls(personIndex: number): AbstractControl[] {
    return (this.people.at(personIndex).get('skills') as FormArray).controls;
  }

  addPerson(): void {
    const personForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(5), CustomValidators.uniqueName(this.people)]],
      age: ['', [Validators.required, Validators.min(18)]],
      skills: this.fb.array([], Validators.required)
    });

    this.people.push(personForm);
  }

  removePerson(index: number): void {
    this.people.removeAt(index);
  }

  addSkill(personIndex: number): void {
    const skills = this.people.at(personIndex).get('skills') as FormArray;
    skills.push(this.fb.control('', Validators.required));
  }

  removeSkill(personIndex: number, skillIndex: number): void {
    const skills = this.people.at(personIndex).get('skills') as FormArray;
    skills.removeAt(skillIndex);
  }

  onSubmit(): void {
    if (this.taskForm.valid) {
      const newTask: Task = {
        ...this.taskForm.value,
        id: Date.now(),
        completed: false
      };

      this.store.dispatch(TaskActions.addTask({ task: newTask }));

      this.taskForm.reset();
      this.people.clear();
    }
  }

}

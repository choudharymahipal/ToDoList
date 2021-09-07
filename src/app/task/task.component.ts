import { Component } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss'],
})
export class TaskComponent {
  form: FormGroup;

  //Counter variables
  todoCount: number = 0;
  doingCount: number = 0;
  doneCount: number = 0;

  //Data source
  todo = [
    'Get to work',
    'Pick up groceries',
    'Go home',
    'Fall asleep'
  ];

  doing = [
    'new task',
    'two task'
  ];

  done = [
    'Get up',
    'Brush teeth',
    'Take a shower',
    'Check e-mail',
    'Walk dog'
  ];

  constructor(private _snackBar: MatSnackBar) {
    //Form inputs
    this.form = new FormGroup({
      NewTask: new FormControl(null, [Validators.required]),
      TaskType: new FormControl(null, [Validators.required]),
      TaskDate: new FormControl(null, [Validators.required])
    });
  }

  ngOnInit() {
    this.updateCount();
  }


  drop(event: CdkDragDrop<string[]>): void {
    debugger
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);
    }
    this.updateCount();
  }

  updateCount() {
    this.todoCount = Number(this.todo.length);
    this.doingCount = Number(this.doing.length);
    this.doneCount = Number(this.done.length);
  }

  AddNewTask() {
    debugger
    var _newTask = this.form.get("NewTask");
    var _taskType = this.form.get("TaskType");
    //var _taskDate = this.form.get("TaskDate");

    if (this.form.status != "INVALID") {
      try {
        if (_taskType?.value == "todo") {
          this.todo.push(_newTask?.value);
          this._snackBar.open("New task added in ToDo list.", "Close", {
            duration: 3000
          });
        } else if (_taskType?.value == "doing"){
          this.doing.push(_newTask?.value);
          this._snackBar.open("New task added in Doing list.", "Close", {
            duration: 3000
          });
        }else{
          this.done.push(_newTask?.value);
          this._snackBar.open("New task added in Done list.", "Close", {
            duration: 3000
          });
        }
        
        this.form.reset();
      } catch (error) {
        this._snackBar.open("Something went wrong. Please try again.", "Close", {
          duration: 3000
        });
      }
    } else {
      this._snackBar.open("All fields are mandatory.", "Close", {
        duration: 3000
      });
    }

  }
}

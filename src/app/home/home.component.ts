import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

interface Todo {
  id: number;
  content: string;
  isDone: boolean;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  //todoCollection: Todo=[];
  todoList: Todo[]=[
    {id: 1, content: 'test data', isDone:false}
  ];
  todoDoc: Todo= {
    id:1,
    content: "",
    isDone:false
  }
  inputId: string="";
  inputValue: Todo = {
    id:1,
    content: "dfg",
    isDone:false
  }

  editValue: boolean = false;
  constructor(public snackBar: MatSnackBar) {
  }
  ngOnInit() {
    
    // this.todoCollection = this.afs.collection('Todolist');
    // this.todoList = this.afs.collection('Todolist', ref => ref.orderBy('datemodified')).snapshotChanges().map(changes => {
    //   return changes.map(a => {
    //     const data = a.payload.doc.data() as Todo;
    //     data.id = a.payload.doc.id;
    //     return data;
    //   })
    // })
  }

  addNewItem() {
    if (this.inputValue.content != "") {
      //this.inputValue.datemodified = new Date();
      this.inputValue.isDone = false;
      //this.todoCollection.add(this.inputValue);
      this.inputValue.content = "";
      this.openSnackBar("Added Successfuly!", "Dismiss");
    }
  }

  deleteItem(i:any) {
    // this.todoDoc = this.afs.doc(`Todolist/${i}`);
    // this.todoDoc.delete();
    this.openSnackBar("Item Deleted!", "Dismiss");
  }
  editItem(i:any) {
    this.inputValue.content = i.content;
    this.editValue = true;
    this.inputId = i.id;
  }
  markItemAsDone(item:any) {
    this.inputValue.content = item.content;
    this.inputValue.isDone = true;
    //this.todoDoc = this.afs.doc(`Todolist/${item.id}`);
    //this.todoDoc.update(this.inputValue);
    this.inputValue.content = "";
    this.openSnackBar("Item Done!", "Dismiss");
  }
  markItemAsNotDone(item:any) {
    this.inputValue.content = item.content;
    this.inputValue.isDone = false;
    //this.todoDoc = this.afs.doc(`Todolist/${item.id}`);
    //this.todoDoc.update(this.inputValue);
    this.inputValue.content = "";
    this.openSnackBar("Item Not Done!", "Dismiss");
  }
  saveNewItem() {
    if (this.inputValue.content != "") {
      this.inputValue.isDone = false;
      //this.inputValue.datemodified = new Date();
      //this.todoDoc = this.afs.doc(`Todolist/${this.inputId}`);
      //this.todoDoc.update(this.inputValue);
      this.editValue = false;
      this.inputValue.content = "";
      this.openSnackBar("Updated Successfuly!", "Dismiss");
    }
  }
  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
      verticalPosition: 'top',
    });
  }
  toggleCheck(i:any) {
    //nothing to do
    console.log(i);
    
  }
}
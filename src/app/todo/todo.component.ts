import {Component, OnInit} from '@angular/core';
import {ITodo} from '../ITodo';
import {TodoService} from '../todo.service';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss']
})
export class TodoComponent implements OnInit {
  inputControl: string;
  todoList: ITodo[];

  constructor(private todoService: TodoService) {
  }

  ngOnInit() {
    this.todoService.getTodo().subscribe(data => {
      this.todoList = data;
    }, error => console.log(error));
  }

  toggleTodo(i: number) {
    const todo = this.todoList[i];
    todo.completed = !todo.completed;
    this.todoService.updateTodo(todo).subscribe(next => {
      this.todoList[i] = next;
    }, error => console.log(error));
  }


  addTodo() {
    const todo: Partial<ITodo> = {
      title: this.inputControl,
      completed: false
    };
    this.todoService.createTodo(todo).subscribe(next => {
      this.todoList.push(next);
      this.inputControl = '';
    });
  }


  deleteTodo(id: number) {
    const todo: ITodo = this.todoList[id];
    this.todoService.deleteTodo(id).subscribe(next => {
      this.todoList.splice(id, 1);
    });
  }
}

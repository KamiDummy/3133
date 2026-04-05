import { Component } from '@angular/core';

@Component({
  selector: 'students',
  standalone: false,
  template: `
    <h1>{{ getTitle() }}</h1>
    <p>Current Date: {{ getCurrentDate() }}</p>
  `
})
export class StudentsComponent {
  title = 'Students App';

  getTitle() {
    return this.title;
  }

  getCurrentDate() {
    return new Date();
  }
}

import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';

// Import rxjs map operator
import 'rxjs/add/operator/map';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  title = 'app works!';

  // Link to our api, pointing to localhost
  API = 'http://localhost:3000';

  // Declare empty list of people
 people: any[] = [];

 constructor(private http: Http) {}

 // Angular 2 Life Cycle event when component has been initialized
 ngOnInit() {
   this.getAllPeople();
 }

 // Add one person to the API
 addPerson(email, password) {
   this.http.post(`${this.API}/users`, {email, password})
     .map(res => res.json())
     .subscribe(() => {
       this.getAllPeople();
     })
 }

 // Get all users from the API
 getAllPeople() {
   this.http.get(`${this.API}/users`)
     .map(res => res.json())
     .subscribe(people => {
       console.log(people)
       this.people = people
     })
 }
}

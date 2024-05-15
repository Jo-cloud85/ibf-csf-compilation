import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {

  /* The ngOnChanges lifecycle hook is called when Angular detects changes to input properties of the 
  component. However, in your UserSkillsComponent class, you haven't defined any input properties, so 
  Angular has no changes to detect and hence ngOnChanges is not triggered.

  To trigger ngOnChanges, you need to have input properties decorated with @Input() decorator in
  user-skills.component.ts. */
  myInput: string = 'hello';
}

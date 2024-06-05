import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-user-skills',
  templateUrl: './user-skills.component.html',
  styleUrl: './user-skills.component.css'
})
export class UserSkillsComponent implements OnInit, OnChanges {

  /* The ngOnChanges lifecycle hook is called when Angular detects changes to input properties of the 
  component. However, if in your UserSkillsComponent class you haven't defined any input properties, so 
  Angular has no changes to detect and hence ngOnChanges is not triggered.

  To trigger ngOnChanges, you need to have input properties decorated with @Input() decorator in
  user-skills.component.ts. */
  @Input() someInputProperty: string = ''; // this is just testing for ngOnChanges

  skillForm!: FormGroup;

  /////////////////// On Lifecycle //////////////////////////
  // Get called 1st
  constructor(private formBuilder: FormBuilder) {
    // console.log("1. constructor is called")
  }

  // 2nd
  ngOnChanges(changes: SimpleChanges): void {
      // console.log("2. ngOnChanges is called")
      // console.log(changes);
  }

  // 3rd
  ngOnInit(): void {
    // console.log("3. ngOnInit is called")
    this.skillForm = this.formBuilder.group({
      // type: '',
      skills: this.formBuilder.array([])
    });
  }

  // // 4th
  // ngDoCheck(): void {
  //   console.log('4. ngDoCheck is called');
  // }

  // // 5th -  called only once -------------
  // ngAfterContentInit(): void {
  //   console.log('5. ngAfterContentInit is called');
  // }

  // // 6th -------------
  // // Also get called everytime after ngDoCheck gets called again
  // ngAfterContentChecked(): void {
  //     console.log('6. ngAfterContentChecked is called');
  // }

  // // 7th -------------
  // // Gives you access to the template elements. You can then access them and use their 
  // // values and so on. Before this hook is reached, you cannot do that. Thats why, the 
  // // this.header.nativeElement.textContent under ngOnInit() prints nothing
  // ngAfterViewInit(): void {
  //     console.log('7. ngAfterViewInit is called');
  // }

  // // 8th  -------------
  // ngAfterViewChecked(): void {
  //     console.log('8. ngAfterViewChecked is called --------- ');
  // }
  //////////////////////////////////////////////////////////////

  getSkills(): FormArray {
    return this.skillForm.get("skills") as FormArray;
  }

  private newSkill(): FormGroup {
    return this.formBuilder.group({
      skillname: '',
      experience: ''
    })
  }

  addSkill() {
    this.getSkills().push(this.newSkill());
  }

  removeSkill(i: number) {
    this.getSkills().removeAt(i);
  }

  onSubmit() {
    console.log(this.skillForm.value);
  }
}

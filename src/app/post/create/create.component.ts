import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostService } from '../post.service';
import { Router } from '@angular/router';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-create',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './create.component.html',
  styleUrl: './create.component.css'
})

export class CreateComponent {

  form!: FormGroup;
  id!: number;
  post: any = {};
    
  constructor(
    public postService: PostService,
    private router: Router
  ) { }
    
  ngOnInit(): void {
    this.postService.getAll().subscribe((data: any)=>{
      this.id = data.length+1;
      this.form.patchValue({ id: this.id });
    }) 

    this.form = new FormGroup({
      id: new FormControl(''),
      bookName: new FormControl('', Validators.required),
      bookDesc: new FormControl('', Validators.required),
      bookAuthor: new FormControl('', Validators.required),
      noOfPages: new FormControl('', [Validators.required, Validators.pattern('^[0-9]+$')]),
      bookCategory: new FormControl('', Validators.required),
      bookPrice: new FormControl('', [Validators.required, Validators.pattern('^[0-9]+$')]),
      releasedYear: new FormControl('', [Validators.required, Validators.pattern('^[0-9]+$')]),
    });
  }
    
  get f(){
    return this.form.controls;
  }

  goBack(){
    this.router.navigate(['/post/index']);
  }

  submit(){
    console.log(this.form.value);
    this.postService.create(this.form.value).subscribe((res:any) => {
         console.log('Post created successfully!');
         this.router.navigateByUrl('post/index');
    })
  }
}

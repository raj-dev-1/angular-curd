import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PostService } from '../post.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-edit',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './edit.component.html',
  styleUrl: './edit.component.css'
})

export class EditComponent {

  id!: number;
  post: any;
  form!: FormGroup;
    
  constructor(
    public postService: PostService,
    private route: ActivatedRoute,
    private router: Router
  ) { }
    
  ngOnInit(): void {
    this.id = this.route.snapshot.params['postId'];
    this.postService.find(this.id).subscribe((data: any)=>{
      this.post = data[0];
    }); 
      
    this.form = new FormGroup({
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
    this.postService.update(this.id, this.form.value).subscribe((res:any) => {
         console.log('Post updated successfully!');
         this.router.navigateByUrl('post/index');
    })
  }

}

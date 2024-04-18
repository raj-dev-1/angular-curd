import { Component } from '@angular/core';

import { PostService } from '../post.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Post } from '../post';

@Component({
  selector: 'app-view',
  standalone: true,
  imports: [],
  templateUrl: './view.component.html',
  styleUrl: './view.component.css'
})
export class ViewComponent {

  id!: number;
  post:any;

  constructor(
    public postService: PostService,
    private route: ActivatedRoute,
    private router: Router
   ) { }
    
  ngOnInit(): void {
    this.id = this.route.snapshot.params['postId'];
        console.log(this.id);
    this.postService.find(this.id).subscribe((data: any)=>{
      console.log(data);
      this.post = data[0];
    });
  }
  goBack(){
    this.router.navigate(['/post/index']);
  }

}

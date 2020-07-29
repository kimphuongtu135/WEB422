import { Component, OnInit, Input } from '@angular/core';
import { BlogPost } from '../BlogPost';
@Component({
  selector: 'app-lastest-posts',
  templateUrl: './lastest-posts.component.html',
  styleUrls: ['./lastest-posts.component.css'],
})
export class LastestPostsComponent implements OnInit {
  @Input() posts: BlogPost;
  constructor() {}

  ngOnInit(): void {}
}

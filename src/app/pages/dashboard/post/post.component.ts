import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrl: './post.component.scss'
})
export class PostComponent {
  @Input({ required: true }) createdBy: string;
  @Input({ required: true }) userPicture: string;
  @Input({ required: true }) title: string;
  @Input({ required: true }) description: string;
  @Input({ required: true }) photo: string;
  @Input({ required: true }) idLink: number;

}

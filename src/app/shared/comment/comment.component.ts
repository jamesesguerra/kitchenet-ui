import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrl: './comment.component.scss'
})
export class CommentComponent {
  @Input({ required: true }) content!: string;
  @Input() rating: number;
  @Input({ required: true }) createdBy!: string;
  @Input({ required: true }) userPicture!: string;
  @Input() createdAt: Date;
  @Input({ required: true }) userId: string;
}

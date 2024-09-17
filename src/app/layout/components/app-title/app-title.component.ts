import { Component, Input } from '@angular/core';
import { LayoutService } from '../../service/app.layout.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-title',
  templateUrl: './app-title.component.html',
  styleUrl: './app-title.component.scss'
})
export class AppTitleComponent {
  title: Observable<string>;

  constructor(public layoutService: LayoutService) {
    this.title = this.layoutService.pageTitle$;
  }
}

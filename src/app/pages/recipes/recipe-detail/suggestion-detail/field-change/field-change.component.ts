import { Component, Input, OnInit } from '@angular/core';
import { Delta } from 'quill/core';
import { DiffService } from 'src/app/services/diff.service';

@Component({
  selector: 'app-field-change',
  templateUrl: './field-change.component.html',
  styleUrl: './field-change.component.scss'
})
export class FieldChangeComponent implements OnInit {
  @Input({ required: true }) fieldName: string;
  @Input({ required: true }) oldContent: string | Delta;
  @Input({ required: true }) newContent: string | Delta;

  constructor(private diffService: DiffService) {

  }

  ngOnInit(): void {
  }

  computeDiff() {
    return this.diffService.computeDiff(this.oldContent, this.newContent);
  }
}

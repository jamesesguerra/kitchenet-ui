import {
  Component,
  Input,
  AfterViewInit,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import Quill from 'quill';
import { Delta } from 'quill/core';
import { DiffService } from 'src/app/services/diff.service';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrl: './editor.component.scss'
})
export class EditorComponent implements AfterViewInit, OnChanges {
  @Input({ required: true }) editorName!: string;
  @Input() isReadOnly: boolean = false;
  @Input() placeholder: string;
  @Input() initialContent: string;
  @Input() content: Delta;
  @Input() editorHeight: string = '150px';

  quill: Quill;

  constructor(private diffService: DiffService) {
    
  }

  ngOnChanges(changes: SimpleChanges): void {
      if (changes['content'] && this.quill != undefined) {
        this.quill.setContents(changes["content"].currentValue);
      }

      if (changes['initialContent'] && this.quill != undefined) {
        this.quill.clipboard.dangerouslyPasteHTML(this.initialContent);
      }
  }

  ngAfterViewInit(): void {
    this.configureEditor();
  }

  configureEditor() {
    var toolbarOptions = this.isReadOnly ? null :
      [
        [{ header: [1, 2, false] }],
        ['bold', 'italic', 'underline'],
        ['link', 'image'],
        [{ 'list': 'ordered'}, { 'list': 'bullet' }, { 'list': 'check' }]
      ];
    
    this.quill = new Quill(`#${this.editorName}`, {
      readOnly: this.isReadOnly,
      modules: {
        toolbar: toolbarOptions
      },
      placeholder: this.placeholder,
      theme: 'snow'
    });
  }

  onClick() {
    var oldTitle = "Creamy Garlic Chicken"
    var newTitle = "Creamy garlic Chicken with Mushrooms"

    const diff = this.diffService.computeDiff(oldTitle, newTitle);
    
    this.quill.setContents(diff);
  }
}

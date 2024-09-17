import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { StyleClassModule } from 'primeng/styleclass';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { AvatarModule } from 'primeng/avatar';

import { ModalComponent } from './modal/modal.component';
import { CommentComponent } from './comment/comment.component';
import { EditorComponent } from './editor/editor.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ButtonModule,
        DialogModule,
        InputTextModule,
        StyleClassModule,
        AvatarModule,
    ],
    declarations: [
        ModalComponent,
        CommentComponent,
        EditorComponent
    ],
    exports: [
        ModalComponent,
        CommentComponent,
        EditorComponent
    ]
})
export class SharedModule {}
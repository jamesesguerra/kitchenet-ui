import { Injectable } from '@angular/core';
import { Delta } from 'quill/core';

@Injectable({
  providedIn: 'root'
})
export class DiffService {

  constructor() { }

  computeDiff(
    oldContent: string | Delta,
    newContent: string | Delta
  ): Delta {
    var oldDelta: Delta;
    var newDelta: Delta;

    if (typeof(oldContent) == "string" && typeof(newContent) == "string") {
      oldDelta = new Delta();
      newDelta = new Delta();
      
      oldDelta.insert(oldContent);
      newDelta.insert(newContent);
    } else if (oldContent instanceof Delta || newContent instanceof Delta) {
      oldDelta = oldContent as Delta;
      newDelta = newContent as Delta;
    } else {
      throw new Error("Invalid arguments. Must be type string or Delta");
    }

    var diff = oldDelta.diff(newDelta);

    for (var i = 0; i < diff.ops.length; i++) {
      var op = diff.ops[i];
      if (op.hasOwnProperty('insert')) {
        op.attributes = {
          background: "#cce8cc",
          color: "#003700"
        };
      }
      if (op.hasOwnProperty('delete')) {
        op.retain = op.delete;
        delete op.delete;
        op.attributes = {
          background: "#e8cccc",
          color: "#370000",
          strike: true
        };
      }
    }

    return oldDelta.compose(diff);
  }
}

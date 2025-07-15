import { Directive, HostBinding, HostListener, Output, EventEmitter } from '@angular/core';
import { FileHandle } from './_model/file-handle-model';
import { DomSanitizer } from '@angular/platform-browser';

@Directive({
  selector: '[appDrag]'
})
export class DragDirective {
  @Output() files: EventEmitter<FileHandle[]> = new EventEmitter();
  @HostBinding("style.background") private background = "#eee";

  constructor(private sanitizer: DomSanitizer) {}

  @HostListener("dragover", ["$event"])
  public onDragOver(evt: DragEvent) {
    evt.preventDefault();
    evt.stopPropagation();
    this.background = "#999";
  }

  @HostListener("dragleave", ["$event"])
  public onDragLeave(evt: DragEvent) {
    evt.preventDefault();
    evt.stopPropagation();
    this.background = "#eee";
  }

  @HostListener("drop", ["$event"])
  public onDrop(evt: DragEvent) {
    evt.preventDefault(); // ✅ Prevents the default file opening behavior
    evt.stopPropagation();
    this.background = "#eee";

    const files: FileHandle[] = [];
    if (evt.dataTransfer && evt.dataTransfer.files.length > 0) {
      for (let i = 0; i < evt.dataTransfer.files.length; i++) {
        const file = evt.dataTransfer.files[i];
        const url = this.sanitizer.bypassSecurityTrustUrl(window.URL.createObjectURL(file));
        files.push({ file, url });
      }
      this.files.emit(files); // ✅ Emits the file array
    }
  }
}

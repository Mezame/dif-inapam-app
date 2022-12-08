import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { imageSizeValidator } from './validators/file-size-validator';
import { imageTypeValidator } from './validators/file-type-validator';

@Component({
  selector: 'app-input-file-image',
  templateUrl: './input-file-image.component.html',
  styleUrls: ['./input-file-image.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: InputFileImageComponent,
      multi: true,
    },
  ],
})
export class InputFileImageComponent implements ControlValueAccessor {
  file?: File;

  fileUrl?: SafeUrl;

  disabled = false;

  validationError: { imageType?: boolean; imageSize?: boolean } | null = null;

  onChange = (file: File) => {};

  onTouched = () => {};

  @Input() hint?: string;

  constructor(private sanitizer: DomSanitizer) {}

  writeValue(obj: any): void {}

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  onClick(inputFileElement: HTMLInputElement) {
    this.onTouched();

    inputFileElement.click();
  }

  onInputFile(inputFileElement: HTMLInputElement) {
    const file = inputFileElement.files![0];

    if (!file) return;

    if (this.isValidFile(file)) {
      this.file = file;

      this.displayImage(this.file);

      this.onChange(this.file);
    } else {
      this.fileUrl = undefined;

      this.file = undefined;

      this.onChange(this.file!);
    }
  }

  displayImage(file: File) {
    if (!file) return;

    const objectUrl = URL.createObjectURL(file);

    if (this.fileUrl) {
      URL.revokeObjectURL(objectUrl);
    }

    this.fileUrl = this.sanitizer.bypassSecurityTrustUrl(objectUrl);
  }

  removeImage() {
    this.fileUrl = undefined;

    this.file = undefined;

    this.validationError = null;

    this.onChange(this.file!);
  }

  isValidFile(file: File): boolean {
    if (!file) return false;

    if (imageTypeValidator(file)) {
      this.validationError = imageTypeValidator(file);

      return false;
    }

    if (imageSizeValidator(file)) {
      this.validationError = imageSizeValidator(file);

      return false;
    }

    return true;
  }
}

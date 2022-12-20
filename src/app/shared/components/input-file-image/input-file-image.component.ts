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
  file!: File | null;

  fileUrl?: SafeUrl;

  disabled = false;

  validationError: { imageType?: boolean; imageSize?: boolean } | null = null;

  onChange = ({}) => {};

  onTouched = () => {};

  @Input() hint?: string;

  constructor(private sanitizer: DomSanitizer) {}

  writeValue(obj: any) {
    if (obj && obj.url) {
      this.fileUrl = this.sanitizer.bypassSecurityTrustUrl(obj.url);
    }
  }

  registerOnChange(fn: any) {
    this.onChange = fn;
  }

  registerOnTouched(fn: any) {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean) {
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

      this.onChange({ blob: this.file });
    } else {
      this.fileUrl = undefined;

      this.file = null;

      this.onChange({ blob: null });
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

    this.file = null;

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

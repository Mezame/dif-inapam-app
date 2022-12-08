export function imageSizeValidator(file: File): { imageSize: boolean } | null {
  const error = { imageSize: true };

  if (!file) return null;

  if (file.size > 1 * 1024 * 1024) {
    return error;
  } else return null;
}

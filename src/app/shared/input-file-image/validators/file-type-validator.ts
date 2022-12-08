export function imageTypeValidator(file: File): { imageType: boolean } | null {
  const error = { imageType: true };

  if (!file) return null;

  if (
    file.type !== 'image/jpg' &&
    file.type !== 'image/jpeg' &&
    file.type !== 'image/png'
  ) {
    return error;
  } else return null;
}

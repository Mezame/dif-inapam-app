export function generateWeakPassword(): string {
    //https://stackoverflow.com/a/50901817/20135116
    const weakPassword = Buffer.from(Math.random().toString())
      .toString('base64')
      .substring(10, 18);
  
    return weakPassword;
  }
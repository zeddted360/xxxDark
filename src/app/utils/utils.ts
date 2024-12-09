export function generateUsername() {
  const chars = "abcdefghijklmnopqrstuvwxyz";
  const numbers = "0123456789";
  let username = "";

  for (let i = 0; i < 6; i++) {
    username += chars.charAt(Math.floor(Math.random() * chars.length));
  }

  for (let i = 0; i < 4; i++) {
    username += numbers.charAt(Math.floor(Math.random() * numbers.length));
  }

  return username;
}


export default generateUsername;

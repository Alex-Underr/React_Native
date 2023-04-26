export default function formattingDate() {
  const date = new Date().getDate();
  const month = new Date().getMonth() + 1;
  const year = new Date().getFullYear();
  const hours = new Date().getHours() + 3;
  const min = new Date().getMinutes();
  const sec = new Date().getSeconds();

  const dateString =
    date + "." + month + "." + year + " | " + hours + ":" + min + ":" + sec;

  return dateString;
}

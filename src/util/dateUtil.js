export function formatDate(dateString) {
    const date = new Date(dateString);
  
    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();
  
    // Ensuring the day and month are always 2 digits long
    day = day < 10 ? '0' + day : day;
    month = month < 10 ? '0' + month : month;
  
    const formattedDate = `${month}/${day}/${year}`;
  
    return formattedDate;
  }
const getCreatingDate = () => {
    const date = new Date();
    const day = date.getDate();
    const month = date.getMonth();
    const year = date.getFullYear();
    const hours = date.getHours();
    const minutes = date.getMinutes();
  
    const months = [
      "Janvier",
      "Février",
      "Mars",
      "Avril",
      "Mai",
      "Juin",
      "Juillet",
      "Août",
      "Septembre",
      "Octobre",
      "Novembre",
      "Décembre",
    ];
  
    const refactoDay = day < 10 ? `0${day}` : `${day}`;
    const refactoMonth = `${months[month]}`;
  
    return `le ${refactoDay}/${refactoMonth}/${year} à ${hours}:${minutes}`;
  };

  module.exports = getCreatingDate;
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
  const refactoHours = hours < 10 ? `0${hours}` : `${hours}`;
  const refactoMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`;

  return `le ${refactoDay}/${refactoMonth}/${year} à ${refactoHours}:${refactoMinutes}`;
};

module.exports = getCreatingDate;

const aulas = JSON.parse(localStorage.getItem("dbfunc"));
const dias = Array.from(document.querySelectorAll("td[id^='day']"));

for (let aula of aulas) {
  const dataAula = new Date(aula.data);
  dataAula.setUTCHours(0, 0, 0, 0);
  const diaAula = dataAula.getUTCDate() + 1;

  const diaElement = dias.find(dia => dia.id === `day${diaAula - 1}`);

  if (diaElement !== undefined) {
    const spanElement = document.createElement("span");
    spanElement.textContent = `${aula.professor} - ${aula.sala}`;
    diaElement.appendChild(spanElement);
    spanElement.style.display = "flex";
    spanElement.style.justifyContent = "center";
    spanElement.style.alignItems = "center";
    spanElement.style.backgroundColor = "#d3d3d3";
    spanElement.style.margin = "4px";
    spanElement.style.padding = "4px";
    spanElement.style.borderRadius = "10px";
  }
}

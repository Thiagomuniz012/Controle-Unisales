// recupera as informações das aulas do localStorage
const aulas = JSON.parse(localStorage.getItem("dbfunc"));

// cria um array com os elementos HTML das tds
const dias = Array.from(document.querySelectorAll("td[id^='day']"));

// percorre cada aula
for (let aula of aulas) {

  // cria um objeto de data a partir da string de data da aula
  const dataAula = new Date(aula.data);
  
  // define a hora da data como zero para evitar problemas de fuso horário
  dataAula.setHours(0, 0, 0, 0);

  // obtém o dia do mês da data da aula
  const diaAula = dataAula.getDate() + 1;

  // encontra o elemento HTML da td correspondente ao dia da aula
  const diaElement = dias.find(dia => dia.id === `day${diaAula}`);
  


  // cria um novo elemento <span> para as informações da aula
  const spanElement = document.createElement("span");
  
  // define o texto do <span> com as informações da aula
  spanElement.textContent = `${aula.professor} - ${aula.sala}` ;

  // adiciona o <span> como filho do elemento que representa o dia da aula
  diaElement.appendChild(spanElement);
  
  // define o estilo de posicionamento do <span>
  spanElement.style.display = "flex";
  spanElement.style.justifyContent = "center";
  spanElement.style.alignItems = "center";
  spanElement.style.backgroundColor = "#d3d3d3";
  spanElement.style.margin = "4px"
  spanElement.style.padding = "4px"
  spanElement.style.borderRadius = "10px"
}
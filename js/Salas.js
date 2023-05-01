const modal = document.querySelector('.modal-container')
const tbody = document.querySelector('tbody')
const sdata = document.querySelector('#m-data')
const sprofessor = document.querySelector('#m-professor')
const sSala = document.querySelector('#m-sala')
const btnSalvar = document.querySelector('#btnSalvar')

let itens
let id

const getItensBD = () => JSON.parse(localStorage.getItem('dbfunc')) ?? []
const setItensBD = () => localStorage.setItem('dbfunc', JSON.stringify(itens))

function loadItens() {
    itens = getItensBD()
    tbody.innerHTML = ''
    itens.forEach((item, index) => {
      insertItem(item, index)
    })
}

// recupera os cursos do localStorage e preenche as opções do select
const preencherSelectCursos = () => {
  // recupera o valor associado à key "cursos"
  const cursosValor = localStorage.getItem("db_prof");

  // verifica se há dados no localStorage para os cursos
  if (cursosValor) {
    // transforma a string em um array de objetos
    const cursosArray = JSON.parse(cursosValor);

    // seleciona o elemento <select> no HTML
    const selectCursos = document.querySelector("#m-professor");

    // limpa as opções existentes
    selectCursos.innerHTML = "";

    // cria uma nova opção para cada curso
    cursosArray.forEach(curso => {
      // cria uma nova opção
      const novaOpcao = document.createElement("option");

      // define o texto da opção como o nome do curso atual
      novaOpcao.textContent = curso.professor;

      // adiciona o valor do curso como um atributo da opção
      novaOpcao.setAttribute("value", curso.Valor);

      // adiciona a opção ao elemento <select>
      selectCursos.appendChild(novaOpcao);
    });
  }
};

// chama a função para preencher as opções do select
preencherSelectCursos();


loadItens()

function insertItem(item, index) {
    let tr = document.createElement('tr')
  
    tr.innerHTML = `
      <td>${item.data}</td>
      <td>${item.professor}</td>
      <td>${item.sala}</td>
      <td class="acao">
        <button onclick="editItem(${index})"><i class='bx bx-edit' ></i></button>
      </td>
      <td class="acao">
        <button onclick="deleteItem(${index})"><i class='bx bx-trash'></i></button>
      </td>
    `
    tbody.appendChild(tr)
}

function openModal(edit = false, index = 0) {
    modal.classList.add('active')
  
    modal.onclick = e => {
      if (e.target.className.indexOf('modal-container') !== -1) {
        modal.classList.remove('active')
      }
    }
  
    if (edit) {
      sdata.value = itens[index].data
      sprofessor.value = itens[index].professor
      sSala.value = itens[index].sala
      id = index
    } else {
      sdata.value = ''
      sprofessor.value = ''
      sSala.value = ''
    }
    
}

btnSalvar.onclick = e => {
    if (sdata.value == '' || sprofessor.value == '' || sSala.value == '') {
        return
    }
  
    e.preventDefault();
  
    if (id !== undefined) {
      itens[id].data = sdata.value
      itens[id].professor = sprofessor.value
      itens[id].sala = sSala.value
    } else {
      itens.push({'data': sdata.value, 'professor': sprofessor.value, 'sala': sSala.value})
    }
  
    setItensBD()
  
    modal.classList.remove('active')
    loadItens()
    id = undefined
}
  

function editItem(index) {
    openModal(true, index)
}
  
function deleteItem(index) {
    itens.splice(index, 1)
    setItensBD()
    loadItens()
}
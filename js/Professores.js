

/**'use strict' -> restringe o uso de cons, var, let, ...*/

const openModal = () => document.getElementById('modal')
    .classList.add('active')

const closeModal = () => {
    clearFields()
    document.getElementById('modal').classList.remove('active')
}


const getLocalStorage = () => JSON.parse(localStorage.getItem('db_prof')) ?? []
const setLocalStorage = (dbProf) => localStorage.setItem("db_prof", JSON.stringify(dbProf))

// CRUD - create read update delete
const deleteProf = (index) => {
    const dbProf = readProf()
    dbProf.splice(index, 1)
    setLocalStorage(dbProf)
}

const updateProf = (index, prof) => {
    const dbProf = readProf()
    dbProf[index] = prof
    setLocalStorage(dbProf)
}

/**mandando para o local storage */
const readProf = () => getLocalStorage()


const createProf = (prof) => {
    const dbProf = getLocalStorage()
    dbProf.push (prof)
    setLocalStorage(dbProf)
}

const isValidFields = () => {
    return document.getElementById('form').reportValidity()
}

// recupera os cursos do localStorage e preenche as opções do select
const preencherSelectCursos = () => {
    // recupera o valor associado à key "cursos"
    const cursosValor = localStorage.getItem("db_Curso");
  
    // verifica se há dados no localStorage para os cursos
    if (cursosValor) {
      // transforma a string em um array de objetos
      const cursosArray = JSON.parse(cursosValor);
  
      // seleciona o elemento <select> no HTML
      const selectCursos = document.querySelector("#curso");
  
      // limpa as opções existentes
      selectCursos.innerHTML = "";
  
      // cria uma nova opção para cada curso
      cursosArray.forEach(curso => {
        // cria uma nova opção
        const novaOpcao = document.createElement("option");
  
        // define o texto da opção como o nome do curso atual
        novaOpcao.textContent = curso.Nome;
  
        // adiciona o valor do curso como um atributo da opção
        novaOpcao.setAttribute("value", curso.Valor);
  
        // adiciona a opção ao elemento <select>
        selectCursos.appendChild(novaOpcao);
      });
    }
  };
  
  // chama a função para preencher as opções do select
  preencherSelectCursos();

  // recupera os cursos do localStorage e preenche as opções do select
const preencherSelectDesafios = () => {
    // recupera o valor associado à key "cursos"
    const cursosValor = localStorage.getItem("listaDesafios");
  
    // verifica se há dados no localStorage para os cursos
    if (cursosValor) {
      // transforma a string em um array de objetos
      const cursosArray = JSON.parse(cursosValor);
  
      // seleciona o elemento <select> no HTML
      const selectCursos = document.querySelector("#desafio");
  
      // limpa as opções existentes
      selectCursos.innerHTML = "";
  
      // cria uma nova opção para cada curso
      cursosArray.forEach(curso => {
        // cria uma nova opção
        const novaOpcao = document.createElement("option");
  
        // define o texto da opção como o nome do curso atual
        novaOpcao.textContent = curso.nomeDesafio;
  
        // adiciona o valor do curso como um atributo da opção
        novaOpcao.setAttribute("value", curso.Valor);
  
        // adiciona a opção ao elemento <select>
        selectCursos.appendChild(novaOpcao);
      });
    }
  };
  
  // chama a função para preencher as opções do select
  preencherSelectDesafios();
  
  
//Interação com o layout

const clearFields = () => {
    const fields = document.querySelectorAll('.modal-field')
    fields.forEach(field => field.value = "")
    document.getElementById('professor').dataset.index = 'new'
    document.querySelector(".modal-header>h2").textContent  = 'Novo Professor'
}

/**salvar informação do professor */


const saveProf = () => {
    if (isValidFields()) {
        const prof = {
            professor : document.getElementById('professor').value,
            desafio : document.getElementById('desafio').value,
            curso : document.getElementById('curso').value

        }

        /**crud de alteração */


        const index = document.getElementById('professor').dataset.index
        if (index == 'new') {
            createProf(prof)
            updateTable()
            closeModal()
        } else {
            updateProf(index, prof)
            updateTable()
            closeModal()
        }
    }
}



/**tudo que é salvo no localStorage vem para cá, se quiser acrescentar uma tabela, add ela aqui
 * (***) tbody
 */
const createRow = (prof, index) => {
    const newRow = document.createElement('tr')
    newRow.innerHTML = `

        <td>${prof.professor}</td>
        <td>${prof.curso}</td>
        <td>${prof.desafio}</td>

        <td>
            <button type="button" class="button green" id="edit-${index}">Editar</button>
            <button type="button" class="button red" id="delete-${index}" >Excluir</button>
        </td>
    `
    document.querySelector('#tableProf>tbody').appendChild(newRow)
}

const clearTable = () => {
    const rows = document.querySelectorAll('#tableProf>tbody tr')
    rows.forEach(row => row.parentNode.removeChild(row))
}

const updateTable = () => {
    const dbProf = readProf()
    clearTable()
    dbProf.forEach(createRow)
}

const fillFields = (prof) => {
    document.getElementById('professor').value = prof.professor

    document.getElementById('desafio').value = prof.desafio
    document.getElementById('curso').value = prof.curso
    document.getElementById('professor').dataset.index = prof.index

}


const editProf = (index) => {
    const prof = readProf()[index]
    prof.index = index
    fillFields(prof)
    document.querySelector(".modal-header>h2").textContent  = `Editando ${prof.professor}`
    openModal()
}

/**const de mensagem d eprompt para confirmação de delete */


const editDelete = (event) => {
    if (event.target.type == 'button') {

        const [action, index] = event.target.id.split('-')

        if (action == 'edit') {
            editProf(index)
        } else {
            const prof = readProf()[index]
            const response = confirm(`Deseja realmente excluir o professor ${prof.professor}`)
            if (response) {
                deleteProf(index)
                updateTable()
            }
        }
    }
}

updateTable()

// Eventos
document.getElementById('cadastrarProfessor')
    .addEventListener('click', openModal)

/**fecha */
document.getElementById('modalClose')
    .addEventListener('click', closeModal)

    /**salva */

document.getElementById('salvar')
    .addEventListener('click', saveProf)

    /**deleta */

document.querySelector('#tableProf>tbody')
    .addEventListener('click', editDelete)

    /**cancela */

document.getElementById('cancelar')
    .addEventListener('click', closeModal)
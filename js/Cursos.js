
'use strict'

const openModal = () => document.getElementById('modal')
    .classList.add('active')

const closeModal = () => {
    clearFields()
    document.getElementById('modal').classList.remove('active')
}

//
const getLocalStorage = () => JSON.parse(localStorage.getItem('db_Curso')) ?? []
const setLocalStorage = (dbCurso) => localStorage.setItem("db_Curso", JSON.stringify(dbCurso))

// Delete
const deleteCurso = (index) => {
    const dbCurso = readCurso()
    dbCurso.splice(index, 1)
    setLocalStorage(dbCurso)
}
// Update
const updateCurso = (index, Curso) => {
    const dbCurso = readCurso()
    dbCurso[index] = Curso
    setLocalStorage(dbCurso)
}
// Read 
const readCurso = () => getLocalStorage()

const createCurso = (Curso) => {
    const dbCurso = getLocalStorage()
    dbCurso.push (Curso)
    setLocalStorage(dbCurso)
}

const isValidFields = () => {
    return document.getElementById('form').reportValidity()
}

//Interação com o layout

const clearFields = () => {
    const fields = document.querySelectorAll('.modal-field')
    fields.forEach(field => field.value = "")
    document.getElementById('nomeCurso').dataset.index = 'new'
    document.querySelector(".modal-header>h2").textContent  = 'Novo Curso'
}

const saveCurso = () => {
    if (isValidFields()) {
        const Curso = {
            Nome: document.getElementById('nomeCurso').value,
            Habilitação: document.getElementById('hab').value,
            Modalidade: document.getElementById('modalidade').value,
            Coordenador: document.getElementById('coord').value,
            Turno: document.getElementById('turno').value,
            Período: document.getElementById('periodo').value,
            MatrizCurricular: document.getElementById('matriz').value,
            Acc: document.getElementById('acc').value
        }
        const index = document.getElementById('nomeCurso').dataset.index
        if (index == 'new') {
            createCurso(Curso)
            updateTable()
            closeModal()
        } else {
            updateCurso(index, Curso)
            updateTable()
            closeModal()
        }
    }
}

const createRow = (Curso, index) => {
    const newRow = document.createElement('tr')
    newRow.innerHTML = `
        <td>${Curso.Nome}</td>
        <td>${Curso.Habilitação}</td>
        <td>${Curso.Modalidade}</td>
        <td>${Curso.Coordenador}</td>
        <td>${Curso.Turno}</td>
        <td>${Curso.Período}</td>
        <td>${Curso.MatrizCurricular}</td>
        <td>${Curso.Acc}</td>
        <td>
            <button type="button" class="button blue2" id="edit-${index}">Editar</button>
            <button type="button" class="button red" id="delete-${index}" >Excluir</button>
        </td>
    `
    document.querySelector('#tableCurso>tbody').appendChild(newRow)
}

const clearTable = () => {
    const rows = document.querySelectorAll('#tableCurso>tbody tr')
    rows.forEach(row => row.parentNode.removeChild(row))
}

const updateTable = () => {
    const dbCurso = readCurso()
    clearTable()
    dbCurso.forEach(createRow)
}

const fillFields = (Curso) => {
    document.getElementById('nomeCurso').value = Curso.Nome
    document.getElementById('hab').value = Curso.Habilitação
    document.getElementById('modalidade').value = Curso.Modalidade
    document.getElementById('coord').value = Curso.Coordenador
    document.getElementById('turno').value = Curso.Turno
    document.getElementById('periodo').value = Curso.Período
    document.getElementById('matriz').value = Curso.MatrizCurricular
    document.getElementById('acc').value = Curso.Acc
}

const editCurso = (index) => {
    const Curso = readCurso()[index]
    Curso.index = index
    fillFields(Curso)
    document.getElementById('nomeCurso').dataset.index = index;
    document.querySelector(".modal-header>h2").textContent  = 'Editar curso'
    openModal()
}

const editDelete = (event) => {
    if (event.target.type == 'button') {

        const [action, index] = event.target.id.split('-')

        if (action == 'edit') {
            editCurso(index)
        } else {
            const Curso = readCurso()[index]
            const response = confirm('Deseja realmente excluir este Curso')
            if (response) {
                deleteCurso(index)
                updateTable()
            }
        }
    }
}

updateTable()

// Eventos
document.getElementById('cadastrarCliente')
    .addEventListener('click', openModal)

document.getElementById('modalClose')
    .addEventListener('click', closeModal)

document.getElementById('salvar')
    .addEventListener('click', saveCurso)

document.querySelector('#tableCurso')
    .addEventListener('click', editDelete)

document.getElementById('cancelar')
    .addEventListener('click', closeModal)



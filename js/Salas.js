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
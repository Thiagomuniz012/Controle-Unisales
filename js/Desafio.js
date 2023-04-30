const exampleModal = document.getElementById('exampleModal')
if (exampleModal) {
    exampleModal.addEventListener('show.bs.modal', event => {

        const button = event.relatedTarget

        const recipient = button.getAttribute('data-bs-acao')

        const modalTitle = exampleModal.querySelector('.modal-title')

        if (recipient === "Visualizar") {
            const modalButtonSalvar = exampleModal.querySelector('.btn.btn-primary');
            modalButtonSalvar.style.display = "none";
            modalTitle.textContent = `${recipient} Desafio`

        } else {
            const modalButtonSalvar = exampleModal.querySelector('.btn.btn-primary');
            modalButtonSalvar.style.display = "block";
            modalTitle.textContent = `${recipient} Desafio`

        }

    });

    exampleModal.addEventListener('hide.bs.modal', event => {
        document.getElementById('form').reset();
        document.getElementById('inputDesafioId').value = "";
    });

}



function salvar() {
    listaDesafios = JSON.parse(localStorage.getItem('listaDesafios')) ?? [];
    console.log(listaDesafios);
    var id;

    listaDesafios.length != 0 ? listaDesafios.findLast((item) => id = item.id) : id = 0;
    console.log(id);
    console.log(document.getElementById('inputDesafioId').value);
    if (document.getElementById('inputDesafioId').value) {
        listaDesafios.forEach(value => {
            if (document.getElementById('inputDesafioId').value == value.id) {
                value.nomeDesafio = document.getElementById("inputDesafioNome").value;
                value.descricaoDesafio = document.getElementById("inputDesafioDescricao").value;
                value.materiasDesafio = document.getElementById("inputDesafioMaterias").value;
                value.periodoDesafio = document.getElementById("inputDesafioPeriodo").value;
            }
        });
        document.getElementById("inputDesafioId").value = "";
        $("#exampleModal").modal('hide');
        Swal.fire({
            icon: "success",
            title: "Editado",
            text: 'Desafio editado com sucesso!'

        });
    } else {
        var item = {
            id: id + 1,
            nomeDesafio: document.getElementById("inputDesafioNome").value,
            descricaoDesafio: document.getElementById("inputDesafioDescricao").value,
            materiasDesafio: document.getElementById("inputDesafioMaterias").value,
            periodoDesafio: document.getElementById("inputDesafioPeriodo").value,
        }
        console.log(item);
        listaDesafios.push(item);
        $("#exampleModal").modal('hide');
        Swal.fire({
            icon: "success",
            title: "Adicionado",
            text: 'Desafio adicionado com sucesso!'

        });
    }
    localStorage.setItem('listaDesafios', JSON.stringify(listaDesafios));
    pegarDados();
    document.getElementById('form').reset();
}

function pegarDados() {
    listaDesafios = JSON.parse(localStorage.getItem('listaDesafios')) ?? [];
    var table = document.getElementById("table-body");
    table.innerHTML = ``;
    listaDesafios.forEach(function (value, i) {


        table.innerHTML += `
        <tr>
            <td style="display:none;">${i + 1}</td>
            <td>${value.nomeDesafio}</td>
            <td>${value.descricaoDesafio}</td>
            <td>${value.materiasDesafio}</td>
            <td>${value.periodoDesafio}</td>
            <td>
                <button type="button" data-bs-toggle="modal" data-bs-target="#exampleModal" class="btn btn-sm btn-info" data-bs-acao="Visualizar" title="Visualizar Desafio" onclick="ler(${value.id}, '${value.nomeDesafio}', '${value.descricaoDesafio}', '${value.materiasDesafio}','${value.periodoDesafio}')">
                    <i class="bi bi-eye-fill"></i>
                </button>
                <button type="button" data-bs-toggle="modal" data-bs-target="#exampleModal" data-bs-acao="Editar" class="btn btn-sm btn-warning" title="Editar Desafio" onclick="achar(${value.id})">
                    <i class="bi bi-pencil-square"></i>
                </button>
                <button type="button"  class="btn btn-sm btn-danger" title="Excluir Desafio" onclick="removerData(${value.id})">
                    <i class="bi bi-trash"></i>
                </button>
            </td>
        
        </tr>
        `
    });
}

function achar(id) {
    listaDesafios = JSON.parse(localStorage.getItem('listaDesafios')) ?? [];
    listaDesafios.forEach(function (value) {
        if (value.id == id) {
            document.getElementById("inputDesafioId").value = id;
            document.getElementById("inputDesafioNome").value = value.nomeDesafio;
            document.getElementById("inputDesafioDescricao").value = value.descricaoDesafio;
            document.getElementById("inputDesafioMaterias").value = value.materiasDesafio;
            document.getElementById("inputDesafioPeriodo").value = value.periodoDesafio;
        }
    });
}

function ler(id, nome, descricao, materias, periodo) {
    listaDesafios = JSON.parse(localStorage.getItem('listaDesafios')) ?? [];
    listaDesafios.forEach(function (value) {
        if (value.id == id) {
            document.getElementById("inputDesafioNome").value = nome;
            document.getElementById("inputDesafioDescricao").value = descricao;
            document.getElementById("inputDesafioMaterias").value = materias;
            document.getElementById("inputDesafioPeriodo").value = periodo;
        }
    });
}

function removerData(id) {

    Swal.fire({
        icon: "warning",
        title: 'Deseja realmente excluir o Desafio? Essa ação é irreversível',
        showDenyButton: true,
        confirmButtonText: 'Excluir',
        denyButtonText: `Cancelar`,
    }).then((result) => {
        if (result.isConfirmed) {

            listaDesafios = JSON.parse(localStorage.getItem("listaDesafios")) ?? [];
            listaDesafios = listaDesafios.filter(function (value) {
                return value.id != id;
            });
            localStorage.setItem('listaDesafios', JSON.stringify(listaDesafios));
            pegarDados();
            Swal.fire('Excluido!', '', 'success')
        } else if (result.isDenied) {
            Swal.fire('Nenhum desafio foi excluído', '', 'info')
        }
    })



}
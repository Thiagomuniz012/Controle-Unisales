document.getElementById("login-button").addEventListener("click", function(event) {
    event.preventDefault();
    validateLogin();
  });

  function validateLogin() {
    // Obter os dados do Local Storage
    var storedData = localStorage.getItem("userData");
    var userData = JSON.parse(storedData);
  
    // Definir usuário e senha padrão
    var defaultEmail = "coordenador@salesiano.br";
    var defaultPassword = "coordenador2023";
  
    // Obter os dados do formulário
    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;
  
    // Verificar se os dados correspondem
    if ((userData && userData.email === email && userData.password === password) || (email === defaultEmail && password === defaultPassword)) {
      // Login bem-sucedido
      window.location.href = "Menu.html";
    } else {
      // Login mal-sucedido
      alert("Nome de usuário ou senha incorretos.");
      document.getElementById("password").value = "";
    }
  }
  
  function createAccount() {
    // Obter os dados do formulário
    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;
  
    // Criar o objeto de usuário
    var userData = {
      email: email,
      password: password
    };
  
    // Armazenar os dados no Local Storage
    localStorage.setItem("userData", JSON.stringify(userData));
  }
  

  //Validacao do login
  const form = document.getElementById('form')
  const campos = document.querySelectorAll('.required')
  const spans = document.querySelectorAll('.span-required')
  const emailRegex = /^([A-Za-z0-9_\-.])+@([A-Za-z0-9_\-.])+\.([A-Za-z]{2,4})$/;
  
  //Funcao para iniciar o erro
  function setError(index){
    campos[index].style.borderBottom = '2px solid #D91828'
    spans[index].style.display = 'block'
  }
  
  //Funcao para remover o erro
  function removeError(index){
    campos[index].style.borderBottom = ''
    spans[index].style.display = 'none'
  }
  
  //Valida o email
  function emailValidate(){
    if(!emailRegex.test(campos[0].value)){
      setError(0)
    } else {
      removeError(0)
    }
  }
  
  //Valida a senha
  function passwordValidate(){
    if(campos[1].value === ''){
      removeError(1)
    } else if(campos[1].value.length < 8){
      setError(1)
    } else {
      removeError(1)
    }
  }
  
  //Quando apagar todo o texto volta para o estado de origem
  const emailInput = document.getElementById('email');
  
  emailInput.addEventListener('input', function(event) {
    if (!event.target.value) {
      event.target.style.borderBottom = '2px solid #2B448C';
      const errorMessage = event.target.parentElement.querySelector('.span-required');
      errorMessage.style.display = 'none';
    }
  });
  
  const passwordInput = document.getElementById('password');

  passwordInput.addEventListener('input', function(event) {
    if (!event.target.value) {
      event.target.style.borderBottom = '2px solid #2B448C';
      const errorMessage = event.target.parentElement.querySelector('.span-required');
      errorMessage.style.display = 'none';
    } else {
      passwordValidate();
    }
  });

//Funcao do botao de mostrar a senha
const showpasswordInput = document.getElementById("password");
const showPasswordButton = document.getElementById("show-password");

showPasswordButton.addEventListener("mousedown", function() {
  passwordInput.type = "text";
});

showPasswordButton.addEventListener("mouseup", function() {
  passwordInput.type = "password";
});
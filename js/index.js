document.getElementById("login-button").addEventListener("click", function(event) {
    event.preventDefault();
    validateLogin();
  });

  function validateLogin() {
    // Obter os dados do Local Storage
    var storedData = localStorage.getItem("userData");
    var userData = JSON.parse(storedData);
  
    // Definir usuário e senha padrão
    var defaultUsername = "coordenador@salesiano.br"; //"coordenador@salesiano.br";
    var defaultPassword = "coordenador2023"; //"coordenador2023";
  
    // Obter os dados do formulário
    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;
  
    // Verificar se os dados correspondem
    if ((userData && userData.username === username && userData.password === password) || (username === defaultUsername && password === defaultPassword)) {
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
    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;
  
    // Criar o objeto de usuário
    var userData = {
      username: username,
      password: password
    };
  
    // Armazenar os dados no Local Storage
    localStorage.setItem("userData", JSON.stringify(userData));
  }
  
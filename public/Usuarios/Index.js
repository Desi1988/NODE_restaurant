function registrarUsuario()
{
    const username = document.getElementById("username").value
    const password = document.getElementById("password").value

    const datos = {
        username : username,
        password : password
    }

    fetch("/users",{
        method: "POST",
        body: JSON.stringify(datos),
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json",
        }
    })
    .then((respuesta) => {
        console.log(respuesta.status)
    })
    .catch()
}

function login()
{
    const username = document.getElementById("username").value
    const password = document.getElementById("password").value

    const datos = {
        username : username,
        password : password
    }

    fetch("/users/login",{
        method: "POST",
        body: JSON.stringify(datos),
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json",
        }
    })
    .then((respuesta) => {
        return respuesta.json()
    })
    .then((datos) => {
        console.log(datos)

        if(datos.logged && datos.token)
        {
            localStorage.setItem("userToken", datos.token);
        }
    })
    .catch()
}


function logOut()
{

    const userToken = localStorage.getItem("userToken")
    if(!userToken)
    {
        return window.location.href = "/Usuarios/login.html";
    }

    fetch("/users/logout",{
        method: "GET",
        headers: {
            "Authorization": "Bearer " + userToken
        }
    })
    .then((respuesta) => {
        localStorage.removeItem("userToken")
        window.location.href = "/Usuarios/login.html";
    })
    .catch()
}


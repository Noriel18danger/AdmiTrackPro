document.addEventListener('DOMContentLoaded', function() {
    // ...existing code...

    document.getElementById('show-register-form').addEventListener('click', function(event) {
        event.preventDefault();
        document.getElementById('login-form').style.display = 'none';
        document.getElementById('registro-form').style.display = 'block';
    });

    function registrarUsuario(event) {
        event.preventDefault();
        const nombre = document.getElementById('nombre').value.toLowerCase();
        const apellido = document.getElementById('apellido').value.split(' ');
        const rut = document.getElementById('rut').value;
        const recinto = document.getElementById('recinto').value;
        const correo = document.getElementById('correo').value;
        const telefono = document.getElementById('telefono').value;

        if (apellido.length > 2) {
            mostrarAlerta('Solo se permiten hasta dos apellidos.', 'error', 5000);
            return;
        }

        if (rut.length > 9) {
            mostrarAlerta('El RUT debe contener un máximo de 9 dígitos.', 'error', 5000);
            return;
        }

        if (telefono.length > 12) {
            mostrarAlerta('El número telefónico debe contener un máximo de 12 dígitos.', 'error', 5000);
            return;
        }

        const user = nombre + rut.slice(0, 4);
        const password = rut.slice(0, 4);

        const usuario = {
            nombre,
            apellido: apellido.join(' '),
            rut,
            recinto,
            correo,
            telefono,
            user,
            password,
            rol: 'Básico'
        };

        localStorage.setItem('usuario', JSON.stringify(usuario));
        mostrarAlerta('Registrado con éxito', 'success', 5000);
    }

    function iniciarSesion(event) {
        event.preventDefault();
        const user = document.getElementById('user').value;
        const password = document.getElementById('password').value;

        const usuario = JSON.parse(localStorage.getItem('usuario'));

        if (usuario && usuario.user === user && usuario.password === password) {
            mostrarAlerta('Bienvenido ' + usuario.nombre, 'success', 3000, function() {
                window.location.href = 'inicio.html';
            });
        } else {
            mostrarAlerta('Usuario o contraseña incorrectos.', 'error', 5000);
        }
    }

    function mostrarAlerta(mensaje, tipo, duracion, callback) {
        const alert = document.getElementById('alert');
        alert.textContent = mensaje;
        alert.className = 'alert ' + tipo;
        alert.style.display = 'block';
        setTimeout(function() {
            alert.style.display = 'none';
            if (callback) callback();
        }, duracion);
    }

    document.getElementById('registro-form').addEventListener('submit', registrarUsuario);
    document.getElementById('login-form').addEventListener('submit', iniciarSesion);

    // ...existing code...
});

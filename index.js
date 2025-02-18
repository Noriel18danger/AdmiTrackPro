document.addEventListener('DOMContentLoaded', function() {
    particlesJS('particles-js', {
        particles: {
            number: {
                value: 100,
                density: {
                    enable: true,
                    value_area: 800
                }
            },
            color: {
                value: '#6d6d6d' // Cambiar el color a gris
            },
            shape: {
                type: 'circle',
                stroke: {
                    width: 0,
                    color: '#000000'
                },
                polygon: {
                    nb_sides: 5
                }
            },
            opacity: {
                value: 0.5,
                random: false,
                anim: {
                    enable: false,
                    speed: 1,
                    opacity_min: 0.1,
                    sync: false
                }
            },
            size: {
                value: 3,
                random: true,
                anim: {
                    enable: false,
                    speed: 40,
                    size_min: 0.1,
                    sync: false
                }
            },
            line_linked: {
                enable: true,
                distance: 150,
                color: '#6d6d6d', // Cambiar el color a gris
                opacity: 0.4,
                width: 1
            },
            move: {
                enable: true,
                speed: 2, // Disminuir la velocidad de las partículas
                direction: 'none',
                random: false,
                straight: false,
                out_mode: 'out',
                bounce: false,
                attract: {
                    enable: false,
                    rotateX: 600,
                    rotateY: 1200
                }
            }
        },
        interactivity: {
            detect_on: 'canvas',
            events: {
                onhover: {
                    enable: true,
                    mode: 'repulse'
                },
                onclick: {
                    enable: true,
                    mode: 'push'
                },
                resize: true
            },
            modes: {
                grab: {
                    distance: 400,
                    line_linked: {
                        opacity: 1
                    }
                },
                bubble: {
                    distance: 400,
                    size: 40,
                    duration: 2,
                    opacity: 8,
                    speed: 3
                },
                repulse: {
                    distance: 200,
                    duration: 0.4
                },
                push: {
                    particles_nb: 4
                },
                remove: {
                    particles_nb: 2
                }
            }
        },
        retina_detect: true
    });

    particlesJS('particles-title', {
        particles: {
            number: {
                value: 100, // Aumentar la cantidad de partículas
                density: {
                    enable: true,
                    value_area: 800
                }
            },
            color: {
                value: '#ff0000'
            },
            shape: {
                type: 'circle',
                stroke: {
                    width: 0,
                    color: '#000000'
                },
                polygon: {
                    nb_sides: 5
                }
            },
            opacity: {
                value: 0.5,
                random: false,
                anim: {
                    enable: false,
                    speed: 1,
                    opacity_min: 0.1,
                    sync: false
                }
            },
            size: {
                value: 3,
                random: true,
                anim: {
                    enable: false,
                    speed: 40,
                    size_min: 0.1,
                    sync: false
                }
            },
            line_linked: {
                enable: true,
                distance: 150,
                color: '#ff0000',
                opacity: 0.4,
                width: 1
            },
            move: {
                enable: true,
                speed: 6,
                direction: 'none',
                random: false,
                straight: false,
                out_mode: 'out',
                bounce: false,
                attract: {
                    enable: false,
                    rotateX: 600,
                    rotateY: 1200
                }
            }
        },
        interactivity: {
            detect_on: 'canvas',
            events: {
                onhover: {
                    enable: true,
                    mode: 'repulse'
                },
                onclick: {
                    enable: true,
                    mode: 'push'
                },
                resize: true
            },
            modes: {
                grab: {
                    distance: 400,
                    line_linked: {
                        opacity: 1
                    }
                },
                bubble: {
                    distance: 400,
                    size: 40,
                    duration: 2,
                    opacity: 8,
                    speed: 3
                },
                repulse: {
                    distance: 200,
                    duration: 0.4
                },
                push: {
                    particles_nb: 4
                },
                remove: {
                    particles_nb: 2
                }
            }
        },
        retina_detect: true
    });

    // Eliminar animaciones del título "¡Empieza ya!"

    // Redirigir a inicio.html si se ha iniciado sesión
    if (localStorage.getItem('usuario')) {
        window.location.href = 'inicio.html';
    }

    function registrarUsuario(event) {
        event.preventDefault();
        const nombre = document.getElementById('nombre').value.toLowerCase();
        const apellido = document.getElementById('apellido').value;
        const rut = document.getElementById('rut').value;
        const recinto = document.getElementById('recinto').value;
        const correo = document.getElementById('correo').value;
        const telefono = document.getElementById('telefono').value;

        if (rut.length > 9) {
            mostrarAlerta('El RUT debe contener un máximo de 9 dígitos.', 'error', 5000);
            return;
        }

        const user = nombre + rut.slice(0, 4);
        const password = rut.slice(0, 4);

        const usuario = {
            nombre,
            apellido,
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

    // Inicializar fondo animado
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.addEventListener('DOMContentLoaded', function() {
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer();
        renderer.setSize(window.innerWidth, window.innerHeight);
        document.getElementById('background').appendChild(renderer.domElement);
    
        const geometry = new THREE.BoxGeometry(1, 1, 1);
        const material = new THREE.MeshBasicMaterial({ color: 0x6d6d6d, wireframe: true });
        const cube = new THREE.Mesh(geometry, material);
        scene.add(cube);
    
        camera.position.z = 5;
    
        function animate() {
            requestAnimationFrame(animate);
            cube.rotation.x += 0.01;
            cube.rotation.y += 0.01;
            renderer.render(scene, camera);
        }
    
        animate();
    
        // Configuración adicional para el fondo animado
        window.addEventListener('resize', () => {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        });
    });
    
})

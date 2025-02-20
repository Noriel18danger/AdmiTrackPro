document.addEventListener('DOMContentLoaded', function() {
    // Redirigir a index.html si no se ha iniciado sesión
    if (!localStorage.getItem('usuario')) {
        window.location.href = 'index.html';
    }

    particlesJS('particles-js', {
        particles: {
            number: {
                value: 300, // Aumentar la cantidad de partículas
                density: {
                    enable: true,
                    value_area: 1000
                }
            },
            color: {
                value: ['#ff0000', '#ff6347', '#ff4500'] // Colores de partículas rojas
            },
            shape: {
                type: ['circle', 'triangle', 'polygon', 'star'], // Diferentes formas de partículas
                stroke: {
                    width: 0,
                    color: '#000000'
                },
                polygon: {
                    nb_sides: 5
                },
                image: {
                    src: 'path/to/image.png',
                    width: 100,
                    height: 100
                }
            },
            opacity: {
                value: 0.8,
                random: true,
                anim: {
                    enable: true,
                    speed: 1,
                    opacity_min: 0.3,
                    sync: false
                }
            },
            size: {
                value: 4,
                random: true,
                anim: {
                    enable: true,
                    speed: 20,
                    size_min: 0.1,
                    sync: false
                }
            },
            line_linked: {
                enable: true,
                distance: 100,
                color: '#ff0000',
                opacity: 0.6,
                width: 1
            },
            move: {
                enable: true,
                speed: 6,
                direction: 'none',
                random: true,
                straight: false,
                out_mode: 'out',
                bounce: false,
                attract: {
                    enable: true,
                    rotateX: 3000,
                    rotateY: 3000
                }
            }
        },
        interactivity: {
            detect_on: 'canvas',
            events: {
                onhover: {
                    enable: true,
                    mode: 'bubble'
                },
                onclick: {
                    enable: true,
                    mode: 'repulse'
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
                    distance: 250,
                    size: 8,
                    duration: 2,
                    opacity: 0.8,
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

    function cerrarSesion() {
        localStorage.removeItem('usuario');
        window.location.href = 'index.html';
    }

    document.querySelectorAll('.icon-link').forEach(function(link) {
        link.addEventListener('click', function(event) {
            if (this.getAttribute('href') === 'index.html') {
                cerrarSesion();
                event.preventDefault();
            }
        });
    });
});

document.addEventListener('DOMContentLoaded', function() {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.getElementById('threejs-text').appendChild(renderer.domElement);

    const loader = new THREE.FontLoader();
    loader.load('https://threejs.org/examples/fonts/helvetiker_regular.typeface.json', function(font) {
        const geometry = new THREE.TextGeometry('SGCAR', {
            font: font, // Fuente del texto
            fontFamily: 'Zen Dots', // Familia de la fuente
            size: 40, // Tamaño del texto
            height: 0, // Altura del texto
            curveSegments: 40, // Número de segmentos de la curva
            bevelEnabled: true, // Habilitar el bisel
            bevelThickness: 24, // Grosor del bisel
            bevelSize: 6, // Tamaño del bisel
            bevelOffset: 0, // Desplazamiento del bisel
            bevelSegments: 10 // Número de segmentos del bisel
        });
        const material = new THREE.MeshBasicMaterial({ color: 0x000000 }); // Color del texto
        const textMesh = new THREE.Mesh(geometry, material); // Malla del texto
        scene.add(textMesh); // Añadir el texto a la escena

        textMesh.position.set(0, 0, 0); // Posición del texto
        camera.position.z = 600; // Posición de la cámara
        camera.position.y = 20; // Posición de la cámara

        function animate() { // Función de animación
            requestAnimationFrame(animate); // Animación de fotogramas
            textMesh.rotation.y += 0.01; // Velocidad de rotación del texto en el eje Y
            renderer.render(scene, camera); // Renderizar la escena 
        }

        animate(); // Iniciar la animación
    });

    window.addEventListener('resize', () => { // Redimensionar la ventana
        camera.aspect = window.innerWidth / window.innerHeight; // Relación de aspecto de la cámara     
        camera.updateProjectionMatrix(); // Actualizar la matriz de proyección de la cámara
        renderer.setSize(window.innerWidth, window.innerHeight); // Redimensionar el renderizador
    });
});

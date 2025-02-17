document.addEventListener('DOMContentLoaded', function() {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.getElementById('grafico3d').appendChild(renderer.domElement);

    camera.position.z = 5;

    function createBar(x, y, z, color) {
        const geometry = new THREE.BoxGeometry(0.1, y, 0.1);
        const material = new THREE.MeshBasicMaterial({ color: color });
        const bar = new THREE.Mesh(geometry, material);
        bar.position.set(x, y / 2, z);
        scene.add(bar);
    }

    function fetchData() {
        const inventory = JSON.parse(localStorage.getItem('inventory')) || [];
        const entrada = JSON.parse(localStorage.getItem('entrada')) || [];
        const salida = JSON.parse(localStorage.getItem('salida')) || [];

        const fechas = [...new Set([...inventory.map(item => item.fecha), ...entrada.map(item => item.fecha), ...salida.map(item => item.fecha)])];
        fechas.sort();

        scene.clear();

        fechas.forEach((fecha, i) => {
            const invY = inventory.filter(item => item.fecha === fecha).reduce((sum, item) => sum + item.cantidad, 0);
            const entY = entrada.filter(item => item.fecha === fecha).reduce((sum, item) => sum + item.cantidad, 0);
            const salY = salida.filter(item => item.fecha === fecha).reduce((sum, item) => sum + item.cantidad, 0);

            createBar(i * 0.2, invY, 0, 0x0000ff);
            createBar(i * 0.2, entY, 0.2, 0x00ff00);
            createBar(i * 0.2, salY, -0.2, 0xff0000);
        });

        renderer.render(scene, camera);
    }

    function animate() {
        requestAnimationFrame(animate);
        renderer.render(scene, camera);
    }

    animate();
    fetchData();
    setInterval(fetchData, 5000); // Actualizar cada 5 segundos
});

document.addEventListener('DOMContentLoaded', function() {
    const ctx = document.getElementById('grafico').getContext('2d');

    function fetchData() {
        const inventory = JSON.parse(localStorage.getItem('inventory')) || [];
        const salida = JSON.parse(localStorage.getItem('salida')) || [];

        const fechas = [...new Set([...inventory.map(item => item.fecha), ...salida.map(item => item.fecha)])];
        fechas.sort();

        const stockData = fechas.map(fecha => inventory.filter(item => item.fecha === fecha).reduce((sum, item) => sum + item.cantidad, 0));
        const salidaData = fechas.map(fecha => salida.filter(item => item.fecha === fecha).reduce((sum, item) => sum + item.cantidad, 0));
        const stockCostData = fechas.map(fecha => inventory.filter(item => item.fecha === fecha).reduce((sum, item) => sum + item.precio * item.cantidad, 0));
        const salidaCostData = fechas.map(fecha => salida.filter(item => item.fecha === fecha).reduce((sum, item) => sum + item.precio * item.cantidad, 0));

        const data = {
            labels: fechas,
            datasets: [
                {
                    label: 'Stock',
                    data: stockData,
                    borderColor: 'rgba(0, 0, 255, 0.5)',
                    backgroundColor: 'rgba(0, 0, 255, 0.2)',
                    fill: true
                },
                {
                    label: 'Salida',
                    data: salidaData,
                    borderColor: 'rgba(255, 0, 0, 0.5)',
                    backgroundColor: 'rgba(255, 0, 0, 0.2)',
                    fill: true
                },
                {
                    label: 'Costo de Stock',
                    data: stockCostData,
                    borderColor: 'rgba(255, 165, 0, 0.5)',
                    backgroundColor: 'rgba(255, 165, 0, 0.2)',
                    fill: true
                },
                {
                    label: 'Costo de Salida',
                    data: salidaCostData,
                    borderColor: 'rgba(0, 255, 0, 0.5)',
                    backgroundColor: 'rgba(0, 255, 0, 0.2)',
                    fill: true
                }
            ]
        };

        const options = {
            scales: {
                x: {
                    type: 'category',
                    title: {
                        display: true,
                        text: 'Fecha'
                    }
                },
                y: {
                    title: {
                        display: true,
                        text: 'Cantidad / Valor (CLP)'
                    }
                }
            },
            plugins: {
                legend: {
                    display: true
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            return `${context.dataset.label}: ${context.raw}`;
                        }
                    }
                }
            }
        };

        new Chart(ctx, {
            type: 'line',
            data: data,
            options: options
        });
    }

    fetchData();
    setInterval(fetchData, 5000); // Actualizar cada 5 segundos
});

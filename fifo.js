document.addEventListener('DOMContentLoaded', function() {
    const stockChartCtx = document.getElementById('stockChart').getContext('2d');
    const outgoingChartCtx = document.getElementById('outgoingChart').getContext('2d');
    const stockValueChartCtx = document.getElementById('stockValueChart').getContext('2d');
    const outgoingValueChartCtx = document.getElementById('outgoingValueChart').getContext('2d');

    const stockData = {
        labels: [], // Fechas de entrada
        datasets: [{
            label: 'Cantidad de Productos Ingresados',
            data: [], // Cantidades correspondientes
            backgroundColor: 'rgba(54, 162, 235, 0.2)',
            borderColor: 'rgba(54, 162, 235, 1)',
            borderWidth: 1
        }]
    };

    const outgoingData = {
        labels: [], // Fechas de salida
        datasets: [{
            label: 'Cantidad de Productos Salidos',
            data: [], // Cantidades correspondientes
            backgroundColor: 'rgba(255, 99, 132, 0.2)',
            borderColor: 'rgba(255, 99, 132, 1)',
            borderWidth: 1
        }]
    };

    const stockValueData = {
        labels: [], // Fechas de entrada
        datasets: [{
            label: 'Valor del Stock (CLP)',
            data: [], // Valores correspondientes
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1
        }]
    };

    const outgoingValueData = {
        labels: [], // Fechas de salida
        datasets: [{
            label: 'Valor de Productos Salidos (CLP)',
            data: [], // Valores correspondientes
            backgroundColor: 'rgba(153, 102, 255, 0.2)',
            borderColor: 'rgba(153, 102, 255, 1)',
            borderWidth: 1
        }]
    };

    const stockChart = new Chart(stockChartCtx, {
        type: 'bar',
        data: stockData,
        options: {
            responsive: true,
            animation: {
                duration: 1000,
                easing: 'easeInOutBounce'
            },
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });

    const outgoingChart = new Chart(outgoingChartCtx, {
        type: 'bar',
        data: outgoingData,
        options: {
            responsive: true,
            animation: {
                duration: 1000,
                easing: 'easeInOutBounce'
            },
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });

    const stockValueChart = new Chart(stockValueChartCtx, {
        type: 'line',
        data: stockValueData,
        options: {
            responsive: true,
            animation: {
                duration: 1000,
                easing: 'easeInOutBounce'
            },
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });

    const outgoingValueChart = new Chart(outgoingValueChartCtx, {
        type: 'line',
        data: outgoingValueData,
        options: {
            responsive: true,
            animation: {
                duration: 1000,
                easing: 'easeInOutBounce'
            },
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });

    function updateCharts() {
        const inventory = JSON.parse(localStorage.getItem('inventory')) || [];
        const entrada = JSON.parse(localStorage.getItem('entrada')) || [];
        const salida = JSON.parse(localStorage.getItem('salida')) || [];

        // Actualizar datos de Stock
        stockData.labels = inventory.map(item => item.fecha);
        stockData.datasets[0].data = inventory.map(item => item.cantidad);
        stockChart.update();

        // Actualizar datos de Salida
        outgoingData.labels = salida.map(item => item.fecha);
        outgoingData.datasets[0].data = salida.map(item => item.cantidad);
        outgoingChart.update();

        // Actualizar datos de Valor del Stock
        stockValueData.labels = inventory.map(item => item.fecha);
        stockValueData.datasets[0].data = inventory.map(item => item.precio * item.cantidad);
        stockValueChart.update();

        // Actualizar datos de Valor de Productos Salidos
        outgoingValueData.labels = salida.map(item => item.fecha);
        outgoingValueData.datasets[0].data = salida.map(item => item.precio * item.cantidad);
        outgoingValueChart.update();
    }

    updateCharts();
    setInterval(updateCharts, 5000); // Actualizar cada 5 segundos
});

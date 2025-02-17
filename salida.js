document.addEventListener('DOMContentLoaded', function() {
    loadSalida();
    loadSelectedProduct();
});

function loadSalida() {
    const salidaCategory = document.getElementById('salida-category');
    const salidaProduct = document.getElementById('salida-product');
    const salidaTableBody = document.querySelector('#salida-table tbody');
    const inventory = JSON.parse(localStorage.getItem('inventory')) || [];
    const salida = JSON.parse(localStorage.getItem('salida')) || [];

    // Llenar opciones de categorías
    const categories = [...new Set(inventory.map(item => item.categoria))];
    salidaCategory.innerHTML = categories.map(category => `<option value="${category}">${category}</option>`).join('');

    // Actualizar productos según la categoría seleccionada
    salidaCategory.addEventListener('change', function() {
        const selectedCategory = this.value;
        const products = inventory.filter(item => item.categoria === selectedCategory);
        salidaProduct.innerHTML = products.map(product => `<option value="${product.sku}">${product.nombre}</option>`).join('');
        updateStockInfo();
    });

    // Cargar tabla de salida
    salidaTableBody.innerHTML = '';
    salida.forEach((item, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${item.cantidad}</td>
            <td>${item.sku}</td>
            <td>${item.categoria}</td>
            <td>${item.nombre}</td>
            <td>${item.solicitante}</td>
            <td>${item.entrega}</td>
            <td>${item.fecha}</td>
            <td class="actions">
                <button onclick="deleteSalidaItem(${index})">Eliminar</button>
            </td>
        `;
        salidaTableBody.appendChild(row);
    });
}

function loadSelectedProduct() {
    const selectedProduct = JSON.parse(localStorage.getItem('selectedProduct'));
    if (selectedProduct) {
        document.getElementById('salida-category').value = selectedProduct.categoria;
        document.getElementById('salida-product').innerHTML = `<option value="${selectedProduct.sku}">${selectedProduct.nombre}</option>`;
        updateStockInfo();
        localStorage.removeItem('selectedProduct');
    }
}

function updateStockInfo() {
    const salidaProduct = document.getElementById('salida-product');
    const stockInfo = document.getElementById('stock-info');
    const inventory = JSON.parse(localStorage.getItem('inventory')) || [];
    const selectedSKU = salidaProduct.value;
    const product = inventory.find(item => item.sku === selectedSKU);
    if (product) {
        stockInfo.textContent = `(${product.cantidad} en Stock)`;
    } else {
        stockInfo.textContent = '';
    }
}

function registrarSalida() {
    const categoria = document.getElementById('salida-category').value;
    const sku = document.getElementById('salida-product').value;
    const cantidad = parseInt(document.getElementById('salida-quantity').value, 10);
    const solicitante = document.getElementById('salida-solicitante').value;
    const entrega = document.getElementById('salida-entrega').value;
    const lugar = document.getElementById('salida-lugar').value;
    const fecha = new Date().toLocaleDateString('es-CL');

    const inventory = JSON.parse(localStorage.getItem('inventory')) || [];
    const salida = JSON.parse(localStorage.getItem('salida')) || [];

    const product = inventory.find(item => item.sku === sku);

    if (product && cantidad <= product.cantidad) {
        product.cantidad -= cantidad;
        const salidaItem = { cantidad, sku, categoria, nombre: product.nombre, solicitante, entrega, lugar, fecha };
        salida.push(salidaItem);
        localStorage.setItem('inventory', JSON.stringify(inventory));
        localStorage.setItem('salida', JSON.stringify(salida));
        updateStockInfo();
        addRowToSalidaTable(salidaItem, salida.length - 1);
        document.getElementById('control-salida-form').reset();
    } else {
        alert('Cantidad inválida o insuficiente en stock.');
    }
}

function addRowToSalidaTable(item, index) {
    const salidaTableBody = document.querySelector('#salida-table tbody');
    const row = document.createElement('tr');
    row.innerHTML = `
        <td>${item.cantidad}</td>
        <td>${item.sku}</td>
        <td>${item.categoria}</td>
        <td>${item.nombre}</td>
        <td>${item.solicitante}</td>
        <td>${item.entrega}</td>
        <td>${item.fecha}</td>
        <td class="actions">
            <button onclick="deleteSalidaItem(${index})">Eliminar</button>
        </td>
    `;
    salidaTableBody.appendChild(row);
}

function deleteSalidaItem(index) {
    const salida = JSON.parse(localStorage.getItem('salida')) || [];
    const inventory = JSON.parse(localStorage.getItem('inventory')) || [];
    const item = salida[index];

    const product = inventory.find(product => product.sku === item.sku);
    if (product) {
        product.cantidad += item.cantidad;
    } else {
        inventory.push({
            nombre: item.nombre,
            sku: item.sku,
            categoria: item.categoria,
            cantidad: item.cantidad,
            precio: 0, // Asumimos que el precio es 0 ya que no tenemos esta información en la tabla de salida
            almacenaje: '' // Asumimos que el almacenaje es vacío ya que no tenemos esta información en la tabla de salida
        });
    }

    salida.splice(index, 1);
    localStorage.setItem('inventory', JSON.stringify(inventory));
    localStorage.setItem('salida', JSON.stringify(salida));
    removeRowFromSalidaTable(index);
    updateStockInfo();
}

function removeRowFromSalidaTable(index) {
    const salidaTableBody = document.querySelector('#salida-table tbody');
    salidaTableBody.deleteRow(index);
}

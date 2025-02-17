document.addEventListener('DOMContentLoaded', function() {
    loadInventory();
});

function loadInventory() {
    const stockTableBody = document.querySelector('#stock-table tbody');
    const inventory = JSON.parse(localStorage.getItem('inventory')) || [];
    stockTableBody.innerHTML = '';
    inventory.forEach((item, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${item.cantidad}</td>
            <td>${item.sku}</td>
            <td>${item.nombre}</td>
            <td>${item.categoria}</td>
            <td>${item.codigo}</td>
            <td>${item.almacenaje}</td>
            <td>${formatCurrency(item.precio)}</td>
            <td>${formatCurrency(item.cantidad * item.precio)}</td>
            <td class="actions">
                <button onclick="deleteItem(${index})">Eliminar</button>
                <button onclick="redirectToSalida(${index})">Entregar</button>
            </td>
        `;
        stockTableBody.appendChild(row);
    });
}

function formatCurrency(value) {
    return new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'CLP' }).format(value);
}

function deleteItem(index) {
    const inventory = JSON.parse(localStorage.getItem('inventory')) || [];
    inventory.splice(index, 1);
    localStorage.setItem('inventory', JSON.stringify(inventory));
    loadInventory();
}

function redirectToSalida(index) {
    const inventory = JSON.parse(localStorage.getItem('inventory')) || [];
    const item = inventory[index];
    localStorage.setItem('selectedProduct', JSON.stringify(item));
    window.location.href = 'salida.html';
}

function toggleDownloadOptions() {
    const downloadOptions = document.getElementById('download-options');
    downloadOptions.style.display = downloadOptions.style.display === 'none' ? 'flex' : 'none';
}

function getFormattedDate() {
    const date = new Date();
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${year}-${month}-${day}`;
}

function downloadExcel() {
    const inventory = JSON.parse(localStorage.getItem('inventory')) || [];
    const worksheet = XLSX.utils.json_to_sheet(inventory);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Stock');
    const filename = `stock_${getFormattedDate()}.xlsx`;
    XLSX.writeFile(workbook, filename);
}

function downloadPDF() {
    const inventory = JSON.parse(localStorage.getItem('inventory')) || [];
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
    const tableColumn = ["Cantidad", "SKU", "Nombre", "Categoría", "Código Fabrica", "Almacenaje", "Precio Unitario (CLP)", "Precio Total (CLP)"];
    const tableRows = [];

    inventory.forEach(item => {
        const itemData = [
            item.cantidad,
            item.sku,
            item.nombre,
            item.categoria,
            item.codigo,
            item.almacenaje,
            formatCurrency(item.precio),
            formatCurrency(item.cantidad * item.precio)
        ];
        tableRows.push(itemData);
    });

    doc.autoTable(tableColumn, tableRows, { startY: 20 });
    doc.text("Reporte de Stock", 14, 15);
    const filename = `stock_${getFormattedDate()}.pdf`;
    doc.save(filename);
}

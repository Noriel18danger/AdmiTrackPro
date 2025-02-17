document.addEventListener('DOMContentLoaded', function() {
    loadInventory();
});

function loadInventory() {
    const inventory = JSON.parse(localStorage.getItem('inventory')) || [];
    const categories = ['Repuestos', 'EPP', 'Insumos', 'Herramientas', 'Máquinas'];

    categories.forEach(category => {
        const tableBody = document.querySelector(`#stock-${category.toLowerCase()}-table tbody`);
        tableBody.innerHTML = '';
        inventory.filter(item => item.categoria === category).forEach((item, index) => {
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
                    <button onclick="uploadImage(${index})">Cargar</button>
                    <button onclick="viewImage(${index}, this)">Ver</button>
                </td>
            `;
            tableBody.appendChild(row);
        });
    });
}

function formatCurrency(value) {
    return new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'CLP' }).format(value);
}

function uploadImage(index) {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.onchange = function(event) {
        const file = event.target.files[0];
        const reader = new FileReader();
        reader.onload = function(e) {
            const inventory = JSON.parse(localStorage.getItem('inventory')) || [];
            inventory[index].image = e.target.result;
            localStorage.setItem('inventory', JSON.stringify(inventory));
        };
        reader.readAsDataURL(file);
    };
    input.click();
}

function viewImage(index, button) {
    const inventory = JSON.parse(localStorage.getItem('inventory')) || [];
    const item = inventory[index];
    const row = button.parentElement.parentElement;
    let imgElement = row.querySelector('.product-image');
    let deleteButton = row.querySelector('.delete-image');

    if (imgElement) {
        imgElement.remove();
        if (deleteButton) deleteButton.remove();
        button.textContent = 'Ver';
    } else {
        if (item.image) {
            imgElement = document.createElement('img');
            imgElement.src = item.image;
            imgElement.alt = 'Imagen del producto';
            imgElement.className = 'product-image';
            row.appendChild(imgElement);

            deleteButton = document.createElement('button');
            deleteButton.textContent = 'Eliminar';
            deleteButton.className = 'delete-image';
            deleteButton.onclick = function() {
                deleteImage(index, button);
            };
            row.appendChild(deleteButton);

            button.textContent = 'Cerrar';
        } else {
            alert('No hay imagen cargada para este producto.');
        }
    }
}

function deleteImage(index, button) {
    const inventory = JSON.parse(localStorage.getItem('inventory')) || [];
    inventory[index].image = null;
    localStorage.setItem('inventory', JSON.stringify(inventory));
    viewImage(index, button);
}

function toggleDownloadOptions(category) {
    const downloadOptions = document.getElementById(`download-options-${category}`);
    downloadOptions.style.display = downloadOptions.style.display === 'none' ? 'flex' : 'none';
}

function getFormattedDate() {
    const date = new Date();
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${year}-${month}-${day}`;
}

function downloadExcel(category) {
    const inventory = JSON.parse(localStorage.getItem('inventory')) || [];
    const filteredInventory = inventory.filter(item => item.categoria === category.charAt(0).toUpperCase() + category.slice(1));
    const worksheet = XLSX.utils.json_to_sheet(filteredInventory);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, `Stock de ${category}`);
    const filename = `stock_${category}_${getFormattedDate()}.xlsx`;
    XLSX.writeFile(workbook, filename);
}

function downloadPDF(category) {
    const inventory = JSON.parse(localStorage.getItem('inventory')) || [];
    const filteredInventory = inventory.filter(item => item.categoria === category.charAt(0).toUpperCase() + category.slice(1));
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
    const tableColumn = ["Cantidad", "SKU", "Nombre", "Categoría", "Código Fabrica", "Almacenaje", "Precio Unitario (CLP)", "Precio Total (CLP)"];
    const tableRows = [];

    filteredInventory.forEach(item => {
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
    doc.text(`Reporte de Stock de ${category.charAt(0).toUpperCase() + category.slice(1)}`, 14, 15);
    const filename = `stock_${category}_${getFormattedDate()}.pdf`;
    doc.save(filename);
}

function sortTable(n, tableId) {
    const table = document.getElementById(tableId);
    let rows, switching, i, x, y, shouldSwitch, dir, switchcount = 0;
    switching = true;
    dir = "asc"; 
    while (switching) {
        switching = false;
        rows = table.rows;
        for (i = 1; i < (rows.length - 1); i++) {
            shouldSwitch = false;
            x = rows[i].getElementsByTagName("TD")[n];
            y = rows[i + 1].getElementsByTagName("TD")[n];
            if (dir === "asc") {
                if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
                    shouldSwitch = true;
                    break;
                }
            } else if (dir === "desc") {
                if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
                    shouldSwitch = true;
                    break;
                }
            }
        }
        if (shouldSwitch) {
            rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
            switching = true;
            switchcount++;
        } else {
            if (switchcount === 0 && dir === "asc") {
                dir = "desc";
                switching = true;
            }
        }
    }
}

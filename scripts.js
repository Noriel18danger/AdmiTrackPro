document.addEventListener('DOMContentLoaded', function() {
    console.log('Plataforma Móvil cargada y lista.');
    initializeMobilePlatform();
    loadVehicles();
});

function initializeMobilePlatform() {
    // Initialize mobile-specific features here
    console.log('Inicializando características específicas para móviles.');
}

function saveVehicle(vehicle) {
    let vehicles = JSON.parse(localStorage.getItem('vehicles')) || [];
    vehicles.push(vehicle);
    localStorage.setItem('vehicles', JSON.stringify(vehicles));
}

function loadVehicles() {
    let vehicles = JSON.parse(localStorage.getItem('vehicles')) || [];
    let vehiclesContainer = document.getElementById('vehicles-container');
    if (vehiclesContainer) {
        vehiclesContainer.innerHTML = '';
        vehicles.forEach((vehicle, index) => {
            let vehicleElement = document.createElement('div');
            vehicleElement.className = 'vehicle';
            vehicleElement.innerHTML = `
                <h3>${vehicle.marca} ${vehicle.modelo} (${vehicle.anio})</h3>
                <p><strong>Tipo:</strong> ${vehicle.tipo}</p>
                <p><strong>Chasis/VIN:</strong> ${vehicle.chasis || 'N/A'}</p>
                <p><strong>Motor:</strong> ${vehicle.motor || 'N/A'}</p>
                <p><strong>Patente:</strong> ${vehicle.patente}</p>
                <p><strong>Color:</strong> ${vehicle.color}</p>
                <p><strong>Kilometraje:</strong> ${vehicle.kilometraje} km</p>
                <p><strong>Combustible:</strong> ${vehicle.combustible}</p>
                <p><strong>Transmisión:</strong> ${vehicle.transmision}</p>
                <div class="vehicle-buttons">
                    <button class="btn delete-btn" onclick="deleteVehicle(${index})">Eliminar</button>
                    <button class="btn register-btn" onclick="window.location.href='registros.html'">Registro</button>
                    <button class="btn qr-btn" onclick="toggleQRCode(${index})">MyTrack</button>
                </div>
                <div class="qr-code" id="qr-code-${index}" style="display: none;"></div>
            `;
            vehiclesContainer.appendChild(vehicleElement);
            generateQRCode(vehicle, index);
        });
    }
}

function deleteVehicle(index) {
    let vehicles = JSON.parse(localStorage.getItem('vehicles')) || [];
    vehicles.splice(index, 1);
    localStorage.setItem('vehicles', JSON.stringify(vehicles));
    loadVehicles();
}

function generateQRCode(vehicle, index) {
    let qrCodeContainer = document.getElementById(`qr-code-${index}`);
    if (qrCodeContainer) {
        qrCodeContainer.innerHTML = '';
        let qrCode = new QRCode(qrCodeContainer, {
            text: `${window.location.origin}/mis_vehiculos.html#vehicle-${index}`,
            width: 128,
            height: 128
        });
    }
}

function toggleQRCode(index) {
    let qrCodeContainer = document.getElementById(`qr-code-${index}`);
    if (qrCodeContainer) {
        qrCodeContainer.style.display = qrCodeContainer.style.display === 'none' ? 'block' : 'none';
    }
}

document.querySelector('.vehicle-form').addEventListener('submit', function(event) {
    event.preventDefault();
    let vehicle = {
        marca: document.getElementById('marca').value,
        modelo: document.getElementById('modelo').value,
        anio: document.getElementById('anio').value,
        tipo: document.getElementById('tipo').value,
        chasis: document.getElementById('chasis').value,
        motor: document.getElementById('motor').value,
        patente: document.getElementById('patente').value,
        color: document.getElementById('color').value,
        kilometraje: document.getElementById('kilometraje').value,
        combustible: document.getElementById('combustible').value,
        transmision: document.getElementById('transmision').value
    };
    saveVehicle(vehicle);
    window.location.href = 'mis_vehiculos.html';
});
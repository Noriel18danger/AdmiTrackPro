document.addEventListener('DOMContentLoaded', function() {
    console.log('Plataforma Móvil cargada y lista.');
    initializeMobilePlatform();
    if (window.location.pathname.includes('registros.html')) {
        loadRegistros();
    }
    if (window.location.pathname.includes('mis_vehiculos.html')) {
        loadVehicles();
    }
});

function initializeMobilePlatform() {
    // Initialize mobile-specific features here
    console.log('Inicializando características específicas para móviles.');
}

function saveVehicle(event) {
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
    let vehicles = JSON.parse(localStorage.getItem('vehicles')) || [];
    vehicles.push(vehicle);
    localStorage.setItem('vehicles', JSON.stringify(vehicles));
    window.location.href = 'mis_vehiculos.html';
}

function loadVehicles() {
    let vehicles = JSON.parse(localStorage.getItem('vehicles')) || [];
    let vehiclesContainer = document.getElementById('vehicles-container');
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
                <button class="btn register-btn" onclick="redirectToRegistros(${index})">Registro</button>
                <button class="btn qr-btn" onclick="toggleQRCode(${index})">MyTrack</button>
            </div>
            <div class="qr-code" id="qr-code-${index}" style="display: none;"></div>
        `;
        vehiclesContainer.appendChild(vehicleElement);
        generateQRCode(vehicle, index);
    });
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

function redirectToRegistros(index) {
    localStorage.setItem('selectedVehicleIndex', index);
    window.location.href = 'registros.html';
}

function saveRegistro(event) {
    event.preventDefault();
    let index = localStorage.getItem('selectedVehicleIndex');
    let vehicles = JSON.parse(localStorage.getItem('vehicles')) || [];
    let vehicle = vehicles[index];
    let registro = {
        propietario: document.getElementById('propietario').value,
        rut: document.getElementById('rut').value,
        contacto: document.getElementById('contacto').value,
        historial_propietarios: document.getElementById('historial_propietarios').value,
        fecha_inscripcion: document.getElementById('fecha_inscripcion').value,
        numero_padron: document.getElementById('numero_padron').value,
        estado_permiso: document.getElementById('estado_permiso').value,
        soat: document.getElementById('soat').value,
        numero_poliza: document.getElementById('numero_poliza').value,
        aseguradora: document.getElementById('aseguradora').value,
        vencimiento_soat: document.getElementById('vencimiento_soat').value,
        fecha_mantenimiento: document.getElementById('fecha_mantenimiento').value,
        taller: document.getElementById('taller').value,
        tipo_mantenimiento: document.getElementById('tipo_mantenimiento').value,
        servicios_realizados: document.getElementById('servicios_realizados').value,
        repuestos_cambiados: document.getElementById('repuestos_cambiados').value,
        kilometraje_servicio: document.getElementById('kilometraje_servicio').value,
        costo_servicio: document.getElementById('costo_servicio').value,
        proximo_mantenimiento: document.getElementById('proximo_mantenimiento').value,
        fecha_inspeccion: document.getElementById('fecha_inspeccion').value,
        estado_inspeccion: document.getElementById('estado_inspeccion').value,
        certificado_revision: document.getElementById('certificado_revision').value,
        centro_inspeccion: document.getElementById('centro_inspeccion').value,
        registro_carga: document.getElementById('registro_carga').value,
        consumo_combustible: document.getElementById('consumo_combustible').value,
        gastos_mantenimiento: document.getElementById('gastos_mantenimiento').value,
        gastos_seguros: document.getElementById('gastos_seguros').value,
        accesorios: document.getElementById('accesorios').value,
        modificaciones_mecanicas: document.getElementById('modificaciones_mecanicas').value,
        modificaciones_esteticas: document.getElementById('modificaciones_esteticas').value
    };
    vehicle.registros = vehicle.registros || [];
    vehicle.registros.push(registro);
    vehicles[index] = vehicle;
    localStorage.setItem('vehicles', JSON.stringify(vehicles));
    window.location.href = 'registros.html';
}

function loadRegistros() {
    let index = localStorage.getItem('selectedVehicleIndex');
    let vehicles = JSON.parse(localStorage.getItem('vehicles')) || [];
    let vehicle = vehicles[index];
    let registrosContainer = document.getElementById('registros-guardados');
    registrosContainer.innerHTML = '';
    vehicle.registros.forEach((registro, i) => {
        let registroElement = document.createElement('div');
        registroElement.className = 'registro';
        registroElement.innerHTML = `
            <h3>Registro ${i + 1}</h3>
            <p><strong>Propietario:</strong> ${registro.propietario}</p>
            <p><strong>RUT:</strong> ${registro.rut}</p>
            <p><strong>Contacto:</strong> ${registro.contacto}</p>
            <button class="btn" onclick="toggleDetalles(${i})">Detalles</button>
            <div id="detalles-${i}" class="detalles" style="display: none;">
                <p><strong>Historial de propietarios:</strong> ${registro.historial_propietarios}</p>
                <p><strong>Fecha de inscripción:</strong> ${registro.fecha_inscripcion}</p>
                <p><strong>Número de padrón:</strong> ${registro.numero_padron}</p>
                <p><strong>Estado del permiso de circulación:</strong> ${registro.estado_permiso}</p>
                <p><strong>SOAT/seguro obligatorio:</strong> ${registro.soat}</p>
                <p><strong>Número de póliza:</strong> ${registro.numero_poliza}</p>
                <p><strong>Aseguradora:</strong> ${registro.aseguradora}</p>
                <p><strong>Vencimiento del SOAT/seguro obligatorio:</strong> ${registro.vencimiento_soat}</p>
                <p><strong>Fecha del mantenimiento/reparación:</strong> ${registro.fecha_mantenimiento}</p>
                <p><strong>Taller donde se realizó el servicio:</strong> ${registro.taller}</p>
                <p><strong>Tipo de mantenimiento:</strong> ${registro.tipo_mantenimiento}</p>
                <p><strong>Servicios realizados:</strong> ${registro.servicios_realizados}</p>
                <p><strong>Repuestos cambiados:</strong> ${registro.repuestos_cambiados}</p>
                <p><strong>Kilometraje en el momento del servicio:</strong> ${registro.kilometraje_servicio}</p>
                <p><strong>Costo del servicio:</strong> ${registro.costo_servicio}</p>
                <p><strong>Próximo mantenimiento recomendado:</strong> ${registro.proximo_mantenimiento}</p>
                <p><strong>Fecha de última inspección:</strong> ${registro.fecha_inspeccion}</p>
                <p><strong>Estado:</strong> ${registro.estado_inspeccion}</p>
                <p><strong>Certificado de revisión técnica:</strong> ${registro.certificado_revision}</p>
                <p><strong>Centro de inspección:</strong> ${registro.centro_inspeccion}</p>
                <p><strong>Registro de carga de combustible:</strong> ${registro.registro_carga}</p>
                <p><strong>Consumo de combustible:</strong> ${registro.consumo_combustible}</p>
                <p><strong>Gastos de mantenimiento y reparaciones:</strong> ${registro.gastos_mantenimiento}</p>
                <p><strong>Historial de gastos en seguros e impuestos:</strong> ${registro.gastos_seguros}</p>
                <p><strong>Accesorios:</strong> ${registro.accesorios}</p>
                <p><strong>Modificaciones mecánicas:</strong> ${registro.modificaciones_mecanicas}</p>
                <p><strong>Modificaciones estéticas:</strong> ${registro.modificaciones_esteticas}</p>
            </div>
        `;
        registrosContainer.appendChild(registroElement);
    });
}

function toggleDetalles(index) {
    let detalles = document.getElementById(`detalles-${index}`);
    if (detalles.style.display === 'none') {
        detalles.style.display = 'block';
    } else {
        detalles.style.display = 'none';
    }
}
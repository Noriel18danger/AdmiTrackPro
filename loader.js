document.addEventListener('DOMContentLoaded', function() {
    const loader = document.getElementById('loader');

    function showLoader() {
        loader.classList.remove('hidden');
    }

    function hideLoader() {
        setTimeout(() => {
            loader.classList.add('hidden');
        }, 3090); // Duración de la pantalla de carga: 4 segundos
    }

    window.addEventListener('beforeunload', showLoader);
    window.addEventListener('load', hideLoader);
});

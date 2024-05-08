document.addEventListener('DOMContentLoaded', function() {
    const showQuantityFormBtn = document.getElementById('showQuantityFormBtn');
    const quantityForm = document.getElementById('quantityForm');
    
    // Agregar un event listener al botón para mostrar el formulario
    showQuantityFormBtn.addEventListener('click', function() {
        // Mostrar el formulario y ocultar el botón
        quantityForm.style.display = 'block';
        showQuantityFormBtn.style.display = 'none';
    });
});

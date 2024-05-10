document.addEventListener('DOMContentLoaded', function() {
    const addToCartForm = document.getElementById('addToCartForm');
    if (addToCartForm) {
        addToCartForm.addEventListener('submit', function(event) {
            event.preventDefault();

            // Obtener los valores de title, description y price del formulario
            const title = document.getElementById('title').value;
            const description = document.getElementById('description').value;
            const price = document.getElementById('price').value;

            // Crear un objeto FormData y agregar los valores al formulario
            const formData = new FormData();
            formData.append('title', title);
            formData.append('description', description);
            formData.append('price', price);

            // Enviar la solicitud POST al servidor
            fetch('/cart/add', {
                method: 'POST',
                body: formData
            })
            .then(response => response.json())
            .then(data => {
                console.log(data); // Puedes hacer algo con la respuesta del servidor si es necesario
                alert('Producto agregado al carrito');
            })
            .catch(error => {
                console.error('Error:', error);
                alert('Hubo un error al agregar el producto al carrito');
            });
        });
    }
});
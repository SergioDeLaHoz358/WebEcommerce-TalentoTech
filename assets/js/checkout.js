// Referencias al DOM
const cartSummary = document.getElementById('cart-summary');
const cartItemsDiv = document.getElementById('cart-items');
const totalAmount = document.getElementById('total-amount');
const checkoutForm = document.getElementById('checkout-form');
const messageDiv = document.getElementById('message');

// Verificar si el carrito está vacío
const carrito = JSON.parse(localStorage.getItem('carrito')) || [];

// Verificar si el item está en el localStorage (el ID del producto individual)
const item = JSON.parse(localStorage.getItem('item')) || null;

if (carrito.length == 0 && item == null)
{
    alert("El carrito está vacío o no se encontró el producto individual. Redirigiendo a la página de productos...");
    window.location.href = 'productos.html';
} else
{
    if (carrito.length > 0)
    {
        cargarCarrito();
    } else if (item != null)
    {
        cargarItem();
    }
}

// Función para cargar y mostrar los productos del carrito
function cargarCarrito()
{
    fetch('assets/products.json')
        .then(response =>
        {
            if (!response.ok)
            {
                throw new Error('Error al cargar los productos.');
            }
            return response.json();
        })
        .then(productos =>
        {
            const carritoResumen = {};
            let total = 0;

            // Calcular cantidades y totales
            carrito.forEach(id =>
            {
                const producto = productos.find(p => p.id === id);
                if (!carritoResumen[id])
                {
                    carritoResumen[id] = { ...producto, cantidad: 0 };
                }
                carritoResumen[id].cantidad += 1;
                total += producto.price;
            });

            // Renderizar los productos en el resumen
            cartItemsDiv.innerHTML = Object.values(carritoResumen)
                .map(
                    item => `
                        <div class="flex justify-between items-center border-b py-2">
                            <span>${item.name} (x${item.cantidad})</span>
                            <span>$${(item.price * item.cantidad).toLocaleString()}</span>
                        </div>
                    `
                )
                .join('');

            // Mostrar el total
            totalAmount.textContent = `Total: $${total.toLocaleString()}`;
        })
        .catch(error =>
        {
            console.error('Error:', error);
            cartSummary.innerHTML = '<p class="text-red-500">Error al cargar los productos del carrito.</p>';
        });
}

// Función para cargar un solo producto según el ID (item)
// Función para cargar un solo producto según el ID (item)
function cargarItem()
{
    fetch('assets/products.json')
        .then(response =>
        {
            if (!response.ok)
            {
                throw new Error('Error al cargar los productos.');
            }
            return response.json();
        })
        .then(productos =>
        {
            // Buscar el producto usando el ID del item
            const producto = productos.find(p => p.id === item);

            if (producto)
            {
                // Crear una estructura similar al mapeo en cargarCarrito
                const productoResumen = {
                    ...producto,
                    cantidad: 1 // En este caso es 1 porque solo estamos mostrando un producto
                };

                // Renderizar el producto en el HTML
                cartItemsDiv.innerHTML = `
                    <div class="flex justify-between items-center border-b py-2">
                        <span>${productoResumen.name} (x${productoResumen.cantidad})</span>
                        <span>$${(productoResumen.price * productoResumen.cantidad).toLocaleString()}</span>
                    </div>
                `;

                // Mostrar el total
                totalAmount.textContent = `Total: $${(productoResumen.price * productoResumen.cantidad).toLocaleString()}`;
            } else
            {
                console.error('Producto no encontrado');
            }
        })
        .catch(error =>
        {
            console.error('Error:', error);
            cartSummary.innerHTML = '<p class="text-red-500">Error al cargar el producto individual.</p>';
        });
}


// Función para mostrar mensajes
function mostrarMensaje(texto, color)
{
    messageDiv.textContent = texto;
    messageDiv.className = `text-${color}-500 text-lg font-bold`;
}

// Manejar el envío del formulario
checkoutForm.addEventListener('submit', event =>
{
    event.preventDefault();

    // Validar campos del formulario
    const cardName = document.getElementById('card-name').value.trim();
    const cardNumber = document.getElementById('card-number').value.trim();
    const expiryDate = document.getElementById('expiry-date').value.trim();
    const cvv = document.getElementById('cvv').value.trim();

    if (!cardName || !cardNumber || !expiryDate || !cvv)
    {
        mostrarMensaje('Por favor, completa todos los campos.', 'red');
        return;
    }

    if (!/^\d{4} \d{4} \d{4} \d{4}$/.test(cardNumber))
    {
        mostrarMensaje('El número de tarjeta debe tener el formato XXXX XXXX XXXX XXXX.', 'red');
        return;
    }

    if (!/^\d{2}\/\d{2}$/.test(expiryDate))
    {
        mostrarMensaje('La fecha de expiración debe tener el formato MM/YY.', 'red');
        return;
    }

    if (!/^\d{3}$/.test(cvv))
    {
        mostrarMensaje('El CVV debe ser un número de 3 dígitos.', 'red');
        return;
    }

    // Simular el pago
    mostrarMensaje('Procesando el pago...', 'blue');
    setTimeout(() =>
    {
        mostrarMensaje('¡Pago exitoso! Gracias por tu compra.', 'green');

        // Asegurar que el carrito solo se limpie después de la compra exitosa
        setTimeout(() =>
        {
            localStorage.removeItem('carrito');
            localStorage.removeItem('item');
            window.location.href = 'productos.html'; // Redirigir a productos
        }, 3000);
    }, 2000);
});

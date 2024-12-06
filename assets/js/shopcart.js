// Contenedor del carrito
const carritoContainer = document.getElementById('carrito-container');
const totalPriceElement = document.getElementById('total-price');
const pagarBtn = document.getElementById('pagar-btn');

// Recuperar carrito desde localStorage
const carrito = JSON.parse(localStorage.getItem('carrito')) || [];

// Cargar productos desde el archivo JSON
fetch('assets/products.json')
    .then(response => {
        if (!response.ok) {
            throw new Error('Error al cargar el archivo JSON');
        }
        return response.json();
    })
    .then(productos => {
        const productosCarrito = procesarCarrito(carrito, productos);
        renderizarCarrito(productosCarrito);
    })
    .catch(error => {
        console.error('Error:', error);
        carritoContainer.innerHTML = '<p class="text-red-500">No se pudieron cargar los productos. Intenta nuevamente más tarde.</p>';
    });

// Procesar carrito: agrupar por id y calcular cantidades
function procesarCarrito(carrito, productos) {
    const cantidades = carrito.reduce((acc, id) => {
        acc[id] = (acc[id] || 0) + 1;
        return acc;
    }, {});

    return Object.keys(cantidades).map(id => {
        const producto = productos.find(p => p.id === parseInt(id));
        return {
            ...producto,
            cantidad: cantidades[id],
        };
    });
}

// Renderizar los productos del carrito
function renderizarCarrito(productosCarrito) {
    carritoContainer.innerHTML = '';
    let total = 0;

    productosCarrito.forEach(producto => {
        const subtotal = producto.price * producto.cantidad;
        total += subtotal;

        const item = document.createElement('div');
        item.className = 'bg-white shadow-md rounded-lg p-4 flex justify-between items-center';

        item.innerHTML = `
            <div class="flex items-center gap-4">
                <img src="${producto.image}" alt="${producto.name}" class="w-20 h-20 object-cover rounded-md">
                <div>
                    <h2 class="text-lg font-bold">${producto.name}</h2>
                    <p class="text-gray-600">Cantidad: ${producto.cantidad}</p>
                    <p class="text-gray-900 font-bold">Subtotal: $${subtotal.toLocaleString()}</p>
                </div>
            </div>
            <button class="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 font-bold eliminar-btn" data-id="${producto.id}">Eliminar</button>
        `;

        carritoContainer.appendChild(item);
    });

    totalPriceElement.textContent = `Total: $${total.toLocaleString()}`;
    agregarEventosEliminar();
}

// Agregar eventos a los botones de eliminar
function agregarEventosEliminar() {
    document.querySelectorAll('.eliminar-btn').forEach(boton => {
        boton.addEventListener('click', (e) => {
            const idProducto = parseInt(e.target.dataset.id);
            eliminarProductoDelCarrito(idProducto);
        });
    });
}

// Eliminar producto del carrito
function eliminarProductoDelCarrito(idProducto) {
    const index = carrito.indexOf(idProducto);
    if (index !== -1) {
        carrito.splice(index, 1);
        localStorage.setItem('carrito', JSON.stringify(carrito));
        location.reload(); // Recargar la página para actualizar el carrito
    }
}

// Evento del botón Pagar
pagarBtn.addEventListener('click', () => {
    if (carrito.length === 0) {
        alert('Tu carrito está vacío. Agrega productos antes de pagar.');
    } else {
        alert('¡Gracias por tu compra! Serás redirigido a la página de pago.');
        localStorage.removeItem('carrito'); // Limpiar carrito
        location.href = 'checkout.html'; // Redirigir a checkout
    }
});

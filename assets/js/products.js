// Contenedor de productos
const productosContainer = document.getElementById('productos-container');

// Cargar carrito del localStorage y actualizar contador al inicio
let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
actualizarContadorCarrito();

// Función para generar tarjetas de productos
function generarTarjetas(productos)
{
    productosContainer.innerHTML = ''; // Limpiar el contenedor antes de agregar productos
    productos.forEach(producto =>
    {
        const card = document.createElement('div');
        card.className = 'bg-white shadow-md rounded-lg p-4 flex flex-col items-center text-center';

        card.innerHTML = `
            <img src="${producto.image}" alt="${producto.name}" class="w-full h-48 object-cover rounded-md mb-4">
            <h2 class="text-lg font-bold mb-2">${producto.name}</h2>
            <p class="text-gray-600 mb-4">${producto.description}</p>
            <p class="text-gray-900 font-bold mb-4">$${producto.price.toLocaleString()}</p>
            <div class="flex gap-2">
                <button class="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600 font-bold comprar-btn" data-id="${producto.id}">Comprar</button>
                <button class="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600 font-bold agregar-carrito-btn" data-id="${producto.id}">Agregar al carrito</button>
            </div>
        `;

        productosContainer.appendChild(card);
    });

    // Agregar eventos a los botones
    document.querySelectorAll('.agregar-carrito-btn').forEach(boton =>
    {
        boton.addEventListener('click', (e) =>
        {
            const idProducto = parseInt(e.target.dataset.id);
            mostrarVentanaCantidad(idProducto);
        });
    });

    document.querySelectorAll('.comprar-btn').forEach(boton =>
    {
        boton.addEventListener('click', (e) =>
        {
            const idProducto = parseInt(e.target.dataset.id);
            redirigirACheckout(idProducto);
        });
    });
}

// Función para mostrar ventana emergente de cantidad
function mostrarVentanaCantidad(idProducto)
{
    const cantidad = parseInt(prompt('¿Cuántas unidades deseas agregar al carrito?', '1'), 10);

    if (!isNaN(cantidad) && cantidad > 0)
    {
        agregarProductoAlCarrito(idProducto, cantidad);
        alert(`¡Tu producto fue agregado al carrito con éxito!`);
    } else
    {
        alert('Por favor, ingresa un número válido de unidades.');
    }
}

// Función para agregar producto al carrito
function agregarProductoAlCarrito(idProducto, cantidad)
{
    for (let i = 0; i < cantidad; i++)
    {
        carrito.push(idProducto);
    }
    guardarCarritoEnLocalStorage();
    actualizarContadorCarrito();
}

// Función para redirigir a checkout con el producto
function redirigirACheckout(idProducto)
{
    const productoSeleccionado = { id: idProducto };
    localStorage.setItem('productoCheckout', JSON.stringify(productoSeleccionado));
    window.location.href = 'checkout.html';
}

// Función para guardar carrito en localStorage
function guardarCarritoEnLocalStorage()
{
    localStorage.setItem('carrito', JSON.stringify(carrito));
}

// Función para actualizar el contador del carrito
function actualizarContadorCarrito()
{
    const contadorCarrito = document.getElementById('carrito-value');
    if (contadorCarrito)
    {
        contadorCarrito.textContent = carrito.length;
    }
}

// Cargar productos desde el archivo JSON
fetch('assets/products.json')
    .then(response =>
    {
        if (!response.ok)
        {
            throw new Error('Error al cargar el archivo JSON');
        }
        return response.json();
    })
    .then(productos =>
    {
        generarTarjetas(productos);
    })
    .catch(error =>
    {
        console.error('Error:', error);
        productosContainer.innerHTML = '<p class="text-red-500">No se pudieron cargar los productos. Intenta nuevamente más tarde.</p>';
    });

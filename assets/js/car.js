document.addEventListener('DOMContentLoaded', () =>
{
    // Variables globales
    let carrito = [];
    const miLocalStorage = window.localStorage;
    const DOMitems = document.querySelector('#items');
    const DOMcarrito = document.querySelector('#carrito');
    const DOMtotal = document.querySelector('#total');
    const DOMbotonVaciar = document.querySelector('#boton-vaciar');
    const filtroSelect = document.getElementById("filtro");

    // Cargar productos desde products.json
    let baseDeDatos = [];
    fetch('assets/products.json')
        .then(response => response.json())
        .then(data =>
        {
            baseDeDatos = data;
            renderizarProductos(baseDeDatos);
            cargarCarritoDeLocalStorage();
            renderizarCarrito();
        })
        .catch(error => console.error('Error al cargar los productos:', error));

    // Funciones principales
    function renderizarProductos(productos)
    {
        DOMitems.innerHTML = ''; // Limpiar contenedor
        const filtro = filtroSelect.value;
        const productosFiltrados = productos.filter(producto =>
            filtro === "todas" || producto.category === filtro
        );

        productosFiltrados.forEach(producto =>
        {
            const tarjeta = document.createElement('div');
            tarjeta.classList.add('card', 'col-sm-4');

            tarjeta.innerHTML = `
                <div class="card-body">
                    <img class="img-fluid" src="${producto.image}" alt="${producto.name}">
                    <h5 class="card-title">${producto.name}</h5>
                    <p class="card-text">$${producto.price.toLocaleString()}</p>
                    <button class="btn btn-primary agregar-carrito" data-id="${producto.id}">Agregar</button>
                </div>
            `;

            tarjeta.querySelector('.agregar-carrito').addEventListener('click', () =>
            {
                anadirProductoAlCarrito(producto.id);
            });

            DOMitems.appendChild(tarjeta);
        });
    }

    function anadirProductoAlCarrito(id)
    {
        carrito.push(id);
        renderizarCarrito();
        guardarCarritoEnLocalStorage();
        actualizarContadorCarrito();
    }

    function renderizarCarrito()
    {
        DOMcarrito.innerHTML = ''; // Limpiar carrito
        const carritoSinDuplicados = [...new Set(carrito)];

        carritoSinDuplicados.forEach(id =>
        {
            const producto = baseDeDatos.find(prod => prod.id === id);
            const cantidad = carrito.filter(itemId => itemId === id).length;

            const itemCarrito = document.createElement('li');
            itemCarrito.classList.add('list-group-item');
            itemCarrito.innerHTML = `
                ${cantidad} x ${producto.name} - $${producto.price.toLocaleString()}
                <button class="btn btn-danger btn-sm borrar-item" data-id="${id}">X</button>
            `;

            itemCarrito.querySelector('.borrar-item').addEventListener('click', () =>
            {
                borrarItemCarrito(id);
            });

            DOMcarrito.appendChild(itemCarrito);
        });

        DOMtotal.textContent = calcularTotal();
    }

    function calcularTotal()
    {
        return carrito.reduce((total, id) =>
        {
            const producto = baseDeDatos.find(prod => prod.id === id);
            return total + producto.price;
        }, 0).toLocaleString();
    }

    function borrarItemCarrito(id)
    {
        carrito = carrito.filter(itemId => itemId !== id);
        renderizarCarrito();
        guardarCarritoEnLocalStorage();
        actualizarContadorCarrito();
    }

    function vaciarCarrito()
    {
        carrito = [];
        renderizarCarrito();
        guardarCarritoEnLocalStorage();
        actualizarContadorCarrito();
    }

    function guardarCarritoEnLocalStorage()
    {
        miLocalStorage.setItem('carrito', JSON.stringify(carrito));
    }

    function cargarCarritoDeLocalStorage()
    {
        const carritoGuardado = miLocalStorage.getItem('carrito');
        if (carritoGuardado)
        {
            carrito = JSON.parse(carritoGuardado);
        }
        actualizarContadorCarrito();
    }

    function actualizarContadorCarrito()
    {
        const contador = document.getElementById('carrito-value');
        contador.textContent = carrito.length;
    }

    // Event Listeners
    DOMbotonVaciar.addEventListener('click', vaciarCarrito);
    filtroSelect.addEventListener('change', () => renderizarProductos(baseDeDatos));
});

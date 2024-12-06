// Contenedor de productos
const productosContainer = document.getElementById('productos-container');

// Función para generar tarjetas de productos
function generarTarjetas(productos)
{
    productosContainer.innerHTML = ''; // Limpiar el contenedor antes de agregar productos
    productos.forEach(producto =>
    {
        const card = document.createElement('div');
        card.className = 'bg-white shadow-md rounded-lg p-4 flex flex-col items-center text-center';

        card.innerHTML = `
            <img src="${producto.image}" alt="${producto.name}" class="w-full h-48 object-scale-down rounded-md mb-4">
            <h2 class="text-lg font-bold mb-2">${producto.name}</h2>
            <p class="text-gray-600 mb-4">${producto.description}</p>
            <p class="text-green-500 font-bold mb-4">$${producto.price.toLocaleString()}</p>
            <button class="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">Comprar</button>
        `;

        productosContainer.appendChild(card);
    });
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

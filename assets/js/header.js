function loadHeader()
{
    const repoName = '/WebEcommerce-TalentoTech'; // Cambia esto por el nombre exacto de tu repositorio
    const headerUrl = `assets/html/header.html`;

    fetch(headerUrl, { mode: 'cors' })
        .then(response =>
        {
            if (!response.ok)
            {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.text();
        })
        .then(data =>
        {
            const headerElement = document.getElementById('header');
            if (headerElement)
            {
                headerElement.innerHTML = data;
            } else
            {
                console.error("Header element not found.");
            }
        })
        .catch(error => console.error('Error loading header:', error));
}

document.addEventListener('DOMContentLoaded', loadHeader);

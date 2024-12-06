function loadFooter()
{
    const repoName = '/WebEcommerce-TalentoTech'; // Cambia esto por el nombre exacto de tu repositorio
    const footerUrl = `assets/html/footer.html`;

    fetch(footerUrl)
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
            const footerElement = document.getElementById('footer');
            if (footerElement)
            {
                footerElement.innerHTML = data;
            } else
            {
                console.error("Footer element not found.");
            }
        })
        .catch(error => console.error('Error loading footer:', error));
}

document.addEventListener('DOMContentLoaded', loadFooter);

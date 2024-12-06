function loadFooter() {
    // Construye la URL base para acceder al archivo del footer
    const baseUrl = window.location.origin;
    const footerUrl = `${baseUrl}/assets/html/footer.html`;

    console.log('Fetching footer from:', footerUrl);

    // Realiza la solicitud para obtener el archivo footer.html
    fetch(footerUrl)
        .then(response => {
            console.log('Footer response:', response);
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.text();
        })
        .then(data => {
            // Inserta el contenido del footer en el elemento correspondiente
            const footerElement = document.getElementById('footer');
            if (footerElement) {
                footerElement.innerHTML = data;
                console.log('Footer loaded successfully.');
            } else {
                console.error("Error: Element with ID 'footer' not found.");
            }
        })
        .catch(error => console.error('Error loading footer:', error));
}

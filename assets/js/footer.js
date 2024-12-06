function loadHeader() {
    const baseUrl = window.location.origin + window.location.pathname.replace(/\/$/, '');
    fetch(`${baseUrl}/assets/html/footer.html`)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.text();
        })
        .then(data => {
            const headerElement = document.getElementById('header');
            if (headerElement) {
                headerElement.innerHTML = data;
            } else {
                console.error("Error: Element with ID 'header' not found.");
            }
        })
        .catch(error => console.error('Error loading footer:', error));
}

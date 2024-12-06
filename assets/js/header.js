function loadHeader() {
    const baseUrl = window.location.origin;
    const headerUrl = `${baseUrl}/assets/html/header.html`;
    console.log('Fetching header from:', headerUrl);

    fetch(headerUrl)
        .then(response => {
            console.log('Header response:', response);
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.text();
        })
        .then(data => {
            const headerElement = document.getElementById('header');
            if (headerElement) {
                headerElement.innerHTML = data;
                console.log('Header loaded successfully.');
            } else {
                console.error("Error: Element with ID 'header' not found.");
            }
        })
        .catch(error => console.error('Error loading header:', error));
}

function loadHeader() {
    const baseUrl = window.location.origin + window.location.pathname.replace(/\/$/, '');
    console.log('Base URL:', baseUrl);
    const headerUrl = `${baseUrl}/assets/html/header.html`;
    console.log('Fetching header from:', headerUrl);

    fetch(headerUrl)
        .then(response => {
            console.log('Response:', response);
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.text();
        })
        .then(data => {
            console.log('Header content:', data);
            const headerElement = document.getElementById('header');    
            if (headerElement) {
                headerElement.innerHTML = data;
                console.log('Header successfully loaded.');
            } else {
                console.error("Error: Element with ID 'header' not found.");
            }
        })
        .catch(error => console.error('Error loading header:', error));
}

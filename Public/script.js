// script.js
document.getElementById('contact-form').addEventListener('submit', function (e) {
    e.preventDefault(); // Prevent default form submission

    // Get form data
    const formData = new FormData(this);

    // Send form data to the server
    fetch('/submit-form', {
        method: 'POST',
        body: formData,
    })
    .then(response => response.text())
    .then(data => {
        alert(data); // Show success message
    })
    .catch(error => {
        console.error('Error:', error);
    });
});
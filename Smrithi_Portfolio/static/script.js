document.addEventListener("DOMContentLoaded", function () {

    const contactButtons = document.querySelectorAll(
        ".contact-links .btn"
    );

    contactButtons.forEach(function (button) {

        button.addEventListener("click", function () {
            console.log(
                "Contact button clicked:",
                button.textContent.trim()
            );
        });

    });


    /*
        Test connection with the Flask backend.
    */

    fetch("/api/hello")

        .then(function (response) {
            return response.json();
        })

        .then(function (data) {
            console.log(data.message);
        })

        .catch(function (error) {
            console.log(
                "Backend connection error:",
                error
            );
        });

});
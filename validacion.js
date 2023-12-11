// // Obtener el formulario y escuchar el evento de envío
// const formulario = document.getElementById("formularioContacto");
// const mensajeError = document.getElementById("mensajeError");
// const emailInput = document.getElementById("email");

// formulario.addEventListener("submit", function (event) {
//     // Validar el nombre y apellido
//     const nombre = document.getElementById("nombre").value;
//     const apellido = document.getElementById("apellido").value;
//     const email = emailInput.value;

//     // Expresión regular para validar el formato de correo electrónico
//     const emailRegExp = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

//     if (nombre.trim() === "" || apellido.trim() === "" || email.trim() === "" || !emailRegExp.test(email)) {
//         mensajeError.style.display = "block";
//         event.preventDefault(); // Evita que el formulario se envíe
//     } else {
//         mensajeError.style.display = "none";
//     }

//     // Validar que se haya seleccionado un horario
//     const horario = document.querySelector('input[name="horario"]:checked');

//     if (!horario) {
//         mensajeError.style.display = "block";
//         event.preventDefault();
//     } else {
//         mensajeError.style.display = "none";
//     }

//     formulario.addEventListener("submit", function (event) {
//         event.preventDefault(); // Evitar que el formulario se envíe automáticamente
    
//         // Verificar el reCAPTCHA
//         const response = grecaptcha.getResponse();
    
//         if (response.length === 0) {
//             alert("Por favor, completa el reCAPTCHA.");
//         } else {
//             // Validar el resto de los campos (nombre, apellido, email, horario, etc.)
    
//             // Si todos los campos son válidos, envía el formulario
//             formulario.submit();
//         }
//     });
    
// });


// Obtener la puntuación de reCAPTCHA


// Obtener el formulario y escuchar el evento de envío
const formulario = document.getElementById("formularioContacto");
const mensajeError = document.getElementById("mensajeError");
const emailInput = document.getElementById("email");

// Esperar a que el script de reCAPTCHA se cargue
grecaptcha.ready(function() {
    // Registrar una acción de reCAPTCHA con tu clave de sitio
    grecaptcha.execute('6Lds7NEoAAAAAJfzDJpTP7nJ0Jz9o1Lv5uncRPss', { action: 'formulario' })
    .then(function(token) {
        formulario.addEventListener("submit", function (event) {
            event.preventDefault(); // Evitar que el formulario se envíe automáticamente

            // Validar el nombre, apellido y correo electrónico
            const nombre = document.getElementById("nombre").value;
            const apellido = document.getElementById("apellido").value;
            const email = emailInput.value;

            if (nombre.trim() === "" || apellido.trim() === "" || email.trim() === "") {
                mensajeError.style.display = "block";
            } else {
                
                const formData = new FormData(formulario);
                formData.append('g-recaptcha-response', token); // Agrega el token reCAPTCHA al formulario

                // Enviar el formulario al servidor para su validación
                fetch('https://gregarious-dango-75c8b0.netlify.app/html/contacto', {
                    method: 'POST',
                    body: formData
                })
                .then(response => response.json())
                .then(data => {
                    if (data.success) {
                        // El formulario se envió con éxito
                        alert('Formulario enviado con éxito');
                    } else {
                        // El formulario no se envió con éxito, muestra un mensaje de error
                        alert('Error al enviar el formulario');
                    }
                });

                mensajeError.style.display = "none";
            }
        });
    });
});


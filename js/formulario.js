const toggleButton = document.getElementById('navbar-toggle');
        const navLinks = document.getElementById('nav-links');

        toggleButton.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });


 // FORMULARIO //
document.getElementById('cancelButton').addEventListener('click', function() {
    document.getElementById('registerForm').reset();
    document.getElementById('message').textContent = '';
 });

 document.getElementById('registerForm').addEventListener('submit', function(event) {
    event.preventDefault();
    document.getElementById('message').textContent = 'Cadastro Realizado!';
 });

 document.getElementById('togglePassword').addEventListener('change', function() {
    const senhaField = document.getElementById('senha');
    if (this.checked) {
        senhaField.type = 'text';
    } else {
        senhaField.type = 'password';
    }
 });

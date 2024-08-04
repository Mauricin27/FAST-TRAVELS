// TOGGLE BAR //
const toggleButton = document.getElementById('navbar-toggle');
const navLinks = document.getElementById('nav-links');

toggleButton.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});


// CARD SLIDER //
let currentIndex = 0;
const slides = document.querySelectorAll('.slide');
const slidesContainer = document.querySelector('.slides');

function showSlides(index) {
    const totalSlides = slides.length;
    const visibleSlides = 3;

    if (index >= totalSlides - visibleSlides + 1) {
        currentIndex = totalSlides - visibleSlides;
    } else if (index < 0) {
        currentIndex = 0;
    } else {
        currentIndex = index;
    }

    const offset = -(currentIndex * 100 / visibleSlides);
    slidesContainer.style.transform = `translateX(${offset}%)`;
}

function nextSlide() {
    showSlides(currentIndex + 1);
}

function prevSlide() {
    showSlides(currentIndex - 1);
}

showSlides(currentIndex);


// GALERIA IMG PESQUISAR //
function filterImages() {
    const searchValue = document.getElementById('searchInput').value.toLowerCase();
    const images = document.getElementsByClassName('item');

    for (let i = 0; i < images.length; i++) {
        const title = images[i].getAttribute('data-title').toLowerCase();
        if (title.includes(searchValue)) {
            images[i].style.display = '';
        } else {
            images[i].style.display = 'none';
        }
    } 
}


// MODAL //
document.querySelectorAll('.open-modal').forEach(button => {
    button.addEventListener('click', function() {
        const item = this.closest('.item');
        const name = item.dataset.name;
        const price = item.dataset.price;
        const imageSrc = item.querySelector('img').src;

        document.getElementById('modalName').textContent = name;
        document.getElementById('modalImage').src = imageSrc;
        document.getElementById('productForm').dataset.price = price;

        document.getElementById('quantity').value = 1;
        updateTotalPrice();

        document.getElementById('productModal').style.display = 'block';
    });
});

document.querySelector('.close-button').addEventListener('click', function() {
    document.getElementById('productModal').style.display = 'none';
});

document.getElementById('cancel').addEventListener('click', function() {
    document.getElementById('productModal').style.display = 'none';
});

document.getElementById('increase').addEventListener('click', function() {
    const quantityInput = document.getElementById('quantity');
    quantityInput.value = parseInt(quantityInput.value) + 1;
    updateTotalPrice();
});

document.getElementById('decrease').addEventListener('click', function() {
    const quantityInput = document.getElementById('quantity');
    if (quantityInput.value > 1) {
        quantityInput.value = parseInt(quantityInput.value) - 1;
        updateTotalPrice();
    }
});

document.getElementById('quantity').addEventListener('input', function() {
    if (this.value < 1) this.value = 1;
    updateTotalPrice();
});

document.getElementById('class').addEventListener('change', updateTotalPrice);

document.getElementById('productForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const name = document.getElementById('modalName').textContent;
    const date = document.getElementById('deliveryDate').value;
    const time = document.getElementById('deliveryTime').value;
    const productClass = document.getElementById('class').options[document.getElementById('class').selectedIndex].text;
    const quantity = document.getElementById('quantity').value;
    const total = document.getElementById('totalPrice').querySelector('span').textContent;

    alert(`Pedido Confirmado!\n\nProduto: ${name}\nData: ${date}\nHorário: ${time}\nClasse: ${productClass}\nQuantidade: ${quantity}\nTotal: R$${total}`);
    document.getElementById('productModal').style.display = 'none';
});

function updateTotalPrice() {
    const price = parseFloat(document.getElementById('productForm').dataset.price);
    const quantity = parseInt(document.getElementById('quantity').value);
    const selectedClass = document.getElementById('class').value;
    let classMultiplier;

    switch (selectedClass) {
        case '1':
            classMultiplier = 5;
            break;
        case '2':
            classMultiplier = 4;
            break;
        case '3':
            classMultiplier = 3.5;
            break;
        default:
            classMultiplier = 1;
    }

    const total = price * quantity * classMultiplier;
    document.getElementById('totalPrice').querySelector('span').textContent = total.toFixed(2);
}


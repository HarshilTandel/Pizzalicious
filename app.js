// JavaScript for controlling the video playback
window.onload = function () {
    var video = document.getElementById("background-video");
    video.play();
    clearForm(); // Call clearForm() function here
};
// JavaScript for adding items to cart
// Function to show the cart section
function showCart() {
    const cartSection = document.getElementById('cart-section');
    cartSection.style.display = 'block';
}

// Function to add an item to the cart
function addToCart(name, price) {
    const cartItems = document.getElementById('cart-items');
    const newRow = document.createElement('tr');
    newRow.innerHTML = `
        <td><img src="${getImageUrl(name)}" alt="${name}" width="50"></td>
        <td>${name}</td>
        <td>${price}</td>
        <td>1</td>
    `;
    cartItems.appendChild(newRow);

    updateTotalPrice();

    showCart(); // Show the cart section when an item is added
}

// Function to update the total price
function updateTotalPrice() {
    const cartItems = document.querySelectorAll('#cart-items tr');
    let totalPrice = 0;
    cartItems.forEach(item => {
        const price = parseFloat(item.children[2].textContent);
        totalPrice += price;
    });

    const totalPriceElement = document.getElementById('total-price');
    totalPriceElement.textContent = `Total: RS ${totalPrice.toFixed(2)}`;
}

// Helper function to get image URL based on pizza name
function getImageUrl(name) {
    const imageMap = {
        "Neapolitan Pizza": "https://i.postimg.cc/d3QcbMq5/Neapolitan-Pizza.jpg",
        "Chicago Style Pizza": "https://i.postimg.cc/HxDpPPcN/Chicago-Style-Pizza.jpg",
        "Supreme Pizza": "https://i.postimg.cc/TYwXQXNw/Supreme-Pizza.webp",
        "Hawaiian Pizza": "https://i.postimg.cc/dVgvLSB0/Hawaiian-Pizza.webp",
        "BBQ Chicken Pizza": "https://i.postimg.cc/k5tJsd48/BBQ-Chicken-Pizza.webp",
        "Meat Pizza": "https://i.postimg.cc/fLfhqWh3/Meat-Pizza.webp",
        "Veggie Pizza": "https://i.postimg.cc/mrQxhZkd/Veggie-Pizza.webp",
        "Buffalo Pizza": "https://i.postimg.cc/xCv0ryL1/Buffalo-Pizza.webp
",
        "Pepperoni Pizza": "https://i.postimg.cc/8cygDycN/Pepperoni-Pizza.jpg",
        "Margherita Pizza": "https://i.postimg.cc/htXc4qVw/Margherita-Pizza.jpg"
    };
    return imageMap[name];
}

// Add event listeners to add to cart buttons
const addToCartButtons = document.querySelectorAll('.add-to-cart');
addToCartButtons.forEach(button => {
    button.addEventListener('click', function () {
        const pizzaName = this.closest('.slide').querySelector('h3').textContent;
        const pizzaPrice = this.closest('.slide').querySelector('.price').textContent;
        addToCart(pizzaName, pizzaPrice);
    });
});

function clearForm() {
    document.getElementById('delivery-form').reset();
}

window.onload = clearForm;

  // Initialize the map
  function initMap() {
    const map = new google.maps.Map(document.getElementById('map'), {
      zoom: 14,
      center: { lat: 22.307159, lng: 73.175321 }, // Default location (you may adjust)
    });

    const deliveryMarker = new google.maps.Marker({
      position: { lat: 22.307159, lng: 73.175321 }, // Default start location
      map: map,
      title: 'Delivery Person Location',
    });

    const socket = new WebSocket('wss://your-websocket-endpoint'); // WebSocket endpoint to receive location updates

    // On receiving a message from the WebSocket
    socket.onmessage = function (event) {
      const data = JSON.parse(event.data);

      if (data.type === 'locationUpdate') {
        const newPosition = { lat: data.latitude, lng: data.longitude };

        deliveryMarker.setPosition(newPosition); // Update marker position
        map.setCenter(newPosition); // Center the map to the new position
      }
    };
  }

  // Load Google Maps script with your API key
  function loadGoogleMapsApi() {
    const script = document.createElement('script');
    script.src = 'https://maps.googleapis.com/maps/api/js?key=YOUR_GOOGLE_MAPS_API_KEY&callback=initMap';
    script.defer = true;
    document.body.appendChild(script);
  }

  window.onload = loadGoogleMapsApi;

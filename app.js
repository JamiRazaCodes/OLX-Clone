// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getDatabase, ref, set, push, onValue } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAl8z4hqQ1Y2UmaznuJGHzov0hHzKZMKqo",
  authDomain: "olx-clone-j1.firebaseapp.com",
  projectId: "olx-clone-j1",
  storageBucket: "olx-clone-j1.appspot.com",
  messagingSenderId: "790765794096",
  appId: "1:790765794096:web:016459d32d5aa82783cef5",
  measurementId: "G-3M5Y4QJCK1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);


if (document.getElementById('adForm')) {
  document.getElementById('adForm').addEventListener('submit', function (event) {
    event.preventDefault();
    newAd();
  });

  function newAd() {
    const title = document.getElementById('productTitle').value;
    const price = document.getElementById('productPrice').value;
    const img = document.getElementById('productImage').value;
    const description = document.getElementById('productDescription').value;

    const product = {
      title,
      price,
      img,
      description,
    };

    const newProductRef = push(ref(db, 'products'));
    set(newProductRef, product)
      .then(() => {
        alert('Product uploaded successfully!');
        document.getElementById('adForm').reset();
      })
      .catch((error) => {
        console.error('Error uploading product: ', error);
      });
  }
}


if (document.getElementById('product-list')) {
  const productList = document.getElementById('product-list');
  const productsRef = ref(db, 'products');

  onValue(productsRef, (card) => {
    productList.innerHTML = '';
    card.forEach((childcard) => {
      const product = childcard.val();
      product.id = childcard.key;
      productList.innerHTML += `
        <div class="col-md-4">
          <div class="card mb-4 shadow-sm">
            <img src="${product.img}" class="card-img-top" alt="${product.title}">
            <div class="card-body">
              <h5 class="card-title">${product.title}</h5>
              <p class="card-text"><strong>Price: $${product.price}</strong></p>
              <a href="product.html?id=${product.id}" class="btn btn-primary">View Details</a>
            </div>
          </div>
        </div>
      `;
    });
  });
}

if (document.getElementById('product-detail')) {
  const productDetail = document.getElementById('product-detail');
  const urlParams = new URLSearchParams(window.location.search);
  const productId = urlParams.get('id');

  if (productId) {
    const productRef = ref(db, `products/${productId}`);
    onValue(productRef, (card) => {
      const product = card.val();
      if (product) {
        productDetail.innerHTML = `
          <div class="card">
            <img src="${product.img}" class="card-img-top" alt="${product.title}">
            <div class="card-body">
              <h5 class="card-title">${product.title}</h5>
              <p class="card-text"><strong>Price: $${product.price}</strong></p>
              <p class="card-text">${product.description}</p>
            </div>
          </div>
        `;
      } else {
        productDetail.innerHTML = `<p>Product not found!</p>`;
      }
    });
  } else {
    productDetail.innerHTML = `<p>Product ID is missing!</p>`;
  }
}

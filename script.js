// Fetch product data from a JSON file and display it on the page
fetch('/products.json')
    .then(response => response.json())
    .then(products => {
        const productList = document.getElementById("product-list");
        if (!productList) return;

        //Show only 4 products on the home page
        if (window.location.pathname.endsWith('index.html')) {
            products.slice(0, 4).forEach(product => {
                const card = document.createElement("a");
                card.classList.add("product-card");
                card.href = `product.html?id=${product.id}`;
                card.innerHTML = `
                    <h3>${product.name}</h3>
                    <img src="/assets/placeholder.svg" alt="Product Image">
                    <p>Price: $${product.price}</p>
                `;
                productList.appendChild(card);
            });
        }
        //Show all products on the store page
        else if (window.location.pathname.endsWith('products.html')) {
            products.forEach(product => {
                const card = document.createElement("a");
                card.classList.add("product-card");
                card.href = `product.html?id=${product.id}`;
                card.innerHTML = `
                    <h3>${product.name}</h3>
                    <img src="/assets/placeholder.svg" alt="Product Image">
                    <p>Price: $${product.price}</p>
                `;
                productList.appendChild(card);
            });
        }
    })
    .catch(error => console.error("Error loading products:", error));

//Fetch and display product details based on the product ID in the URL
if (window.location.pathname.endsWith('product.html')) {
    const params = new URLSearchParams(window.location.search);
    const productId = params.get('id');

    fetch('/products.json')
        .then(response => response.json())
        .then(products => {
            const product = products.find(p => p.id == productId);
            const main = document.querySelector('main');
            if (product) {
                main.innerHTML = `
                <div class="product-details">
                    <div class="product-image">
                        <img src="/assets/placeholder.svg" alt="Product Image">
                    </div>
                    <div class="product-info">
                        <h1>${product.name}</h1>
                        <p>Price: $${product.price}</p>
                        <p>${product.description || ''}</p>
                        <button class="btn">Add to cart</button>
                     </div>
                </div>
                `;
            } else {
                main.textContent = 'Product not found.';
            }
        })
        .catch(() => {
            document.querySelector('main').textContent = 'Error loading product data.';
        });
}


//Fetch product data from a JSON file and display it on the page

fetch('/products.json')
    .then(response => response.json())
    .then(products => {
        const productList = document.getElementById("product-list");

        products.forEach(product => {
            const card = document.createElement("a");
            card.classList.add("product-card");
            card.href = `product.html?id=${product.id}`;
            card.innerHTML = `
                <h3>${product.name}</h3>
                <p>Price: $${product.price}</p>
            `;
            productList.appendChild(card);
        });
    })
    .catch(error => console.error("Error loading products:", error));
// SELECT ELEMENTS
const productsAreaEL = document.querySelector(".productArea");
const selectedProductCardEL = document.querySelector(".selectedProductCard");
const subtotalEL = document.querySelector(".subtotal");

// RENDER PRODUCTS
function renderProducts() {
    products.forEach((product) => {
        productsAreaEL.innerHTML += `
                <div class="product">
                    <div class="productLeft">
                        <div class="productTitle">
                            <h1>${product.name}</h1>
                        </div>
                        <div class="productDesc">
                            ${product.description}
                        </div>
                        <div class="productPrice">
                            ${product.price}
                        </div>
                    </div>
                    <div class="productRight">
                        <div class="addProduct" onclick="addToCart(${product.id})">
                            +
                        </div>
                    </div>
                </div>
        `
    });
}

renderProducts();

// cart array
let cart = [];

// ADD TO CART
function addToCart(id) {
    // check if product already exit
    if (cart.some((item) => item.id === id)) {
        changeNumberOfUnits("plus", id)
    } else {
        const item = products.find((product) => product.id === id);
        cart.push({
            ...item,
            numberOfUnits: 1
        });
    }
    updateCart();
}

// update cart
function updateCart() {
    renderCartItems();
    renderSubtotal();

}

// calculate and render subtotal
function renderSubtotal() {
    let totalprice = 0;
    let totalpriceWithShipping = 0;
    let totalItems = 0;

    cart.forEach((item) => {
        totalprice += item.price * item.numberOfUnits;
        totalpriceWithShipping += (item.price * item.numberOfUnits)+4.00;
        totalItems += item.numberOfUnits;

    });

    subtotalEL.innerHTML = `
    Zwischensumme (${totalItems} Produkte): ${totalprice.toFixed(2)}€
    Gesamtsumme inkl. 4,00€ Versankosten: ${totalpriceWithShipping.toFixed(2)}€
    `;
}

// render cart items
function renderCartItems() {
    selectedProductCardEL.innerHTML = "";
    cart.forEach((item) => {
        selectedProductCardEL.innerHTML += `
        <div class="selectedProduct">
            <div class="selectedProductQuantity">
                ${item.numberOfUnits}
            </div>
            <div class="selectedProductTitle">
                ${item.name}
            </div>
            <div class="btnMinus" onclick="changeNumberOfUnits('minus', ${item.id})">
                -
            </div>
            <div class="btnPlus" onclick="changeNumberOfUnits('plus', ${item.id})">
                +
            </div>
            <div class="selectedProductPrice">
                ${item.price}
            </div>
            <div class="selectedProductDelete" onclick="removeItemFromCart(${item.id})">
                DEL
            </div>
        </div>
        `
    });
}

// change number of units for an item
function changeNumberOfUnits(action, id) {
    cart = cart.map((item) => {

        let numberOfUnits = item.numberOfUnits;
        let price = item.price;

        if (item.id === id) {
            if (action === "minus" && numberOfUnits > 1) {
                numberOfUnits--;
                price += price / numberOfUnits // funktioniert nicht
            } else if (action === "plus") {
                numberOfUnits++;
                price = price * numberOfUnits;  // funktioniert nicht 

            }
        }

        return {
            ...item,
            numberOfUnits,
            price, // funktioniert nicht
        };
    });

    updateCart();

}

// remove Item from cart
function removeItemFromCart(id) {
    cart = cart.filter((item) => item.id !== id);
    updateCart();
}


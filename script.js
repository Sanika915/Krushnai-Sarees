/* =========================================
   KRUSHNAI SAREES - JAVASCRIPT
   ========================================= */

function showCollection() {
    const collection = document.getElementById("collection");

    if (collection) {
        collection.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });
    }
}


function showDetails(button) {
    const card = button.closest(".saree-card");

    if (!card) return;

    const sareeName =
        card.querySelector("h3").textContent.trim();

    const sareePrice =
        card.querySelector("h4").textContent.trim();

    const description =
        card.querySelector(
            ".saree-details > p:not(.category)"
        ).textContent.trim();

    alert(
        "KRUSHNAI SAREES\n\n" +
        "Saree: " + sareeName + "\n" +
        "Price: " + sareePrice + "\n\n" +
        description
    );
}


function searchSarees() {
    const searchInput =
        document.getElementById("searchInput");

    const searchText =
        searchInput.value.toLowerCase().trim();

    const cards =
        document.querySelectorAll(".saree-card");

    cards.forEach(function(card) {

        const name =
            card.querySelector("h3")
            .textContent
            .toLowerCase();

        const category =
            card.querySelector(".category")
            .textContent
            .toLowerCase();

        if (
            name.includes(searchText) ||
            category.includes(searchText)
        ) {
            card.style.display = "";
        } else {
            card.style.display = "none";
        }

    });
}


function filterSarees(category) {

    const cards =
        document.querySelectorAll(".saree-card");

    cards.forEach(function(card) {

        const cardCategory =
            card.getAttribute("data-category");

        if (
            category === "all" ||
            cardCategory === category
        ) {
            card.style.display = "";
        } else {
            card.style.display = "none";
        }

    });
}


// =========================================
// CART
// =========================================

let cart = [];


function addToCart(button) {

    const card =
        button.closest(".saree-card");

    if (!card) return;

    const name =
        card.querySelector("h3")
        .textContent
        .trim();

    const priceText =
        card.querySelector("h4")
        .textContent
        .trim();

    const price =
        parseInt(
            priceText
                .replace("₹", "")
                .replace(",", "")
                .trim()
        );

    const image =
        card.querySelector("img")
        .getAttribute("src");


    const existingItem =
        cart.find(function(item) {
            return item.name === name;
        });


    if (existingItem) {

        existingItem.quantity += 1;

    } else {

        cart.push({
            name: name,
            price: price,
            image: image,
            quantity: 1
        });

    }


    updateCart();

    alert(
        name +
        " added to your cart! 🛒"
    );
}


function addSelectedToCart() {

    const selected =
        document.querySelectorAll(
            ".saree-select:checked"
        );


    if (selected.length === 0) {

        alert(
            "Please select at least one saree."
        );

        return;
    }


    selected.forEach(function(checkbox) {

        const name =
            checkbox.getAttribute("data-name");

        const price =
            parseInt(
                checkbox.getAttribute("data-price")
            );


        const card =
            checkbox.closest(".saree-card");

        const image =
            card.querySelector("img")
            .getAttribute("src");


        const existingItem =
            cart.find(function(item) {
                return item.name === name;
            });


        if (existingItem) {

            existingItem.quantity += 1;

        } else {

            cart.push({
                name: name,
                price: price,
                image: image,
                quantity: 1
            });

        }


        checkbox.checked = false;

    });


    updateCart();


    alert(
        selected.length +
        " saree(s) added to your cart! 🛒"
    );


    const cartSection =
        document.getElementById("cart");

    if (cartSection) {

        cartSection.scrollIntoView({
            behavior: "smooth"
        });

    }
}


// =========================================
// UPDATE CART
// =========================================

function updateCart() {

    const cartItems =
        document.getElementById("cartItems");

    const cartTotal =
        document.getElementById("cartTotal");


    if (!cartItems || !cartTotal) return;


    if (cart.length === 0) {

        cartItems.innerHTML =
            '<p class="empty-cart">' +
            'Your cart is empty.' +
            '</p>';

        cartTotal.textContent = "₹ 0";

        return;
    }


    cartItems.innerHTML = "";

    let total = 0;


    cart.forEach(function(item, index) {

        const itemTotal =
            item.price * item.quantity;


        total += itemTotal;


        const cartItem =
            document.createElement("div");

        cartItem.className =
            "cart-item";


        cartItem.innerHTML =

            '<div class="cart-product">' +

                '<img src="' +
                    item.image +
                    '" alt="' +
                    item.name +
                '">' +

                '<div class="cart-product-info">' +

                    '<h3>' +
                        item.name +
                    '</h3>' +

                    '<p>' +
                        'Price: ₹' +
                        item.price.toLocaleString("en-IN") +
                    '</p>' +

                    '<div class="quantity-control">' +

                        '<button type="button" ' +
                            'onclick="decreaseQuantity(' +
                            index +
                            ')">' +
                            '−' +
                        '</button>' +

                        '<span>' +
                            item.quantity +
                        '</span>' +

                        '<button type="button" ' +
                            'onclick="increaseQuantity(' +
                            index +
                            ')">' +
                            '+' +
                        '</button>' +

                    '</div>' +

                    '<p class="item-subtotal">' +
                        'Subtotal: ₹' +
                        itemTotal.toLocaleString("en-IN") +
                    '</p>' +

                '</div>' +

            '</div>' +

            '<button type="button" ' +
                'class="remove-btn" ' +
                'onclick="removeFromCart(' +
                index +
                ')">' +
                'Remove' +
            '</button>';


        cartItems.appendChild(cartItem);

    });


    cartTotal.textContent =
        "₹ " +
        total.toLocaleString("en-IN");
}


function increaseQuantity(index) {

    cart[index].quantity += 1;

    updateCart();
}


function decreaseQuantity(index) {

    if (cart[index].quantity > 1) {

        cart[index].quantity -= 1;

    } else {

        cart.splice(index, 1);

    }

    updateCart();
}


function removeFromCart(index) {

    cart.splice(index, 1);

    updateCart();
}


function clearCart() {

    cart = [];

    updateCart();
}


// =========================================
// GENERATE ORDER ID
// =========================================

function generateOrderId() {

    const number =
        Math.floor(
            1000 +
            Math.random() * 9000
        );

    return "KS" + number;
}


// =========================================
// PLACE ORDER
// =========================================

function placeOrder(event) {

    event.preventDefault();


    if (cart.length === 0) {

        alert(
            "Please add at least one saree to your cart."
        );

        return;
    }


    const name =
        document.getElementById("customerName")
        .value.trim();

    const phone =
        document.getElementById("customerPhone")
        .value.trim();

    const address =
        document.getElementById("customerAddress")
        .value.trim();

    const city =
        document.getElementById("customerCity")
        .value.trim();

    const pincode =
        document.getElementById("customerPincode")
        .value.trim();


    if (!/^[0-9]{10}$/.test(phone)) {

        alert(
            "Please enter a valid 10 digit mobile number."
        );

        return;
    }


    if (!/^[0-9]{6}$/.test(pincode)) {

        alert(
            "Please enter a valid 6 digit pincode."
        );

        return;
    }


    // Order ID

    const orderId =
        generateOrderId();


    // Date and time

    const orderDate =
        new Date();


    const dateText =
        orderDate.toLocaleDateString("en-IN");

    const timeText =
        orderDate.toLocaleTimeString("en-IN");


    // Total

    let total = 0;


    // WhatsApp message

    let orderMessage =
        "KRUSHNAI SAREES - NEW ORDER\n\n";


    orderMessage +=
        "Order ID: " +
        orderId +
        "\n";

    orderMessage +=
        "Order Date: " +
        dateText +
        "\n";

    orderMessage +=
        "Order Time: " +
        timeText +
        "\n\n";


    orderMessage +=
        "Customer Name: " +
        name +
        "\n";

    orderMessage +=
        "Customer Mobile: " +
        phone +
        "\n";

    orderMessage +=
        "Address: " +
        address +
        "\n";

    orderMessage +=
        "City: " +
        city +
        "\n";

    orderMessage +=
        "Pincode: " +
        pincode +
        "\n\n";


    orderMessage +=
        "ORDERED SAREES:\n";


    cart.forEach(function(item, index) {

        const itemTotal =
            item.price * item.quantity;


        total += itemTotal;


        orderMessage +=

            (index + 1) +
            ". " +
            item.name +
            " × " +
            item.quantity +
            " = ₹" +
            itemTotal.toLocaleString("en-IN") +
            "\n";

    });


    orderMessage +=
        "\nTOTAL AMOUNT: ₹" +
        total.toLocaleString("en-IN");


    orderMessage +=
        "\n\nPlease confirm my order.";


    // =================================
    // KRUSHNAI WHATSAPP NUMBER
    // =================================

    const shopWhatsAppNumber =
        "919763239088";


    const whatsappURL =
        "https://wa.me/" +
        shopWhatsAppNumber +
        "?text=" +
        encodeURIComponent(
            orderMessage
        );


    // Open WhatsApp

    window.open(
        whatsappURL,
        "_blank"
    );


    // =================================
    // SHOW SUCCESS BOX
    // =================================

    document.getElementById(
        "successOrderId"
    ).textContent = orderId;


    document.getElementById(
        "successOrderDate"
    ).textContent =
        dateText +
        " " +
        timeText;


    document.getElementById(
        "orderSuccess"
    ).style.display = "flex";


    // Save invoice information

    window.currentOrder = {

        orderId: orderId,

        date: dateText,

        time: timeText,

        name: name,

        phone: phone,

        address: address,

        city: city,

        pincode: pincode,

        items: cart.map(function(item) {

            return {
                name: item.name,
                price: item.price,
                quantity: item.quantity
            };

        }),

        total: total

    };

}


// =========================================
// CLOSE SUCCESS
// =========================================

function closeOrderSuccess() {

    document.getElementById(
        "orderSuccess"
    ).style.display = "none";

}


// =========================================
// PRINT / SAVE INVOICE
// =========================================

function printInvoice() {

    if (!window.currentOrder) {

        alert(
            "Order information not available."
        );

        return;
    }


    const order =
        window.currentOrder;


    let invoiceHTML =

        '<!DOCTYPE html>' +

        '<html>' +

        '<head>' +

            '<title>Krushnai Sarees Invoice</title>' +

            '<style>' +

                'body {' +
                    'font-family: Arial, sans-serif;' +
                    'padding: 40px;' +
                    'color: #222;' +
                '}' +

                '.invoice {' +
                    'max-width: 800px;' +
                    'margin: auto;' +
                    'border: 1px solid #ddd;' +
                    'padding: 30px;' +
                '}' +

                'h1 {' +
                    'text-align: center;' +
                '}' +

                '.shop {' +
                    'text-align: center;' +
                    'margin-bottom: 30px;' +
                '}' +

                '.info {' +
                    'margin-bottom: 25px;' +
                    'line-height: 1.7;' +
                '}' +

                'table {' +
                    'width: 100%;' +
                    'border-collapse: collapse;' +
                '}' +

                'th, td {' +
                    'border: 1px solid #ddd;' +
                    'padding: 10px;' +
                    'text-align: left;' +
                '}' +

                'th {' +
                    'background: #f4f4f4;' +
                '}' +

                '.total {' +
                    'text-align: right;' +
                    'font-size: 20px;' +
                    'font-weight: bold;' +
                    'margin-top: 20px;' +
                '}' +

                '.thanks {' +
                    'text-align: center;' +
                    'margin-top: 40px;' +
                '}' +

            '</style>' +

        '</head>' +

        '<body>' +

            '<div class="invoice">' +

                '<div class="shop">' +

                    '<h1>KRUSHNAI SAREES</h1>' +

                    '<p>Tradition Wrapped in Elegance</p>' +

                    '<p>Phone: 9763239088</p>' +

                '</div>' +


                '<div class="info">' +

                    '<strong>Order ID:</strong> ' +
                    order.orderId +
                    '<br>' +

                    '<strong>Date:</strong> ' +
                    order.date +
                    '<br>' +

                    '<strong>Time:</strong> ' +
                    order.time +
                    '<br><br>' +

                    '<strong>Customer:</strong> ' +
                    order.name +
                    '<br>' +

                    '<strong>Mobile:</strong> ' +
                    order.phone +
                    '<br>' +

                    '<strong>Address:</strong> ' +
                    order.address +
                    '<br>' +

                    '<strong>City:</strong> ' +
                    order.city +
                    '<br>' +

                    '<strong>Pincode:</strong> ' +
                    order.pincode +

                '</div>' +


                '<table>' +

                    '<tr>' +
                        '<th>Saree</th>' +
                        '<th>Price</th>' +
                        '<th>Qty</th>' +
                        '<th>Subtotal</th>' +
                    '</tr>';


    order.items.forEach(function(item) {

        const subtotal =
            item.price *
            item.quantity;


        invoiceHTML +=

            '<tr>' +

                '<td>' +
                    item.name +
                '</td>' +

                '<td>₹' +
                    item.price.toLocaleString("en-IN") +
                '</td>' +

                '<td>' +
                    item.quantity +
                '</td>' +

                '<td>₹' +
                    subtotal.toLocaleString("en-IN") +
                '</td>' +

            '</tr>';

    });


    invoiceHTML +=

                '</table>' +

                '<div class="total">' +

                    'TOTAL: ₹' +
                    order.total.toLocaleString("en-IN") +

                '</div>' +

                '<div class="thanks">' +

                    '<p>Thank you for shopping with Krushnai Sarees! ❤️</p>' +

                '</div>' +

            '</div>' +

        '</body>' +

        '</html>';


    const invoiceWindow =
        window.open(
            "",
            "_blank"
        );


    invoiceWindow.document.write(
        invoiceHTML
    );

    invoiceWindow.document.close();


    invoiceWindow.onload =
        function() {

            invoiceWindow.print();

        };

}


// =========================================
// PAGE LOAD
// =========================================

document.addEventListener(
    "DOMContentLoaded",
    function() {

        updateCart();

    }
);
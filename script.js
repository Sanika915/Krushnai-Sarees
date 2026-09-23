/* =====================================================
   KRUSHNAI SAREES - COMPLETE JAVASCRIPT
===================================================== */


let cart = [];

let currentOrder = null;



/* =====================================================
   EXPLORE COLLECTION
===================================================== */

function showCollection() {

    const collection =
        document.getElementById("collection");

    if (collection) {

        collection.scrollIntoView({
            behavior: "smooth"
        });

    }

}



/* =====================================================
   SHOW DETAILS
===================================================== */

function showDetails(button) {

    const card =
        button.closest(".saree-card");

    if (!card) {
        return;
    }


    const name =
        card.querySelector("h3").textContent.trim();


    const price =
        card.querySelector(".price").textContent.trim();


    alert(
        name +
        "\n\nPrice: " +
        price +
        "\n\nBeautiful collection from Krushnai Sarees."
    );

}



/* =====================================================
   SEARCH
===================================================== */

function searchSarees() {

    const input =
        document.getElementById("searchInput");

    const searchText =
        input.value.toLowerCase().trim();


    const cards =
        document.querySelectorAll(".saree-card");


    cards.forEach(function(card) {

        const text =
            card.textContent.toLowerCase();


        if (text.includes(searchText)) {

            card.style.display = "";

        } else {

            card.style.display = "none";

        }

    });

}



/* =====================================================
   FILTER
===================================================== */

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



/* =====================================================
   ADD TO CART
===================================================== */

function addToCart(button) {

    const card =
        button.closest(".saree-card");


    if (!card) {
        return;
    }


    const name =
        card.querySelector("h3").textContent.trim();


    const priceText =
        card.querySelector(".price").textContent;


    const price =
        parseInt(
            priceText.replace(/[^\d]/g, "")
        ) || 0;


    const existing =
        cart.find(function(item) {

            return item.name === name;

        });


    if (existing) {

        existing.quantity++;

    } else {

        cart.push({

            name: name,

            price: price,

            quantity: 1

        });

    }


    updateCart();


    alert(
        name +
        " added to cart 🛒"
    );

}



/* =====================================================
   ADD SELECTED SAREES
===================================================== */

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

        const card =
            checkbox.closest(".saree-card");


        const name =
            card.querySelector("h3").textContent.trim();


        const priceText =
            card.querySelector(".price").textContent;


        const price =
            parseInt(
                priceText.replace(/[^\d]/g, "")
            ) || 0;


        const existing =
            cart.find(function(item) {

                return item.name === name;

            });


        if (existing) {

            existing.quantity++;

        } else {

            cart.push({

                name: name,

                price: price,

                quantity: 1

            });

        }


        checkbox.checked = false;

    });


    updateCart();


    alert(
        "Selected sarees added to cart 🛒"
    );

}



/* =====================================================
   UPDATE CART
===================================================== */

function updateCart() {

    const cartItems =
        document.getElementById("cartItems");


    const cartTotal =
        document.getElementById("cartTotal");


    const paymentTotal =
        document.getElementById("paymentTotal");


    if (!cartItems) {
        return;
    }


    if (cart.length === 0) {

        cartItems.innerHTML =
            "<p>Your cart is empty.</p>";


        if (cartTotal) {

            cartTotal.textContent = "0";

        }


        if (paymentTotal) {

            paymentTotal.textContent = "0";

        }


        return;
    }


    let html = "";

    let total = 0;


    cart.forEach(function(item, index) {

        const itemTotal =
            item.price * item.quantity;


        total += itemTotal;


        html += `

            <div class="cart-item">

                <div class="cart-item-info">

                    <strong>
                        ${item.name}
                    </strong>

                    <p>
                        Price: ₹${item.price}
                    </p>

                </div>


                <div class="quantity-controls">

                    <button
                        type="button"
                        onclick="decreaseQuantity(${index})"
                    >
                        −
                    </button>


                    <span>
                        ${item.quantity}
                    </span>


                    <button
                        type="button"
                        onclick="increaseQuantity(${index})"
                    >
                        +
                    </button>

                </div>


                <strong>
                    ₹${itemTotal}
                </strong>


                <button
                    type="button"
                    onclick="removeFromCart(${index})"
                >
                    Remove
                </button>

            </div>

        `;

    });


    cartItems.innerHTML = html;


    if (cartTotal) {

        cartTotal.textContent =
            total.toLocaleString("en-IN");

    }


    if (paymentTotal) {

        paymentTotal.textContent =
            total.toLocaleString("en-IN");

    }

}



/* =====================================================
   INCREASE
===================================================== */

function increaseQuantity(index) {

    if (!cart[index]) {
        return;
    }


    cart[index].quantity++;


    updateCart();

}



/* =====================================================
   DECREASE
===================================================== */

function decreaseQuantity(index) {

    if (!cart[index]) {
        return;
    }


    if (cart[index].quantity > 1) {

        cart[index].quantity--;

    } else {

        cart.splice(index, 1);

    }


    updateCart();

}



/* =====================================================
   REMOVE
===================================================== */

function removeFromCart(index) {

    if (!cart[index]) {
        return;
    }


    cart.splice(index, 1);


    updateCart();

}



/* =====================================================
   CLEAR CART
===================================================== */

function clearCart() {

    cart = [];


    updateCart();

}



/* =====================================================
   GENERATE ORDER ID
===================================================== */

function generateOrderId() {

    const number =
        Math.floor(
            1000 +
            Math.random() * 9000
        );


    return "KS" + number;

}



/* =====================================================
   PLACE ORDER
===================================================== */

function placeOrder(event) {

    event.preventDefault();


    if (cart.length === 0) {

        alert(
            "Your cart is empty. Please add a saree first."
        );

        return;
    }


    const name =
        document
        .getElementById("customerName")
        .value.trim();


    const phone =
        document
        .getElementById("customerPhone")
        .value.trim();


    const address =
        document
        .getElementById("customerAddress")
        .value.trim();


    const city =
        document
        .getElementById("customerCity")
        .value.trim();


    const pincode =
        document
        .getElementById("customerPincode")
        .value.trim();


    let total = 0;

    let orderDetails = "";


    cart.forEach(function(item) {

        const itemTotal =
            item.price * item.quantity;


        total += itemTotal;


        orderDetails +=
            item.name +
            " × " +
            item.quantity +
            " = ₹" +
            itemTotal +
            "<br>";

    });


    const orderId =
        generateOrderId();


    const orderDate =
        new Date().toLocaleString("en-IN");


    currentOrder = {

        orderId: orderId,

        orderDate: orderDate,

        name: name,

        phone: phone,

        address: address,

        city: city,

        pincode: pincode,

        items: [...cart],

        total: total

    };


    document.getElementById("orderId")
        .textContent = orderId;


    document.getElementById("orderDate")
        .textContent = orderDate;


    document.getElementById("orderCustomerName")
        .textContent = name;


    document.getElementById("orderCustomerPhone")
        .textContent = phone;


    document.getElementById("orderCustomerAddress")
        .textContent =
            address +
            ", " +
            city +
            " - " +
            pincode;


    document.getElementById("orderDetails")
        .innerHTML = orderDetails;


    document.getElementById("orderTotal")
        .textContent =
            "₹" +
            total.toLocaleString("en-IN");


    const success =
        document.getElementById("orderSuccess");


    success.style.display = "block";


    success.scrollIntoView({
        behavior: "smooth"
    });

}



/* =====================================================
   WHATSAPP ORDER
===================================================== */

function placeOrderOnWhatsApp() {

    if (cart.length === 0) {

        alert(
            "Please add a saree to cart first."
        );

        return;
    }


    const name =
        document
        .getElementById("customerName")
        .value.trim();


    const phone =
        document
        .getElementById("customerPhone")
        .value.trim();


    const address =
        document
        .getElementById("customerAddress")
        .value.trim();


    const city =
        document
        .getElementById("customerCity")
        .value.trim();


    const pincode =
        document
        .getElementById("customerPincode")
        .value.trim();


    if (
        !name ||
        !phone ||
        !address ||
        !city ||
        !pincode
    ) {

        alert(
            "Please fill all customer details first."
        );

        return;
    }


    let total = 0;


    let message =
        "🌸 *KRUSHNAI SAREES - ORDER* 🌸\n\n";


    message +=
        "*Customer Details*\n";


    message +=
        "Name: " +
        name +
        "\n";


    message +=
        "Mobile: " +
        phone +
        "\n";


    message +=
        "Address: " +
        address +
        "\n";


    message +=
        "City: " +
        city +
        "\n";


    message +=
        "Pincode: " +
        pincode +
        "\n\n";


    message +=
        "*Order Details*\n";


    cart.forEach(function(item) {

        const itemTotal =
            item.price * item.quantity;


        total += itemTotal;


        message +=
            item.name +
            " × " +
            item.quantity +
            " = ₹" +
            itemTotal +
            "\n";

    });


    message +=
        "\n*TOTAL AMOUNT: ₹" +
        total.toLocaleString("en-IN") +
        "*\n\n";


    message +=
        "UPI ID: sahilundale19@okicici";


    const whatsappNumber =
        "919763239088";


    const whatsappURL =
        "https://wa.me/" +
        whatsappNumber +
        "?text=" +
        encodeURIComponent(message);


    window.open(
        whatsappURL,
        "_blank"
    );

}



/* =====================================================
   CLOSE ORDER SUCCESS
===================================================== */

function closeOrderSuccess() {

    const success =
        document.getElementById("orderSuccess");


    success.style.display = "none";

}



/* =====================================================
   PRINT INVOICE
===================================================== */

function printInvoice() {

    if (!currentOrder) {

        alert(
            "Please place an order first."
        );

        return;
    }


    let rows = "";


    currentOrder.items.forEach(function(item) {

        const itemTotal =
            item.price * item.quantity;


        rows += `

            <tr>

                <td>
                    ${item.name}
                </td>

                <td>
                    ${item.quantity}
                </td>

                <td>
                    ₹${item.price}
                </td>

                <td>
                    ₹${itemTotal}
                </td>

            </tr>

        `;

    });


    const invoice =
        window.open(
            "",
            "_blank",
            "width=900,height=700"
        );


    invoice.document.write(`

        <!DOCTYPE html>

        <html>

        <head>

            <title>
                Krushnai Sarees Invoice
            </title>

            <style>

                body {
                    font-family: Arial, sans-serif;
                    padding: 40px;
                }

                h1 {
                    color: #4b071f;
                }

                table {
                    width: 100%;
                    border-collapse: collapse;
                    margin-top: 20px;
                }

                th,
                td {
                    border: 1px solid #ccc;
                    padding: 10px;
                }

                th {
                    background: #f5f5f5;
                }

                .total {
                    font-size: 22px;
                    font-weight: bold;
                    margin-top: 20px;
                }

            </style>

        </head>


        <body>

            <h1>
                Krushnai Sarees
            </h1>

            <h2>
                Invoice
            </h2>

            <p>
                <strong>Order ID:</strong>
                ${currentOrder.orderId}
            </p>

            <p>
                <strong>Date:</strong>
                ${currentOrder.orderDate}
            </p>

            <hr>

            <h3>
                Customer Details
            </h3>

            <p>
                Name:
                ${currentOrder.name}
            </p>

            <p>
                Mobile:
                ${currentOrder.phone}
            </p>

            <p>
                Address:
                ${currentOrder.address},
                ${currentOrder.city} -
                ${currentOrder.pincode}
            </p>


            <table>

                <thead>

                    <tr>

                        <th>Saree</th>

                        <th>Quantity</th>

                        <th>Price</th>

                        <th>Total</th>

                    </tr>

                </thead>


                <tbody>

                    ${rows}

                </tbody>

            </table>


            <p class="total">

                Total Amount:
                ₹${currentOrder.total.toLocaleString("en-IN")}

            </p>


            <p>
                Thank you for shopping with
                Krushnai Sarees! 🌸
            </p>

        </body>

        </html>

    `);


    invoice.document.close();


    invoice.focus();


    setTimeout(function() {

        invoice.print();

    }, 500);

}



/* =====================================================
   PAGE LOAD
===================================================== */

document.addEventListener(
    "DOMContentLoaded",
    function() {

        updateCart();

    }
);

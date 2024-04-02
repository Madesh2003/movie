let colddrinksdata = [
    {
        foodimg: "assets/food images/cocacola.png",
        foodname: "cocacola",
        price: "99",
    },
    {
        foodimg: "assets/food images/pepsi.png",
        foodname: "pepsi",
        price: "99",
    },
    {
        foodimg: "assets/food images/coca-fries-burger.png",
        foodname: "burgercombo",
        price: "249",
    },
    {
        foodimg: "assets/food images/fries.png",
        foodname: "fries",
        price: "119",
    },
    {
        foodimg: "assets/food images/coffee.png",
        foodname: "coffee",
        price: "79",
    },
    {
        foodimg: "assets/food images/tea.png",
        foodname: "tea",
        price: "69",
    },
    {
        foodimg: "assets/food images/coldcoffee.png",
        foodname: "coldcoffee",
        price: "129",
    }
]



let cartItems = [];


const updateCartUI = () => {
    const cartContainer = document.querySelector('.cart-items');
    const totalContainer = document.querySelector('.total-amount');

    cartContainer.innerHTML = ''; 
    let totalAmount = 0; 

    cartItems.forEach(item => {
        const cartItem = document.createElement('div');
        cartItem.classList.add('cart-item');
        const subtotal = item.price * item.quantity; // Calculate subtotal
        totalAmount += subtotal; // Accumulate subtotal to calculate total amount
        cartItem.innerHTML = `
           <div class="cart-item-individual">
           <p>${item.foodname} - ${item.price} x ${item.quantity} = ${subtotal}</p>
           <button class="remove-item"><i class="fa-solid fa-trash"></i></button>
           </div>
        `;
        cartContainer.appendChild(cartItem);

        // Add event listener to the remove button
        cartItem.querySelector('.remove-item').addEventListener('click', () => {
            removeItemFromCart(item); // Remove the clicked item from the cart
        });
    });

    // Display the total amount
    if (cartItems.length > 0) {
        totalContainer.textContent = `Total: ${totalAmount}`;
    } else {
        totalContainer.textContent = ''; // Hide the total amount container
    }
};

// Function to remove item from the cart
const removeItemFromCart = (itemToRemove) => {
    cartItems = cartItems.filter(item => item !== itemToRemove); // Filter out the item to remove
    updateCartUI(); // Update the cart UI
};

// Function to handle adding items to the cart
const addToCart = (foodItem) => {
    const existingItem = cartItems.find(item => item.foodname === foodItem.foodname);
    if (existingItem) {
        existingItem.quantity++; // Increment quantity if item already exists
    } else {
        // Set quantity to 1 for new item
        foodItem.quantity = 1;
        // Calculate subtotal for the new item
        foodItem.subtotal = foodItem.price;
        cartItems.push(foodItem);
    }
    updateCartUI(); // Update the cart UI after adding the item
};


document.addEventListener('DOMContentLoaded', () => {
    const cardcon = document.querySelector('.colddrinks');

    const postmethod = () => {
        colddrinksdata.forEach((data2) => {
            const poseele = document.createElement('div');
            poseele.className = 'col-6 col-sm-6  col-lg-3 col-md-4 col-xl-3';
            poseele.innerHTML += `
                <div class="card">
                    <img src="${data2.foodimg}" class="card-img-top" alt="...">
                    <div class="card-body">
                        <div class="food-name-price">
                            <p>${data2.foodname}</p>
                            <p><i class="fa-sharp fa-solid fa-indian-rupee-sign"></i>${data2.price}</p>
                        </div>
                        <div class="add-food">
                            <button class="food-btn"><i class="fa-solid fa-paper-plane"></i>add</button>
                        </div>
                    </div>
                </div>`;

            // Add event listener to the "add" button
            poseele.querySelector('.add-food .food-btn').addEventListener('click', () => {
                addToCart(data2); // Add the clicked item to the cart
            });

            cardcon.appendChild(poseele);
        });
    };

    postmethod();


});

// Event listener for the continue button
document.getElementById('continueButton').addEventListener('click', () => {
    // Store selected food items in localStorage
    localStorage.setItem('selectedFoodItems', JSON.stringify(cartItems));

    // Calculate total amount
    let totalAmount = 0;
    cartItems.forEach(item => {
        totalAmount += item.price * item.quantity;
    });

    // Apply discount if applicable
    let discount = 0;
    if (totalAmount >= 1000) {
        discount = 0.05 * totalAmount; // 5% discount
    }

    // Calculate total amount after discount
    let totalAfterDiscount = totalAmount - discount;

    // Store total amount in localStorage
    localStorage.setItem('totalAmount', totalAfterDiscount);

    // Redirect to "Tickets.html" page
    window.location.href = 'parking.html';
});

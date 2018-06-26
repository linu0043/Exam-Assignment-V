/**
 * Creates a product with the given parameters
 * 
 * @param {object} product
 * A product object
 * @param {string} key
 * Product key
 */
Product.createProductCard = function(product, key){
    return `<article class="product">
                <img src="img/${product.img}" alt="${product.name}">
                <div class="productInfo">
                    <h5>${product.name}</h5>
                    <p>${product.description}</p>
                    <div class="productOrder">
                        <button id="${key}" onClick="addToCart(this.id)">Bestil</button>
                        <span class="right">${product.price} kr.</span>
                    </div>
                </div>
            </article>`
}

/**
 * Takes all products from Product.instances and uses createProductCard() to create their cards, and inserts them into the DOM
 */
Product.createAll = function(){
    var productKeys = Object.keys(Product.instances);
    var allCards;

    for(i = 0; i < productKeys.length; i++){
        allCards = Product.createProductCard(Product.instances[productKeys[i]], productKeys[i]);
        document.querySelector(".productContainer").insertAdjacentHTML("beforeend", allCards);
    }
}

//Listens for a click on the clear cart button, then calls clearCart()
document.querySelector(".clearCart").addEventListener("click", clearCart);

//Defines the finalPrice variables
var finalPrice = 0;
var finalPriceArr = [];

/**
 * Adds an item to the cart using the product ID (product key)
 * @param {string} productID 
 * Product key
 */
function addToCart(productID){
    //Defines the cart item
    var product = `<li id="${productID}" class="cartProduct collection-item"><div>${Product.instances[productID].name}<span class="secondary-content">${Product.instances[productID].price} kr</span></div></li>`
    
    //Inserts the html into the dom
    document.querySelector(".priceTable").insertAdjacentHTML("afterbegin", product);

    //Appends the product to an array called cartInstances
    Product.cartInstances.push(product);
    //Pushes the price to another array, finalPriceArr, at the same time
    finalPriceArr.push(Product.instances[productID].price);

    //Adds the currently added products price to finalPrice
    finalPrice += Product.instances[productID].price;
    //Sets the total price on the site to be finalPrice
    document.querySelector(".finalPrice").textContent = finalPrice;
    
    //Sets the number of items in the cart on the site
    document.querySelector(".cartAmount").textContent = Product.cartInstances.length;

    //Shows the order button
    document.querySelector(".orderButton").style.display = "block";

    saveToLocalCart();
    
}

/**
 * Saves the cart to the local storage
 */
function saveToLocalCart(){
    localStorage["cartProducts"] = JSON.stringify(Product.cartInstances);
    localStorage["cartPrices"] = JSON.stringify(finalPriceArr);
}

/**
 * Loads the cart items from local storage and inserts them into the dom
 */
function loadLocalCart(){
    //Checks if localStorage["cartProducts"] isnt empty, the executes the code
    if(localStorage["cartProducts"] !== ""){

        //Sets Product.cartInstances to be the data from local storage
        Product.cartInstances = JSON.parse(localStorage["cartProducts"]);
        //Same with this but the prices
        finalPriceArr = JSON.parse(localStorage["cartPrices"]);

        //Sets the full price of all saved cart items
        for(i = 0; i < finalPriceArr.length; i++){
            finalPrice += finalPriceArr[i];
        }
        //Sets the final price element to the total price
        document.querySelector(".finalPrice").textContent = finalPrice;

        //Inserts the data from local storage into the cart list
        for(i = 0; i < Product.cartInstances.length; i++){
            document.querySelector(".priceTable").insertAdjacentHTML("afterbegin", Product.cartInstances[i]);
            document.querySelector(".cartAmount").textContent = Product.cartInstances.length;
        }

        //Shows the order button
        document.querySelector(".orderButton").style.display = "block";
    }
}

//Clears the cart of any items added
function clearCart(){
    localStorage["cartProducts"] = [];
    localStorage["cartPrices"] = [];
    var finalPrice = 0;
    var finalPriceArr = [];
    document.querySelector(".cartAmount").textContent = "0";
    document.querySelector(".finalPrice").textContent = "";
    
    loadLocalCart();
    location.reload();
}

//Defines all of these when the site loads
Product.cartInstances = [];
Product.createAll();
loadLocalCart();
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

Product.createAll = function(){
    var productKeys = Object.keys(Product.instances);
    var allCards;

    for(i = 0; i < productKeys.length; i++){
        allCards = Product.createProductCard(Product.instances[productKeys[i]], productKeys[i]);
        document.querySelector(".productContainer").insertAdjacentHTML("beforeend", allCards);
    }
}

document.querySelector(".clearCart").addEventListener("click", clearCart);

var finalPrice = 0;
var finalPriceArr = [];
function addToCart(productID){
    var product = `<li id="${productID}" class="cartProduct collection-item"><div>${Product.instances[productID].name}<span class="secondary-content">${Product.instances[productID].price} kr</span></div></li>`
    
    document.querySelector(".priceTable").insertAdjacentHTML("afterbegin", product);

    Product.cartInstances.push(product);
    finalPriceArr.push(Product.instances[productID].price);

    finalPrice += Product.instances[productID].price;
    document.querySelector(".finalPrice").textContent = finalPrice;
    
    document.querySelector(".cartAmount").textContent = Product.cartInstances.length;
    document.querySelector(".orderButton").style.display = "block";

    saveToLocalCart();
    
}

function saveToLocalCart(){
    localStorage["cartProducts"] = JSON.stringify(Product.cartInstances);
    localStorage["cartPrices"] = JSON.stringify(finalPriceArr);
    console.log(Product.cartInstances);
    console.log(finalPriceArr);
}

function loadLocalCart(){
    if(localStorage["cartProducts"] !== ""){
        Product.cartInstances = JSON.parse(localStorage["cartProducts"]);
        finalPriceArr = JSON.parse(localStorage["cartPrices"]);
        
        console.log(Product.cartInstances);

        for(i = 0; i < finalPriceArr.length; i++){
            finalPrice += finalPriceArr[i];
        }
        document.querySelector(".finalPrice").textContent = finalPrice;

        for(i = 0; i < Product.cartInstances.length; i++){
            document.querySelector(".priceTable").insertAdjacentHTML("afterbegin", Product.cartInstances[i]);
            document.querySelector(".cartAmount").textContent = Product.cartInstances.length;
        }
        document.querySelector(".orderButton").style.display = "block";
    }
}

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

function removeCartItem(productID){

}

Product.cartInstances = [];

Product.createAll();
loadLocalCart();

//TOMORROW: fix the total price not displaying with localstorage
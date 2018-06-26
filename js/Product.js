function Product (props){
    this.name = props.name;
    this.description = props.description;
    this.price = props.price;
    this.img = props.img;
}

Product.saveAll = function(){
    localStorage["products"] = JSON.stringify(Product.instances);
}

Product.loadAll = function(){
    if(localStorage["products"]){
        Product.instances = JSON.parse(localStorage["products"]);
    } else{
        Product.createTestData();
    }
}

Product.createTestData = function(){
    Product.instances = {
        coffee1: {
            name : "Americano",
            description : "Stærk crema espresso med varmt vand",
            price : 60,
            img : "Americano.jpg"
        },
        coffee2: {
            name : "Caffe latte",
            description : "Espresso med skummet varm mælk",
            price : 65,
            img : "Caffe_Latte.jpg"
        },
        coffee3: {
            name : "Cappuccino",
            description : "Espresso med dampet mælk og skum",
            price : 75,
            img : "Cappuccino.jpg"
        },
        coffee4: {
            name : "Espresso",
            description : "Espresso lavet af vores dygtigste baristaer",
            price : 50,
            img : "Espresso.jpg"
        },
        coffee5: {
            name : "Macchiato",
            description : "Lækker espressodrik med skummet mælk og chokolade",
            price : 100,
            img : "Macchiato.jpg"
        }
    }
    Product.saveAll();
}

Product.instances = {};
Product.createTestData();
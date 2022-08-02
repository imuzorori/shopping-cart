let label = document.getElementById("label");
let shopping = document.getElementById("shopping");
let basket = JSON.parse(localStorage.getItem("data")) || [];
let calculatons = () => {
    let cartIcon = document.getElementById("cart_amount");
    cartIcon.innerHTML = basket.map((x) => x.item).reduce((x, y) => x + y, 0);


};
calculatons();

let generateCartItems = () => {
    if (basket.length !== 0) {
        return (shopping.innerHTML = basket.map((x) => {
            let { id, item } = x;
            let search = shopItemData.find((y) => y.id === id) || [];
            let { img, name, price } = search;
            return `
            <div class="cart_item">
            <img width="100" src="${img}">
            <div class="details">

            <div class="titles_price">
                <h4 class="title-price">
                <p>${search.name}</p>
                <p class="cart_item_price"> $ ${price}</p>
                
                </h4>
                <i onclick="removeItem(${id})" class="bi bi-x-lg"></i>
            </div>

            <div class="buttons">
                    <i onclick="decrement(${id})" class="fa fa-minus"></i>
                    <div id= "${id}" class="quantity">${item}</div>
                    <i onclick="increment(${id}) " class="fa fa-plus"></i>
            </div>
            <h3>$ ${item * search.price}</h3>
            
            </div>
            </div>

            `;
        }).join(""));


    } else {
        shopping.innerHTML = ``;
        label.innerHTML = `
        <h2>cart is empty</h2>
        <a href="product.html"> 
        <button class="homebutton"> back to home</button>
        </a>
        `;
    }
};
generateCartItems();
let increment = (id) => {

    let selectItem = id;

    let search = basket.find((x) => x.id === selectItem.id);

    if (search === undefined) {
        basket.push({
            id: selectItem.id,
            item: 1

        });
    } else {
        search.item += 1;
    }

    generateCartItems();
    update(selectItem.id);
    localStorage.setItem("data", JSON.stringify(basket));

};
let decrement = (id) => {

    let selectItem = id;

    let search = basket.find((x) => x.id === selectItem.id);
    if (search === undefined)
        return;
    if (search.item === 0)
        return;
    else {
        search.item -= 1;
    }
    update(selectItem.id);
    basket = basket.filter((x) => x.item !== 0);
    generateCartItems();
    localStorage.setItem("data", JSON.stringify(basket));
};

let update = (id) => {
    let search = basket.find((x) => x.id === id);
    document.getElementById(id).innerHTML = search.item;
    calculatons();
    totalAmount();
};
let removeItem = (id) => {
    let selectedItem = id;
    basket = basket.filter((x) => x.id !== selectedItem.id);
    generateCartItems();
    totalAmount();
    calculatons();
    localStorage.setItem("data", JSON.stringify(basket));

};
let ClearCart = () => {
    basket = [];
    generateCartItems();
    calculatons();
    localStorage.setItem("data", JSON.stringify(basket));
}
let totalAmount = () => {
    if (basket.length !== 0) {
        let amount = basket.map((x) => {
            let { item, id } = x;
            let search = shopItemData.find((y) => y.id === id) || [];
            return item * search.price;
        }).reduce((x, y) => x + y, 0);
        label.innerHTML = `
        <h2> Total amount: $ ${amount}</h2>
        <button class="checkout">Checkout</button>
        <button onclick="ClearCart()" class="remove">Clear Cart</button>
        `
    } else {
        return;
    }
}
totalAmount();
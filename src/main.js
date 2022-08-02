let shopping_cart = document.getElementById("shopping_cart");


let basket = JSON.parse(localStorage.getItem("data")) || [];

let generateShopping_cart = () => {
    return (shopping_cart.innerHTML = shopItemData
        .map((x) => {
            let { id, name, price, desc, img } = x;
            let search = basket.find((x) => x.id === id) || [];
            return `
<div id = "product-id-${id}" class="item">
<img width="220" src="${img}" alt="">
<div class="details">
    <h3>${name}</h3> 
    <p>${desc}</p>
    <div class="price-quantity">
        <h2>$ ${price}</h2>
        <div class="buttons">
            <i onclick="decrement(${id})" class="fa fa-minus"></i>
            <div id= "${id}" class="quantity">
            ${search.item===undefined ? 0: search.item}
            </div>
            <i onclick="increment(${id}) " class="fa fa-plus"></i>
        </div>
    </div>
</div>
</div>

`;
        }).join(""));
};
generateShopping_cart();

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

    //console.log(basket);
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

    localStorage.setItem("data", JSON.stringify(basket));
};

let update = (id) => {
    let search = basket.find((x) => x.id === id);
    //console.log(search.item);
    document.getElementById(id).innerHTML = search.item;
    calculatons();
};
let calculatons = () => {
    let cartIcon = document.getElementById("cart_amount");
    cartIcon.innerHTML = basket.map((x) => x.item).reduce((x, y) => x + y, 0);


};
calculatons();
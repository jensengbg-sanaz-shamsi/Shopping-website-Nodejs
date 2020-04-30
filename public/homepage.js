
const productContainer = document.getElementById('shop-items');

function showMessage(msg) {
    alert(msg);
}

function startApplication() {
     setBasketNumber();
     getProducts();
}


async function setBasketNumber() {
    try {
        const response = await fetch('http://localhost:3000/api/basket/getAll',{ method:('GET') });
        const data = await response.json();

        if(data.success) {
            const elmBasket = document.getElementById('number');
            elmBasket.innerHTML = data.products.length;
        }
    }
    catch (error){
        alert(error.message);
    }
}

//Get product
async function getProducts(){
    try {
        const response = await fetch('http://localhost:3000/api/product/getAll',{ method:('GET') });
        const data = await response.json();
        if(data.success) {
            displayProducts(data.products);
        }
        else {
            showMessage(data.message)
        }
    }
    catch (error){
        alert(error.message);
    }
}

//display products 
async function displayProducts(products){
    productContainer.innerHTML='';

    for(product of products){
        const{imgUrl, name, price, id} = product;
        productContainer.innerHTML += `
            <div class="info">
                <img src=${imgUrl} />
                <h4>${name}</h4>
                <h5>Price: ${price}</h5>
                <button class="buyProduct" type="submit" value=${id}>Add</button>
            </div>`
    }
    addClickEventToButtons();
}

//get the id product to put into basket
function addClickEventToButtons(){
    let buttons = document.querySelectorAll('.buyProduct');

    for (let i = 0; i < buttons.length; i++){
        buttons[i].addEventListener('click', () =>{
            let productID = buttons[i].value;

            addToBasket(productID);
        });
    }
}

//post items to the basket
async function addToBasket(productID){
    try{
        const response = await fetch(`http://localhost:3000/api/basket/add/?id=${productID}`, { method:'POST' });
        const data = await response.json();
        if(data.success) {
            basketNum();
            showMessage(data.message);
        }
        else {
            showMessage(data.message)
        }
    }
    catch (error){
        alert(error.message)
    }
}

//add the number into the basket
function basketNum(){
    let elmAmount = document.getElementById('number');
    let number = elmAmount.innerHTML;
    number++;
    elmAmount.innerHTML = number;
}

startApplication();
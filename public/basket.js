
function showMessage(msg) {
    alert(msg);
}

function renderPage() {
    getAllSelectedProducts();
}


//get all product in basket
async function getAllSelectedProducts() {
    try {
        const response = await fetch('http://localhost:3000/api/basket/getAll', { method:('GET') });
        const data = await response.json();
        if(data.success) {
            displaySelectedProducts(data.products);
            totalPrice();
        }
        else {
            showMessage(data.message)
        }
    }
    catch (error){
        alert(error.message);
    }

}

//display selected products 
async function displaySelectedProducts(products){
    const selectedItems = document.getElementById('selected-item');
    selectedItems.innerHTML='';

    for(product of products){
        const{imgUrl, name, price, id} = product;
        selectedItems.innerHTML += `
            <div class="information">
                <img src=${imgUrl} />
                <h4>${name}</h4>
                <h5 class="item-value" >Price:<strong class="item-price">${price}</strong></h5>
                <button class="deleteProduct" type="submit" value=${id}>Delete</button>
            </div>`
    }
    deleteButtons();
}

//get products to delete from basket
function deleteButtons(){
    let buttons = document.querySelectorAll('.deleteProduct');

    for (let i = 0; i < buttons.length; i++){
        buttons[i].addEventListener('click', () =>{
            let productID = buttons[i].value;

            deleteFromBasket(productID);
        });
    }
}

//delete items from  basket
async function deleteFromBasket(productID){
    try{
        const response = await fetch(`http://localhost:3000/api/basket/delete/?id=${productID}`, { method:'DELETE' });
        const data = await response.json();
        if(data.success) {
            totalPrice();
            renderPage();
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

//totalprice
function totalPrice(){
    console.log('hiiii');
    let elemTotalPrice = document.getElementById('total-price');
    let total = [];
    const items = document.querySelectorAll('.item-price')
    items.forEach(function(item){
        total.push((item.innerText));
    });

    const totalMoney = total.reduce(function(sum, item) {
        sum += parseInt(item);
        return sum;
    }, 0);
   
    elemTotalPrice.innerHTML ='<p>Total :</p>' + totalMoney + '<p> kr</p>';
}

renderPage();
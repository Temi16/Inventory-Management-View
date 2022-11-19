
let myTable = document.querySelector('#tableBody');
let cartTotalAmount = document.querySelector('.cartAmount');
const myform = document.querySelector('.salescartform');
let logOut = () =>{
    localStorage.clear();
}
myform.addEventListener('submit', (x) => {
    x.preventDefault();
    let sendForm = new FormData(myform);
    fetch(`https://localhost:44331/api/SalesCart/AddToSalesCart`, {
        method: 'POST',
        body: sendForm
    })
    .then((response) => 
    {
        return response.json();
    })
    .then(function (value){
        console.log(value);
    
        if(value.status == true)
        {
            myTable.innerHTML = "";
            DisplayProductInCart();   
        }
        else
        {
            window.alert(value.message)
            myTable.innerHTML = "";
            DisplayProductInCart();
        }
    })
})
let DisplayProductInCart = async () =>
{
    var cart = await fetch(`https://localhost:44331/api/SalesCart/GetSalesCart`)
    var myCart = await cart.json();
    //console.log(myCart)
    let count = 0;
    myCart.data.productSalesCarts.forEach(product => {
        count++;
        myTable.innerHTML += `
        <tr role="row" class="odd">
        <td>${count}</td>
        <td class="names">${product.productName}</td>
        <td><input style="border: none;" value="${product.productQuantity}" id="${product.productName}-qty"/></td>
        <td><input style="border: none;" value="${product.productPrice}" id="${product.productName}-price"/></td>
        <td>${product.productQuantity * product.productPrice}</td>
        <td><button class="my-btn1 btn btn-primary mr-2 update" id=${myCart.data.id}/${product.productName}/${product.productPrice}/${product.productQuantity}>Update</button></td>
        <td><button class="my-btn1 btn btn-danger mr-2 delete" id=${myCart.data.id}/${product.productName}>Remove</button></td>
        </tr>`
    });
    
    cartTotalAmount.value = `#${myCart.data.totalAmount}`;
    up();
    de();
}
function Delete(cartId, productName)
{
    fetch(`https://localhost:44331/api/SalesCart/DeleteProductCart/${cartId}/${productName}`,
    {
        method : 'DELETE'
    })
    .then((response) => 
    {
        myTable.innerHTML = "";
        DisplayProductInCart();
        return response.json();
        
    }) 
}

function Update(cartId, productName, sellingPrice, quantity)
{
    fetch(`https://localhost:44331/api/SalesCart/EditCart/${cartId}/${productName}/${sellingPrice}/${quantity}`,
    {
        method : 'PUT'
    })
    .then((res) => 
    {
        myTable.innerHTML = "";
        DisplayProductInCart();
        return res.json();
    })

}

const de = () => {
    buttons = document.querySelectorAll(".delete");
    buttons.forEach(btn => {
      btn.addEventListener('click', (e) => {
       let SplitId = e.target.id.split("/");
    //    console.log(e.target.id);
        Delete(SplitId[0], SplitId[1]);
      })
    })
}

const up = () => {
    buttons = document.querySelectorAll(".update");
    buttons.forEach(btn => {
      btn.addEventListener('click', (e) => {
        let productName = e.target.id.split('/')[1];
        const price = document.querySelector(`#${productName}-price`).value;
        const qty = document.querySelector(`#${productName}-qty`).value;
        let SplitId = e.target.id.split("/");
        Update(SplitId[0], SplitId[1], price, qty);
        
      })
    })
}
async function GetAvailableCart()
{
    var cart = await fetch(`https://localhost:44331/api/SalesCart/GetSalesCart`)
    var myCart = cart.json();
    //console.log(myCart);
    return myCart;
}
let createSales = async () =>
{
    var cart = await GetAvailableCart();
    if(cart.status == false)
    {
        window.alert(cart.message);
    }
    let customerName = document.querySelector('.cusName');
    console.log(customerName.value);
    fetch(`https://localhost:44331/api/Sales/CreateSales/${cart.data.id}/${customerName.value}`,
    {
        method: 'POST',
    })
    .then((response) => {
        return response.json();
    })
    .then((value) => {
        console.log(value);
        if(value.status == true)
        {
            window.alert(value.message)
            location.reload();
        }
        window.alert(value.message);
    })
}
async function DeleteAll()
{
    var cart = await GetAvailableCart();
    if(cart.status == false)
    {
        window.alert(cart.message);
    }
    fetch(`https://localhost:44331/api/SalesCart/DeleteAllProductCart/${cart.data.id}`,
    {
        method : 'DELETE'
    })
    .then((response) => 
    {
        myTable.innerHTML = "";
        DisplayProductInCart();
        return response.json();
        
    }) 
}
async function AllNotifications()
{
    let notifications = await fetch(`https://localhost:44331/api/Notification/UnreadNotifications`)
    let myNotifications = notifications.json();
    return myNotifications;
}
let fetchAllNotifications = async () => {
    let notCount = document.querySelector('#myNot');
    var notifications = await AllNotifications();
    console.log(notifications);
    if(notifications.data == null)
    {
       
        notCount.innerHTML = `<h6></h6>`
        notCount.style.display = "none";
    }
    else{
       
        notCount.innerHTML = notifications.data.length;
    }
}
async function AllPendingOrders()
{
    let orders = await fetch(`https://localhost:44331/api/Order/PendingOrders`)
    let myOrders = orders.json();
    return myOrders;
}
let fetchAllPendingOrders = async () => {
    let ordCount = document.querySelector('#myOrd');
    var orders = await AllPendingOrders();
    console.log(orders);
    if(orders.data == null)
    {
       
        ordCount.innerHTML = `<h6></h6>`
        ordCount.style.display = "none";
    }
    else{
       
        ordCount.innerHTML = orders.data.length;
    } 
}
fetchAllPendingOrders();
fetchAllNotifications();
DisplayProductInCart();

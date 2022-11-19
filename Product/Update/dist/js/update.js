let myValue = window.location.href.split('?')[1];
console.log(myValue);
console.log('hiiii');
let productname = document.querySelector('.productname');
let quantity = document.querySelector('.productquantity');
let costPrice = document.querySelector('.costprice');
let sellingPrice = document.querySelector('.sellingprice');
let logOut = () =>{
    localStorage.clear();
}
async function Product()
{
    var product = await fetch(`https://localhost:44331/api/Product/GetProduct/${myValue}`);
    var myproduct = product.json();
    console.log(myproduct);
    return myproduct;
}

let fetchProduct = async () => 
{
    var myProduct = await Product();
    console.log(myProduct);
    productname.value = myProduct.data.productName;
    quantity.value = myProduct.data.quantity;
    costPrice.value = myProduct.data.costPrice;
    sellingPrice.value = myProduct.data.sellingPrice;
}

const myform = document.querySelector('#myForm');
myform.addEventListener('submit', (x) => {
    x.preventDefault();

    let sendForm = new FormData(myform);
    fetch(`https://localhost:44331/api/Product/UpdateProduct`,
    {
        method: "PUT",
        body: sendForm
    })
    .then((response) => {
        return response.json();
    })
    .then((value) =>
    {
        if(value.status == true)
        {
           window.alert(value.message);
           window.location.href='/Product/All/AllProduct.html';
        }

    })
})
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
fetchProduct();



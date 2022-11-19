let myTable = document.querySelector('#tableBody');
let totalCost = document.querySelector('.costPrice');
let sellingPrice = document.querySelector('.sellingPrice');
let profit = document.querySelector('.profit');
let logOut = () =>{
    localStorage.clear();
}
let ViewSalesToday = async () =>
{
    var cart = await fetch(`https://localhost:44331/api/Sales/ViewSalesToday`)
    var myCart = await cart.json();
    console.log(myCart.data);
    let count = 0;
    myCart.data.products.forEach(product => {
        count++;
        myTable.innerHTML += `
        <tr role="row" class="odd">
        <td>${count}</td>
        <td>${product.productName}</td>
        <td>${product.quantity}</td>
        </tr>`
    });
    
totalCost.value = `#${myCart.data.totalCostPrice}`;
sellingPrice.value = `#${myCart.data.totalSellingPrice}`;
profit.value = `#${myCart.data.profit}`; 
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
ViewSalesToday();
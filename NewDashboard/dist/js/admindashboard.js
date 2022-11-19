console.log("hi")
let tabBody = document.querySelector('#tableBody');
let logOut = () =>{
    localStorage.clear();
}
async function AllProducts()
{
    let products = await fetch(`https://localhost:44331/api/Product/ViewAll`);
    let myProducts = products.json();
    return myProducts;
}

let fetchProducts = async () => 
{
    let count = 0;
    var products = await AllProducts();
    console.log(products)
    if(products.data.length == 0)
    {
       
            tabBody.innerHTML += `
            <tr role="row" class="odd">
            <td class="text-center">-</td>
            <td class="text-center">-</td>
            <td class="text-center">-</td>
            <td class="text-center">-</td>
            <td class="text-center">-</td>
            </tr>`
    }
    else
    {
        products.data.forEach(product => {
        
            count++;
            tabBody.innerHTML += `
            <tr role="row" class="odd">
            <td class="text-center">${count}</td>
            <td class="text-center">${product.productName}</td>
            <td class="text-center">${product.quantity}</td>
            <td class="text-center">${product.costPrice}</td>
            <td class="text-center">${product.sellingPrice}</td>
            </tr>`
        })
    }
 
}
let c = document.querySelector(".pcount");
let AllProductsCount = async () =>
{
    let products = await fetch(`https://localhost:44331/api/Product/ViewAll`);
    let myProducts = await products.json();
    console.log(myProducts);
    var cou = myProducts.data.length;
    c.innerHTML = cou;
}
let ViewSalesTodayCount = async () =>
{
    let vc = document.querySelector(".today");
    const date = new Date();
    var newDate = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
    let sales = await fetch(`https://localhost:44331/api/Sales/ViewSalesByDate/${newDate}`)
    var mySales = await sales.json();
    console.log(mySales);
    if(mySales.data == null)
    {
        vc.innerHTML = 0; 
    }
    else
    {
        var cou = mySales.data.length;
        vc.innerHTML = cou;
    } 
} 
let AllExpenses = async () =>
{
    let vc = document.querySelector(".allexpense");
    let expnses = await fetch(`https://localhost:44331/api/Purchase/ApprovedPurchase`)
    var myExpnses = await expnses.json();
    console.log(myExpnses);
    if(myExpnses.data == null)
    {
        vc.innerHTML = 0; 
    }
    else
    {
        var cou = myExpnses.data.length;
        vc.innerHTML = cou;
    } 
} 
let PendingExpenses = async () =>
{
    let vc = document.querySelector(".pending");
    let expnses = await fetch(`https://localhost:44331/api/Purchase/PendingPurchase`)
    var myExpnses = await expnses.json();
    console.log(myExpnses);
    if(myExpnses.data == null)
    {
        vc.innerHTML = 0; 
    }
    else
    {
        var cou = myExpnses.data.length;
        vc.innerHTML = cou;
    } 
}
let PendingOrders = async () =>
{
    let vc = document.querySelector(".pendingOrd");
    let orders = await fetch(`https://localhost:44331/api/Order/PendingOrders`)
    var myOrders = await orders.json();
    console.log(myOrders);
    if(myOrders.data == null)
    {
        vc.innerHTML = 0; 
    }
    else
    {
        var cou = myOrders.data.length;
        vc.innerHTML = cou;
    } 
}
let AllStores = async () =>
{
    let vc = document.querySelector(".stores");
    let stores = await fetch(`https://localhost:44331/api/Store/AllStores`)
    var myStores = await stores.json();
    console.log("hi");
    console.log(myStores);
    if(myStores.data == null)
    {
        vc.innerHTML = 0; 
    }
    else
    {
        var cou = myStores.data.length;
        vc.innerHTML = cou;
    } 
}
let TotalUsers = async () =>
{
    let vc = document.querySelector(".users");
    let users = await fetch(`https://localhost:44331/api/User/GetUsers`)
    var myUsers = await users.json();
    console.log(myUsers);
    if(myUsers.data == null)
    {
        vc.innerHTML = 0; 
    }
    else
    {
        var cou = myUsers.data.length;
        vc.innerHTML = cou;
    } 
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
AllProductsCount();
ViewSalesTodayCount();
fetchProducts();
AllStores();
AllExpenses();
PendingExpenses();
PendingOrders();
TotalUsers();
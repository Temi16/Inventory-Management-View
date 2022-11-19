var myStoreOptions = document.querySelector('#storeOption');
var mySections = document.querySelector('.section');
var mystore = document.querySelector('.store');
let logOut = () =>{
    localStorage.clear();
}
async function Stores() {
    var stores = await fetch(`https://localhost:44331/api/Store/AllStores`);
    var myStores = stores.json();
    console.log(myStores);  return myStores;
}
let fetchStores = async () => {

   var stores = await Stores();
   stores.data.forEach(store => {
    mystore.innerHTML += `<option name="Store" value="${store.storeName}">${store.storeName}</option>`
   });
   
  
}

async function StoreSections() {
    mySections.innerHTML = "";
    let storeValue = mystore.options[mystore.selectedIndex].value;
    var storeSections = await fetch(`https://localhost:44331/api/Section/StoreSections/${storeValue}`)
    var myStoreSections = storeSections.json();
    return myStoreSections; 
}

let FetchSections = async () => {
     var sections = await StoreSections();
   
     sections.data.forEach(section => 
        {
            mySections.innerHTML += `<option name="SectionName"  value="${section.sectionName}">${section.sectionName}</option>`
        })
     
}

console.log("hi");
const myform = document.querySelector('#myForm');
myform.addEventListener('submit', (x) => {
    x.preventDefault();
    console.log(myform);
    let Token = localStorage.getItem("token");
    console.log(Token);
    let sendForm = new FormData(myform);
    fetch(`https://localhost:44331/api/Product/CreateProduct`,
    {
        method : "POST",
        body: sendForm,
        headers: {
            'Authorization' : `Bearer ${Token}`
        }
    })
    .then((res) =>
    {
        console.log(res);
        return res.json();
    })
    .then(function (value){
        console.log(value);
        if(value.status == true)
        {
            window.alert(value.message);
            window.location.reload();
        }
        else
        {
            window.alert(value.message);
            window.location.reload();
        }

    })
    .catch((res) =>{
        window.alert("UnAuthorized")
        
        // localStorage.clear();
        // location.href = "/Login/login.html"
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
fetchStores();


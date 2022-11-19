
console.log("hi");
const myform = document.querySelector('#myForm');
let logOut = () =>{
    localStorage.clear();
}
myform.addEventListener('submit', (x) => {
    x.preventDefault();
    console.log(myform);
    let sendForm = new FormData(myform);
    fetch(`https://localhost:44331/api/Supplier/AddSupplier`,
    {
        method : "POST",
        body: sendForm
    })
    .then((res) =>
    {
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


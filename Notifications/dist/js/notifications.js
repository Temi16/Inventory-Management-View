let myBody = document.querySelector('.body');
let logOut = () =>{
    localStorage.clear();
}
async function AllNotifications()
{
    let notifications = await fetch(`https://localhost:44331/api/Notification/UnreadNotifications`)
    let myNotifications = notifications.json();
    return myNotifications;
}
async function AllReadNotifications()
{
    let notifications = await fetch(`https://localhost:44331/api/Notification/ReadNotifications`)
    let myNotifications = notifications.json();
    return myNotifications;
}

function readMessage(notId)
{
    fetch(`https://localhost:44331/api/Notification/ReadMessage/${notId}`,
    {
        method : 'POST'
    })
    // .then((res) => 
    // {
    //     return res.json();
    // })

}
const read = () => {
    buttons = document.querySelectorAll(".readNotification");
    buttons.forEach(btn => {
      btn.addEventListener('click', (e) => {
        let notId = e.target.id;
        console.log(notId);
        readMessage(notId);
      })
    })
}
async function AllNotification()
{
    let notifications = await fetch(`https://localhost:44331/api/Notification/UnreadNotifications`)
    let myNotifications = notifications.json();
    return myNotifications;
}
let fetchAllNotification = async () => {
    let notCount = document.querySelector('#myNot');
    var notifications = await AllNotification();
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
fetchAllNotification();
let fetchAllNotifications = async () => {
    
    
    var notifications = await AllNotifications();
    notifications.data.forEach(notifications => {
        
       
        myBody.innerHTML += 
        `
        <div class="col-12" id="bb">
            <div class="card">
                <div style="padding: 20px; display: flex;">
                    <h4>${notifications.message}</h4>
                    <div style="padding-left: 500px;">
                        <button  style="border-radius: 20px;" class="my-btn1 btn btn-primary mr-2" onclick="location.href='/NewPurchase/AddPurchase/AddPurchase.html'">Add Purchase</button>
                    </div>
                </div>     
               
            </div>
        </div>       
        `
 
    });
    
   
   
    read();  
}

fetchAllNotifications();





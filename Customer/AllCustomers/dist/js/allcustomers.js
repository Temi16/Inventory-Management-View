let tabBody = document.querySelector('#tableBody');
console.log("hi")
let logOut = () =>{
    localStorage.clear();
}
async function AllCustomers()
{
    let customers = await fetch(`https://localhost:44331/api/Customer/ViewAllCustomers`);
    let myCustomers = customers.json();
    return myCustomers;
}

let fetchCustomers = async () => 
{
    let count = 0;
    var customers = await AllCustomers();
    console.log(customers)
    customers.data.forEach(customer => {
        
        count++;
        tabBody.innerHTML += `
        <tr role="row" class="odd">
        <td>${count}</td>
        <td>${customer.firstName + " " + customer.lastName}</td>
        <td>${customer.username}</td>
        <td>${customer.email}</td>
        </tr>`
    })
}

function Search() {
    var input, filter, table, tr, td, i, txtValue;
    input = document.getElementById("myInput");
    filter = input.value.toUpperCase();
    table = document.getElementById("zero_config");
    tr= table.getElementsByTagName("tr");
    for(i = 0; i < tr.length; i++)
    {
        td = tr[i].getElementsByTagName("td")[2];
        if(td) 
        {
            txtValue = td.textContent || td.innerText;
            if(txtValue.toUpperCase().indexOf(filter) > -1)
            {
                tr[i].style.display = "";
            }
            else
            {
                tr[i].style.display = "none";
            }
        }
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
fetchCustomers();
let tabBody = document.querySelector('#tableBody');
console.log("hi")
let logOut = () =>{
    localStorage.clear();
}
async function AllEmployees()
{
    let employees = await fetch(`https://localhost:44331/api/Employee/ViewAllEmployees`);
    let myEmployees = employees.json();
    return myEmployees;
}

let fetchEmployees = async () => 
{
    let count = 0;
    var employees = await AllEmployees();
    console.log(employees)
    employees.data.forEach(employee => {
        count++;
        tabBody.innerHTML += `
        <tr role="row" class="odd">
        <td>${count}</td>
        <td>${employee.firstName + " " + employee.lastName}</td>
        <td>${employee.userName}</td>
        <td>${employee.email}</td>
        <td>${employee.phoneNumber}</td>
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
        td = tr[i].getElementsByTagName("td")[1];
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
fetchEmployees();
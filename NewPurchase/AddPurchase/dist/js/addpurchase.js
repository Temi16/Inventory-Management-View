
let myTable = document.querySelector('#tableBody');
let cartTotalAmount = document.querySelector('.cartAmount');
let logOut = () =>{
    localStorage.clear();
}
const myform = document.querySelector('.salescartform');
myform.addEventListener('submit', async (x) => {
    x.preventDefault();
    let name = document.querySelector('.productname');
    let check = await fetch(`https://localhost:44331/api/AdminCart/CheckProduct/${name.value}`);
    let ch = await check.json();
    if(ch.status == true)
    {
        let sendForm = new FormData(myform);
        fetch(`https://localhost:44331/api/AdminCart/AddToCart`, {
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
    }
    else
    {
        let text = "This product does not exist, do you want to continue?"
        if(confirm(text) == true)
        {
            let sendForm = new FormData(myform);
            fetch(`https://localhost:44331/api/AdminCart/AddToCart`, {
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
        }
        else
        {
            window.location.reload();
        }
    }
   
})
function Confirm()
{
    
}
let DisplayProductInCart = async () =>
{
    var cart = await fetch(`https://localhost:44331/api/AdminCart/GetCart`)
    var myCart = await cart.json();
    let count = 0;
    myCart.data.products.forEach(product => {
        count++;
        myTable.innerHTML += `
        <tr role="row" class="odd">
        <td>${count}</td>
        <td class="names">${product.productName}</td>
        <td><input style="border: none;" value="${product.quantity}" id="${product.productName}-qty"/></td>
        <td><input style="border: none;" value="${product.price}" id="${product.productName}-price"/></td>
        <td>${product.quantity * product.price}</td>
        <td><button class="my-btn1 btn btn-primary mr-2 update" id=${myCart.data.id}/${product.productName}/${product.price}/${product.quantity}>Update</button></td>
        <td><button class="my-btn1 btn btn-danger mr-2 delete" id=${myCart.data.id}/${product.productName}>Remove</button></td>
        </tr>`
    });
    
    cartTotalAmount.value = `#${myCart.data.totalAmount}`;
    up();
    de();
}

async function Suppliers()
{
    let sup = await fetch(`https://localhost:44331/api/Supplier/AllSuppliers`);
    let suppliers = sup.json();
    return suppliers;
}

let fetchSuppliers = async () =>
{
    let supTag = document.querySelector('.supName');
    let suppliers = await Suppliers();
    
    suppliers.data.forEach(sup =>
        {
            supTag.innerHTML += `
            <option value="${sup.id}">${sup.supplierName}</option>
            `
        })

       
      
}

function Delete(cartId, productName)
{
    fetch(`https://localhost:44331/api/AdminCart/DeleteProductCart/${cartId}/${productName}`,
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

function Update(cartId, productName, price, quantity)
{
    fetch(`https://localhost:44331/api/AdminCart/UpdateCart/${cartId}/${productName}/${quantity}/${price}`,
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
    var cart = await fetch(`https://localhost:44331/api/AdminCart/GetCart`)
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
    let sup = document.querySelector('#sup'); 
    let t = sup.options[sup.selectedIndex].value;
    fetch(`https://localhost:44331/api/Purchase/CreatePurchase/${cart.data.id}/${t}`,
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
    fetch(`https://localhost:44331/api/AdminCart/DeleteProductCart/${cart.data.id}`,
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
fetchSuppliers();
DisplayProductInCart();


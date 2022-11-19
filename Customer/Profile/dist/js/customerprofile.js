
console.log('hiiii');
let cusCat = document.querySelector('#cusCart');
let productname = document.querySelector('.productname');
let quantity = document.querySelector('.productquantity');
let costPrice = document.querySelector('.costprice');
let sellingPrice = document.querySelector('.sellingprice');
let logOut = () =>{
    localStorage.clear();
}
async function User()
{
    let userId = localStorage.getItem("userId");
    var user = await fetch(`https://localhost:44331/api/User/GetUser/${userId}`);
    var myUser = user.json();
    console.log(myUser);
    return myUser;
}

let fetchUser = async () => 
{
    var myUser = await User();
    console.log(myUser);
    productname.value = `${myUser.data.firstName + " " + myUser.data.lastName}`;
    quantity.value = myUser.data.userName;
    costPrice.value = myUser.data.email;
   
}

const myform = document.querySelector('#myForm');
myform.addEventListener('submit', (x) => {
    x.preventDefault();

    let sendForm = new FormData(myform);
    fetch(`https://localhost:44331/api/User/UpdateDetails`,
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
           window.location.reload();
        }

    })
})
async function AllCart()
{
    let userId = localStorage.getItem("userId");
    let cart = await fetch(`https://localhost:44331/api/CustomerCart/GetCustomerCart/${userId}`)
    let myCart = cart.json();
    return myCart;
}
let fetchAllCart = async () => {
    
    var carts = await AllCart();
    console.log(carts);
    if(carts.data == null || carts.data.productCustomerCarts.length == 0)
    {
        cusCat.innerHTML = `<h6></h6>`
        cusCat.style.display = "none";
    }
    else
    {
        cusCat.innerHTML = carts.data.productCustomerCarts.length;
    }
}
fetchAllCart();
fetchUser();



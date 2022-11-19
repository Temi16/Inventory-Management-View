let cusCat = document.querySelector('#cusCart');
let cartTotalAmount = document.querySelector('.cartAmount');
let tabBody = document.querySelector('#tableBody');
let logOut = () =>{
    localStorage.clear();
}
let DisplayProductInCart = async () =>
{
    let userId = localStorage.getItem("userId");
    var cart = await fetch(`https://localhost:44331/api/CustomerCart/GetCustomerCart/${userId}`)
    var myCart = await cart.json();
    console.log(myCart);
    if(myCart.data == null || myCart.data.productCustomerCarts.length == 0)
    {
        cusCat.innerHTML = `<h6></h6>`
        cusCat.style.display = "none";
    }
    else
    {
        cusCat.innerHTML = myCart.data.productCustomerCarts.length;
    }
    let count = 0;
    myCart.data.productCustomerCarts.forEach(product => {
        console.log(product);
        count++;
        tabBody.innerHTML += `
        <tr role="row" class="odd">
        <td>${count}</td>
        <td class="names">${product.productName}</td>
        <td><input style="border: none;" value="${product.productQuantity}" id="${product.productName}-qty"/></td>
        <td><input style="border: none;" value="${product.productPrice}" id="${product.productName}-price"/></td>
        <td>${product.productQuantity * product.productPrice}</td>
        <td><button class="my-btn1 btn btn-primary mr-2 update" id=${myCart.data.id}/${product.productName}/${product.price}/${product.quantity}>Update</button></td>
        <td><button class="my-btn1 btn btn-danger mr-2 delete" id=${myCart.data.id}/${product.productName}>Remove</button></td>
        </tr>`
    });
    
    cartTotalAmount.value = `#${myCart.data.totalAmount}`;
  
}

let createPayment = async () =>
{
    let userId = localStorage.getItem("userId");
    var cart = await fetch(`https://localhost:44331/api/CustomerCart/GetCustomerCart/${userId}`);
    var myCart = await cart.json();
    console.log(myCart);
    if(cart.status == false)
    {
        window.alert(cart.message);
    }
    fetch(`https://localhost:44331/api/Order/CreateOrder/${myCart.data.id}/${userId}`, {
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

DisplayProductInCart();
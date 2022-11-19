
let cusCat = document.querySelector('#cusCart');
let logOut = () =>{
    localStorage.clear();
}
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
let tabBody = document.querySelector('#tableBody');
console.log("hi")
let body = document.querySelector('.bod');
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
    products.data.forEach(product => {
        
        count++;
        body.innerHTML += `
        <div class="column" style="padding: 20px">
            <div>
                <button class="addToCart" style="border: none;"><img src="https://localhost:44331/Images/${product.image}" width="250" height="200" id="${product.productName}"/></button>
            </div>
                <h4 style="padding-left: 100px">${product.productName}</h4>
                <h4 style="padding-left: 100px">${product.sellingPrice}</h4>
                <div style="padding-left: 40px;">
                    <input type="number" value="" style="border: none; align-items: center;" id="${product.productName}-qty" placeholder="Qty"/>
                </div>
                
        </div>
        `
        grid();
        add();
    })
}
var elements = document.getElementsByClassName("column");
function grid()
{
    for(i = 0; i < elements.length; i++)
    {
        elements[i].getElementsByClassName.flex = "50";
    }
}
const add = () => {
    buttons = document.querySelectorAll(".addToCart");
    buttons.forEach(btn => {
      btn.addEventListener('click', (e) => {
        let productName = e.target.id;
        // const price = document.querySelector(`#${productName}-price`).value;
        console.log(productName);
        const qty = document.querySelector(`#${productName}-qty`).value;
        console.log(qty);
        addToCart(productName, qty);
        
      })
    })
}
const addToCart = async (namee, quantity) => {
    data = {
        productName : namee,
        productQuantity : quantity
    }
        let userId = localStorage.getItem("userId");
        console.log(userId);
        let text = "Add Product to Cart";
        if(confirm(text) == true)
        {
            fetch(`https://localhost:44331/api/CustomerCart/AddToCustomerCart/${userId}`,
            {
                method: 'POST',
                headers : {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            })
            .then((response) => 
            {
                return response.json();
            })
            .then(function (value){
                console.log(value);
            
                if(value.status == true)
                {
                    window.alert(value.message);
                    location.reload();
                }
                else
                {
                    window.alert(value.message);
                    location.reload();
                }
            })
        }
        else
        {
            location.reload(); 
        }
}
fetchProducts();
fetchAllCart();
// AllProductsCount();

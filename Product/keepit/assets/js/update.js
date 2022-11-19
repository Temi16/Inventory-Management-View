let myValue = window.location.href.split('?')[1];
console.log(myValue);
console.log('hiiii');
let productname = document.querySelector('#productname');
let quantity = document.querySelector('#productquantity');
let costPrice = document.querySelector('#costprice');
let sellingPrice = document.querySelector('#sellingprice');

async function Product()
{
    var product = await fetch(`https://localhost:44331/api/Product/GetProduct/${myValue}`);
    var myproduct = product.json();
    console.log(myproduct);
    return myproduct;
}

let fetchProduct = async () => 
{
    var myProduct = await Product();
    console.log(myProduct);
    productname.value = myProduct.data.productName;
    quantity.value = myProduct.data.quantity;
    costPrice.value = myProduct.data.costPrice;
    sellingPrice.value = myProduct.data.sellingPrice;
}

const myform = document.querySelector('#myform');
myform.addEventListener('submit', (x) => {
    x.preventDefault();

    let sendForm = new FormData(myform);
    fetch(`https://localhost:44331/api/Product/UpdateProduct`,
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
           // window.alert(value.message);
          //  window.location.href='/Product/All/AllProduct.html';
        }

    })
})

fetchProduct();



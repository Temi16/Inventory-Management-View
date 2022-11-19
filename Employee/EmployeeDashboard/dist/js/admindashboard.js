let tabBody = document.querySelector('#tableBody');
console.log("hi")
let logOut = () =>{
    localStorage.clear();
}
async function AllProducts()
{
    let products = await fetch(`https://localhost:44331/api/Employee/ViewProductDetails`);
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
        tabBody.innerHTML += `
        <tr role="row" class="odd">
        <td>${count}</td>
        <td><img src="https://localhost:44331/Images/${product.image}" width="80" height="80"/></td>
        <td>${product.productName}</td>
        <td>${product.quantity}</td>
        <td>${product.storeName}</td>
        <td>${product.sectionName}</td>
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

fetchProducts();
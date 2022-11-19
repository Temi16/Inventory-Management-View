let myBody = document.querySelector('.body');

let logOut = () =>{
    localStorage.clear();
}
async function AllOrder()
{
    let userId = localStorage.getItem("userId");
    let orders = await fetch(`https://localhost:44331/api/Order/GetAllOrders/${userId}`)
    let myOrders = orders.json();
    return myOrders;
}

let fetchAllOrders = async () => {
    
    var orders = await AllOrder();
    console.log(orders);
    orders.data.forEach(order => {
        
       
        myBody.innerHTML += 
        `

        <div class="col-12" id="bb">
        <div class="card">
           
            <div class="card-body">
                <div style="display: flex;">
                   
                    <div style="padding-left: 890px;">
                        <label>Reference Number: </label>
                        <input value="" id="ref" readonly style="border: none;"/> 
                    </div>
                </div>
                
                <div style="padding-left: 890px;">
                    <label>Date: </label>
                    <input value="" id="date" readonly style="border: none;"/>
                </div>
            </div>
               
               
                <div class="table-responsive">
                    <div id="zero_config_wrapper" class="dataTables_wrapper container-fluid dt-bootstrap4">
                        <div class="row">
                            <div class="col-sm-12 col-md-6">
                                <div class="dataTables_length" id="zero_config_length">
                                   
                                      
                                    <h5>List of Products</h5>
                                </div>
                               
                            </div>
                            
                               
                             
                           
                            <div class="row">
                                <div class="col-sm-12">
                                    <table id="zero_config" class="table table-striped table-bordered dataTable" role="grid" aria-describedby="zero_config_info">
                                        <thead>
                                            <tr role="row">
                                                <th class="sorting_asc" tabindex="0" aria-controls="zero_config" rowspan="1" colspan="1" aria-sort="ascending" aria-label="Name: activate to sort column descending" style="width: 188.891px;">
                                                    S/N
                                                </th>
                                                <th class="sorting" tabindex="0" aria-controls="zero_config" rowspan="1" colspan="1" aria-label="Position: activate to sort column ascending" style="width: 300.594px;">
                                                    ProductName
                                                </th>
                                                <th class="sorting" tabindex="0" aria-controls="zero_config" rowspan="1" colspan="1" aria-label="Office: activate to sort column ascending" style="width: 144.969px;">
                                                    Quantity
                                                </th>
                                                <th class="sorting" tabindex="0" aria-controls="zero_config" rowspan="1" colspan="1" aria-label="Age: activate to sort column ascending" style="width: 65.7188px;">
                                                    Price Per One
                                                </th>
                                                <th class="sorting" tabindex="0" aria-controls="zero_config" rowspan="1" colspan="1" aria-label="Start date: activate to sort column ascending" style="width: 121.797px;">
                                                    Total Price
                                                </th>
                                              
                                            </tr>
                                        </thead>
                                        <tbody id="tableBody">
                                            <tr>

                                            </tr>
                                         
                                        </tbody>
                                      
                                    </table>
                                </div>
                                <div style="padding-left: 10px; padding-top: 20px; display: flex;" >
                                    <label><h3>Total: </h3></label>
                                    <h3><input value="" id="total" readonly style="border: none;"/></h3>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>

            </div>
        </div>
    </div>
      
        `
        
       
       
          
            
       
    });
     let table = document.querySelectorAll('#tableBody');
     
     let refs = document.querySelectorAll('#ref'); 
     let dates = document.querySelectorAll('#date');
     let totals = document.querySelectorAll('#total');
    
      for(let i = 0; i < 1; i++)
        {
            orders.data.forEach(p => {
                let count = 0;
                let tot = 0;
                p.cart.productCustomerCarts
                .forEach(pp => {
                   
                    count++;
                   table[i].innerHTML +=
                   ` <tr>
                   <td>${count}</td>
                   <td>${pp.productName}</td>
                   <td>${pp.productQuantity}</td>
                   <td>${pp.productPrice}</td>
                   <td>${pp.totalPrice}</td>
                   </tr>`
                   tot += pp.totalPrice;
                   refs[i].value = p.referenceNo;
                   dates[i].value = p.date;
                   totals[i].value = `#${tot}`;
                    
                }) 
                i++
                
                
            })


        }    
            

}




fetchAllOrders();



async function SearchDate()
{
    let collectedDate = document.querySelector('#myInput');
    if(collectedDate.value == "")
    {
        myBody.innerHTML = "";
        fetchAllOrders();
    }
    let orders = await fetch(`https://localhost:44331/api/Order/ViewOrdersByDate/${collectedDate.value}`)
    let myOrders = orders.json();
    console.log(myOrders);
    return myOrders;
}

 let fetchDateOrders = async () =>
{
    let orders = await SearchDate();
    
   
    myBody.innerHTML = "";
    orders.data.forEach(sale => {
        
       
        myBody.innerHTML += 
        `

        <div class="col-12">
        <div class="card">
           
            <div class="card-body">
                <div style="display: flex;">
                  
                    <div style="padding-left: 890px;">
                        <label>Reference Number: </label>
                        <input value="" id="ref" readonly style="border: none;"/>
                    </div>
                </div>
                <div>
                <div style="padding-left: 890px;">
                    <label>Date: </label>
                    <input value="" id="date" readonly style="border: none;"/>
                </div>
            </div>
               
               
                <div class="table-responsive">
                    <div id="zero_config_wrapper" class="dataTables_wrapper container-fluid dt-bootstrap4">
                        <div class="row">
                            <div class="col-sm-12 col-md-6">
                                <div class="dataTables_length" id="zero_config_length">
                                   
                                      
                                    <h5>List of Products</h5>
                                </div>
                               
                            </div>
                            
                               
                             
                           
                            <div class="row">
                                <div class="col-sm-12">
                                    <table id="zero_config" class="table table-striped table-bordered dataTable" role="grid" aria-describedby="zero_config_info">
                                        <thead>
                                            <tr role="row">
                                                <th class="sorting_asc" tabindex="0" aria-controls="zero_config" rowspan="1" colspan="1" aria-sort="ascending" aria-label="Name: activate to sort column descending" style="width: 188.891px;">
                                                    S/N
                                                </th>
                                                <th class="sorting" tabindex="0" aria-controls="zero_config" rowspan="1" colspan="1" aria-label="Position: activate to sort column ascending" style="width: 300.594px;">
                                                    ProductName
                                                </th>
                                                <th class="sorting" tabindex="0" aria-controls="zero_config" rowspan="1" colspan="1" aria-label="Office: activate to sort column ascending" style="width: 144.969px;">
                                                    Quantity
                                                </th>
                                                <th class="sorting" tabindex="0" aria-controls="zero_config" rowspan="1" colspan="1" aria-label="Age: activate to sort column ascending" style="width: 65.7188px;">
                                                    Price Per One
                                                </th>
                                                <th class="sorting" tabindex="0" aria-controls="zero_config" rowspan="1" colspan="1" aria-label="Start date: activate to sort column ascending" style="width: 121.797px;">
                                                    Total Price
                                                </th>
                                              
                                            </tr>
                                        </thead>
                                        <tbody id="tableBody">
                                            <tr>

                                            </tr>
                                         
                                        </tbody>
                                      
                                    </table>
                                </div>
                                <div style="padding-left: 10px; padding-top: 20px; display: flex;" >
                                    <label><h3>Total: </h3></label>
                                    <h3><input value="" id="total" readonly style="border: none;"/></h3>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>

            </div>
        </div>
    </div>
      
        `
        
       
       
          
            
       
    });
     let table = document.querySelectorAll('#tableBody');
     
     let refs = document.querySelectorAll('#ref'); 
     let dates = document.querySelectorAll('#date');
     let totals = document.querySelectorAll('#total');
    
     for(let i = 0; i < 1; i++)
     {
         orders.data.forEach(p => {
             let count = 0;
             let tot = 0;
             p.cart.productCustomerCarts
             .forEach(pp => {
                
                 count++;
                table[i].innerHTML +=
                ` <tr>
                <td>${count}</td>
                <td>${pp.productName}</td>
                <td>${pp.productQuantity}</td>
                <td>${pp.productPrice}</td>
                <td>${pp.totalPrice}</td>
                </tr>`
                tot += pp.totalPrice;
                refs[i].value = p.referenceNo;
                dates[i].value = p.date;
                totals[i].value = `#${tot}`;
                 
             }) 
             i++
             
             
         })


     }    
        
       
}
let cusCat = document.querySelector('#cusCart');
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

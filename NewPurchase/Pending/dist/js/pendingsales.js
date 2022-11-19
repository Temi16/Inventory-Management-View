let body = document.querySelector('#body');
let myBody = document.querySelector('.body');

let logOut = () =>{
    localStorage.clear();
}
async function UnApprovedPurchase()
{
    let purchases = await fetch(`https://localhost:44331/api/Purchase/PendingPurchase`)
    let myPurchases = purchases.json();
    return myPurchases;
}

let fetchPendingPurchases = async () => {
    
    var purchases = await UnApprovedPurchase();
    console.log(purchases.status);
    if(purchases.status == false)
    {
      myBody.innerHTML = "";
      myBody.innerHTML = `<p>${purchases.message}</p>`
    }
    else
    {
      purchases.data.forEach(purchase => {
        
        myBody.innerHTML += 
        `
        <div class="col-12" id="bb">
        <div class="card">
           
            <div class="card-body">
                <div style="display: flex;">
                    <div>
                        <label>Supplier Name: </label>
                        <input value="" id="suNames" readonly style="border: none;"/>
                    </div>
                    <div style="padding-left: 600px;">
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
                                <div id="mm">
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
    let names = document.querySelectorAll('#suNames'); 
    let refs = document.querySelectorAll('#ref'); 
    let dates = document.querySelectorAll('#date');
    let totals = document.querySelectorAll('#total');
    let m = document.querySelectorAll('#mm');
     for(let i = 0; i < 1; i++)
       {
           purchases.data.forEach(p => {
               let count = 0;
              
               let tot = 0;
               p.cart.products.forEach(pp => {
                  
                   count++;
                   table[i].innerHTML +=
                   ` <tr>
                   <td>${count}</td>
                   <td>${pp.productName}</td>
                   <td>${pp.quantity}</td>
                   <td>${pp.price}</td>
                   <td>${pp.totalPrice}</td>
                   </tr>`
                   tot += pp.totalPrice;
                   names[i].value = p.supplierName;
                   refs[i].value = p.referenceNo;
                   dates[i].value = p.dateCreated;
                   totals[i].value = `#${tot}`;
                   
               })
               
               m[i].innerHTML += ` <div class="card-body" style="padding-left: 1100px;">
               <button id="${p.id}" class="btn btn-primary appr">Approve</button>
               </div>`
               i++
               
               
           })


       } 
    }
   
   
 app();
}

function Approve(purchaseId)
{
  fetch(`https://localhost:44331/api/Purchase/ApprovePurchase/${purchaseId}`, {
    method: "POST",
  })
  .then((res) => 
  {
    myBody.innerHTML = "";
    fetchPendingPurchases();
      return res.json();
  })
  .then(function (value){
    console.log(value);

    if(value.status == true)
    {
        window.alert(value.message)
        window.location.reload();   
    }
    else
    {
        window.alert(value.message)
        window.location.reload();
    }
 })
}
const app = () => {
  buttons = document.querySelectorAll(".appr");
  buttons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      Approve(e.target.id);
    })
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
fetchPendingPurchases();


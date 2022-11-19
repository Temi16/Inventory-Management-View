console.log("hi");
// let email = document.querySelector("#lemail");
// let password = document.querySelector("#lpassword");
// let login = document.querySelector("#btn");


const myform = document.querySelector('#logInForm');

myform.addEventListener('submit', (x)=> 
{
    x.preventDefault();
    let sendForm = new FormData(myform);
    console.log("reached here");
    fetch('https://localhost:44331/api/User/Login',
    {
        method : "POST",
        body : sendForm
    })
    .then((res) => {
        return res.json();
            })
    .then(function (value){
            console.log(value);
            localStorage.setItem("token", value.token)
            if(value.status == true)
            {
                localStorage.setItem("username", value.data.username)
                localStorage.setItem("userId", value.data.id)
                value.data.roles.forEach(element => {
                    if(element.name == "Admin")
                    {
                        location.href = "/NewDashboard/adminDashboard.html"
                    }
                    if(element.name == "Employee")
                    {
                        location.href = "/Employee/EmployeeDashboard/employeeDashboard.html"
                    }
                    if(element.name == "Customer")
                    {
                        location.href = "/Customer/CustomerDashboard/CustomerDashboard.html"
                    }
                })
            }
            else{
                window.alert(value.message)
            }
            
    })
   .catch((res) =>{
    window.alert("Error")
    location.reload();
   })
})
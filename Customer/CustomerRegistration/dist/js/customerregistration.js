
const myform = document.querySelector('#myForm');
myform.addEventListener('submit', (x) => {
    x.preventDefault();
    console.log(myform);
    let sendForm = new FormData(myform);
    fetch(`https://localhost:44331/api/Customer/CustomerRegistration`,
    {
        method : "POST",
        body: sendForm
    })
    .then((res) =>
    {
        return res.json();
    })
    .then(function (value){
        console.log(value);
        if(value.status == true)
        {
            window.alert(value.message);
            window.location.href="/Login/login.html";
        }
        else
        {
            window.alert(value.message);
            window.location.reload();
        }

    })
    
})
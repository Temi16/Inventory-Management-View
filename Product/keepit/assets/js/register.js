var myStoreOptions = document.querySelector('#storeOption');
var mySections = document.querySelector('#mySection');
var mystore = document.querySelector('#myStore');

async function Stores() {
    var stores = await fetch(`https://localhost:44331/api/Store/AllStores`);
    var myStores = stores.json();
    console.log(myStores);
    return myStores;
}
let fetchStores = async () => {

   var stores = await Stores();
   stores.data.forEach(store => {
    myStore.innerHTML += `<option name="Store" value="${store.storeName}">${store.storeName}</option>`
   });
   
  
}

async function StoreSections() {
    mySections.innerHTML = "";
    let storeValue = mystore.options[mystore.selectedIndex].value;
    console.log(storeValue);
    var storeSections = await fetch(`https://localhost:44331/api/Section/StoreSections/${storeValue}`)
    var myStoreSections = storeSections.json();
    return myStoreSections; 
}

let FetchSections = async () => {
     var sections = await StoreSections();
   
     sections.data.forEach(section => 
        {
            mySections.innerHTML += `<option name="SectionName"  value="${section.sectionName}">${section.sectionName}</option>`
        })
     
}


console.log("hi");
const myform = document.querySelector('#myform');
myform.addEventListener('submit', (x) => {
    x.preventDefault();
    console.log(myform);
    let sendForm = new FormData(myform);
    fetch(`https://localhost:44331/api/Product/CreateProduct`,
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
    })
    
})
fetchStores();


var titel = document.getElementById('titel');
var price = document.getElementById('price');
var taxes = document.getElementById('taxes');
var ads = document.getElementById('ads');
var discount = document.getElementById('discount');
var total = document.getElementById('total');
var count = document.getElementById('count');
var category = document.getElementById('category');
var create = document.getElementById('create');
var mood = 'create';
let tmp ;
// get total
function getTotal() {
    if (price.value !='') {
        let result = (+price.value + +taxes.value + +ads.value)  - +discount.value ;
        total.innerHTML = result ;

            total.style.backgroundColor = 'green'
    }else{
        total.innerHTML = '' ;
        total.style.backgroundColor = 'red';
    }
};
// crete prodect 
let dataPro ;
if (localStorage.product != null) {
    dataPro = JSON.parse(localStorage.product)
}else{
    dataPro = [] ;
};
// save localestoredge
create.onclick = function () {
    var newPro = {
        titel : titel.value.toLowerCase() ,
        price : price.value ,
        taxes : taxes.value ,
        ads   : ads.value   ,
        discount : discount.value ,
        totla : total.innerHTML ,
        count : count.value ,
        category : category.value.toLowerCase()
    }
    
    if (titel.value != '' 
    && price.value != '' 
    && category.value !=''
    && newPro.count < 100) {

        if (mood === 'create') {
            if (newPro.count > 1) {
            for(i=0 ; i < newPro.count ; i++){
            dataPro.push(newPro);
            }
            }else{
                dataPro.push(newPro);
                clearData() ;
            }
    }else{
        dataPro[   tmp  ] = newPro ;
        mood = 'create';
        create.innerHTML = 'Create';
        count.style.display = 'block'
    }
    }
    localStorage.setItem('product' , JSON.stringify(dataPro));
    showData();
}
// clear inputs 
function clearData() {
    titel.value = '' ;
    price.value = '' ;
    taxes.value = '' ;
    ads.value = '' ;
    discount.value = '';
    count.value = '' ; 
    total.innerHTML = '' ;
    category.value = '' ;
}
// read 
function showData() {
    
    getTotal();
    let table ='';
    for (let i = 0;i < dataPro.length; i++) { 
        table += `
             <tr>
                    <td>${i+1}</td>
                    <td>${dataPro[i].titel}</td>
                    <td>${dataPro[i].price}</td>
                    <td>${dataPro[i].taxes }</td>
                    <td>${dataPro[i].ads}</td>
                    <td>${dataPro[i].discount}</td>
                    <td>${dataPro[i].total}</td>
                    <td>${dataPro[i].category}</td>
                    <td><button onclick='updateData(${i})' id="update">Update</button></td>
                    <td><button onclick='deletData( ${i}  )' id="delete">Delete</button></td>
                </tr>        
        `
        let div = document.getElementById('deletAll');
        if (dataPro.length > 0) {
           
            div.innerHTML = `<button onclick="deleteAll()" >Delete  All (${dataPro.length}) </button>`
        }else{
            div.innerHTML='';
        }
    }

    document.getElementById('tbody').innerHTML = table;
};
showData();
// delete 
function deletData(i) {
    
    dataPro.splice(i,1);
    localStorage.product = JSON.stringify(dataPro);
    showData();
}
// delete All
function deleteAll() {
    localStorage.clear();
    dataPro.splice(0);
    showData();
};
// update 
function updateData(i){
    titel.value = dataPro[i].titel ;
    price.value = dataPro[i].price ;
    taxes.value = dataPro[i].taxes ;
    ads.value = dataPro[i].ads ;
    discount.value = dataPro[i].discount ;
    category.value = dataPro[i].category ;
    getTotal();
    count.style.display = 'none' ;
    create.innerHTML = 'Update';
    mood = 'update';
    tmp = i ;
    scroll({
        top : 0 ,
        behavior : "smooth", 
    })
};
// search 
let searchMood = 'titel';
function getSearchMood(id) {
    
    let search = document.getElementById('search');
    if (id == "serchTitel") {
        searchMood = 'titel';
        search.placeholder = 'Search By Titel';
    }else{
        searchMood = 'category';
        search.placeholder = "Search By Category" ;
    }
    search.focus() ;
    search.value = '';
    showData();
};
function searchData(value) {
    let table = '' ;
    if (searchMood == 'titel') {
        for(let i=0 ; i< dataPro.length ; i++){
            if (dataPro[i].titel.includes(value.toLowerCase())) {
                table += `
             <tr>
                    <td>${i}</td>
                    <td>${dataPro[i].titel}</td>
                    <td>${dataPro[i].price}</td>
                    <td>${dataPro[i].taxes }</td>
                    <td>${dataPro[i].ads}</td>
                    <td>${dataPro[i].discount}</td>
                    <td>${dataPro[i].total}</td>
                    <td>${dataPro[i].category}</td>
                    <td><button onclick='updateData(${i})' id="update">Update</button></td>
                    <td><button onclick='deletData( ${i}  )' id="delete">Delete</button></td>
                </tr>        
        `;
            }
        }
    }else{
        
        for(let i=0 ; i< dataPro.length ; i++){
            if (dataPro[i].category.includes(value)) {
                table += `
             <tr>
                    <td>${i}</td>
                    <td>${dataPro[i].titel}</td>
                    <td>${dataPro[i].price}</td>
                    <td>${dataPro[i].taxes }</td>
                    <td>${dataPro[i].ads}</td>
                    <td>${dataPro[i].discount}</td>
                    <td>${dataPro[i].total}</td>
                    <td>${dataPro[i].category}</td>
                    <td><button onclick='updateData(${i})' id="update">Update</button></td>
                    <td><button onclick='deletData( ${i}  )' id="delete">Delete</button></td>
                </tr>        
        `;
            }
        }
    };
    document.getElementById('tbody').innerHTML = table;
};
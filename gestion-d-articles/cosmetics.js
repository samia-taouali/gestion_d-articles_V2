
let nom, Brand, select, prix, date, resultat;


let submit = document.getElementById('submit');
let mood = 'Add';
let tmp;
// let dataall;

if(localStorage.product != null){
    dataall = JSON.parse(localStorage.product);
}else{
    dataall = [];
}
showinfos();

submit.onclick = function(){
    nom = document.getElementById('nom');
    select = document.getElementById('select');
    prix = document.getElementById('prix');
    date = document.getElementById('date');
    Brand = document.getElementById('Brand');
    resultat = document.getElementById('cate');

    //NAME
    if (nom.value == ""){
        document.getElementById("nom").style.border = "2px solid #ff0000";
        nameValid=false;
    }
    else if(nom.value.length < 30 && nom.value.length > 3){
        document.getElementById("nom").style.border = "2px solid #59CE8F";
        nameValid=true;
    }
    else{
        document.getElementById("nom").style.border = "2px solid #ff0000";
        nameValid=false;
    }

    // BRAND
    if (Brand.value == ""){
        document.getElementById("Brand").style.borderColor = "red";
        BrandValid=false;
    }
    else{
        document.getElementById("Brand").style.border = "2px solid #59CE8F";
        BrandValid=true;
    }

    //  Type
    if (select.value == ""){
        document.getElementById("select").style.borderColor = "red";
        typeValid=false;
    } 
    else{
        document.getElementById("select").style.border = "2px solid #59CE8F";
        typeValid=true;
    }

    //  prix
    if (prix.value.match(/^[1-9]{1,9}$/g)){
        document.getElementById("prix").style.border = "2px solid #59CE8F";
        prixValid=true;
    }

    else{
        document.getElementById("prix").style.borderColor = " red";
        prixValid=false;
    }
// promotion input radio
var rd1 = document.getElementById("radio-promotion-1");
var rd2 = document.getElementById("radio-promotion-2");

if(rd1.checked==true ){
    resultat.innerHTML= `${rd1.value}` ;
    Promo = 'Oui' ;
    promotionValid=true;
    
}else if(rd2.checked==true){
    resultat.innerHTML= `${rd2.value}` ;
    Promo = 'Non' ;
    promotionValid=true;
}else{
    promotionValid=false;
}
    // date
    if (date.value == ""){
        document.getElementById("date").style.borderColor = "red";
        dateValid=false;
        
    }
    else{
        document.getElementById("date").style.border = "2px solid #59CE8F";
        dateValid=true;
    }

    if(nameValid=false || BrandValid == false || typeValid == false || prixValid == false || dateValid == false || promotionValid == false){
        preventDefault();
    }
    
    else{
        addToLocalStorage();
        showinfos();
        clear()
    }
}

function addToLocalStorage(){
    let newPro = {
        nom: nom.value,
        Brand: Brand.value,
        prix: prix.value,
        select: select.value,
        date: date.value,
        Promo: Promo,
    }
    if(mood === 'Add'){
        dataall.push(newPro);
    }
    else{
        dataall[tmp]  =  newPro;
        mood = 'Add';
        submit.innerHTML = 'Add';
    }
    localStorage.setItem('product', JSON.stringify(dataall));
}

function showinfos(){
let table = '';
for(let i = 0 ; i<dataall.length ; i++){
    table +=`   <tr>
    <td>${dataall[i].nom}</td>
    <td>${dataall[i].select}</td>
    <td>${dataall[i].prix}</td>
    <td>${dataall[i].date}</td>
    <td>${dataall[i].Brand}</td>
    <td>${dataall[i].Promo}</td>
    <td><button   onclick="UpdateData(${i})" id="update">Edit</button>
    <button   onclick="deleteData(${i})" id="deletee">Delete</button></td>
    
</tr>`;
}
document.getElementById("tbody").innerHTML = table; 

}

function deleteData(i){
    dataall.splice(i,1);
    localStorage.product = JSON.stringify(dataall);
    showinfos();
}  

function clear(){
    nom.value = '';
    select.value = '';
    prix.value = '';
    Brand.value = '';
    date.value = '';
    Promo.value = '';
    
}

function UpdateData(i) {
    nom.value = dataall[i].nom;
    select.value = dataall[i].select;
    prix.value = dataall[i].prix;
    Brand.value = dataall[i].Brand;
    date.value = dataall[i].date;
    Promo.value = dataall[i].Promo;
    submit.innerHTML= 'modifier';
    mood = 'modifier';
    tmp = i;
}

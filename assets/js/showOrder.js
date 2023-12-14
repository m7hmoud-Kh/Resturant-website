var tableBodyElm = document.querySelector('tbody');
var purchaseMeal =  JSON.parse(localStorage.getItem("purchaseMeals"));

var typeMeal = {
    1: "breakfast",
    2: "lanuch",
    3: "dinner",
};
var countMeal = 0;
var totalOfOrder = 0;
for(const meal of purchaseMeal){
    var trElm = document.createElement('tr');
    var thElm = document.createElement('th');
    thElm.scope = 'row';
    thElm.textContent = ++countMeal;

    var tdElmImage = document.createElement('td');
    var imgElm = document.createElement('img');
    imgElm.src = meal.image;
    imgElm.style.width = '150px';
    imgElm.style.height = '150px';
    tdElmImage.appendChild(imgElm);

    var tdElmName = document.createElement('td')
    tdElmName.textContent = meal.name;

    var tdElType = document.createElement('td');
    tdElType.textContent = typeMeal[meal.type];

    var tdElmPrice = document.createElement('td');
    tdElmPrice.textContent  = meal.price;

    var tdElQuantity = document.createElement('td');
    tdElQuantity.textContent = meal.quantity;
    tdElQuantity.className = 'quantity';


    var tdElmTotalPrice = document.createElement('td')
    tdElmTotalPrice.textContent = meal.price * meal.quantity;

    var tdElmOperation = document.createElement('td');
    tdElmOperation.innerHTML = `<button  class='btn btn-primary increase'>+</button>
    <button class="btn btn-secondary descrease">-</button>
    <button class="btn btn-danger remove"><i class="fa fa-trash"></i></button>`
    trElm.appendChild(thElm);
    trElm.appendChild(tdElmImage);
    trElm.appendChild(tdElmName);
    trElm.appendChild(tdElType);
    trElm.appendChild(tdElmPrice);
    trElm.appendChild(tdElQuantity);
    trElm.appendChild(tdElmTotalPrice);
    trElm.appendChild(tdElmOperation);
    tableBodyElm.appendChild(trElm);



    totalOfOrder += parseInt(tdElmTotalPrice.textContent)
}



var AllBtnIncrease = document.querySelectorAll('.increase');

AllBtnIncrease.forEach(btn => {
    btn.addEventListener('click',function(){
        var priceElm = this.parentElement.parentElement.childNodes[4];
        var quantityElm = this.parentElement.parentElement.childNodes[5];
        var tdElmTotalPrice = this.parentElement.parentElement.childNodes[6];

        quantityElm.textContent = parseInt(quantityElm.textContent) + 1;

        var totalPrice = parseInt(tdElmTotalPrice.textContent);
        var quantity = parseInt(quantityElm.textContent);
        var price = parseInt(priceElm.textContent);

        tdElmOfTotalSum.textContent = parseInt(tdElmOfTotalSum.textContent) - totalPrice;
        totalPrice = (quantity * price);
        tdElmTotalPrice.textContent = totalPrice;
        tdElmOfTotalSum.textContent = parseInt(tdElmOfTotalSum.textContent) + totalPrice;

    });
});


var AllbtnDecrease = document.querySelectorAll('.descrease');
AllbtnDecrease.forEach(btn => {
    btn.addEventListener('click',function(){
        var priceElm = this.parentElement.parentElement.childNodes[4];
        var quantityElm = this.parentElement.parentElement.childNodes[5];
        var tdElmTotalPrice = this.parentElement.parentElement.childNodes[6];

        if(parseInt(quantityElm.textContent) > 1){
            tdElmOfTotalSum.textContent = parseInt(tdElmOfTotalSum.textContent) - (parseInt(quantityElm.textContent) * parseInt(priceElm.textContent)) ;

            quantityElm.textContent = parseInt(quantityElm.textContent) - 1;
            var totalPrice = parseInt(tdElmTotalPrice.textContent);
            var quantity = parseInt(quantityElm.textContent);
            var price = parseInt(priceElm.textContent);

            totalPrice = (quantity * price);
            tdElmTotalPrice.textContent = totalPrice;
            tdElmOfTotalSum.textContent = parseInt(tdElmOfTotalSum.textContent) + totalPrice;
        }
    });
})

var AllBtnRemove = document.querySelectorAll('.remove');
AllBtnRemove.forEach(btn =>{
    btn.addEventListener('click',function(){
        var trElm = this.parentElement.parentElement;
        var tdElmTotalPrice = trElm.childNodes[6];
        tdElmOfTotalSum.textContent =
        parseInt(tdElmOfTotalSum.textContent) - parseInt(tdElmTotalPrice.textContent);

        localStorage.removeItem('purchaseMeals');

        var nameMeal = trElm.childNodes[2].textContent;
        var newArr = [];
        for (const meal of purchaseMeal) {
            if(meal.name != nameMeal){
                newArr.push(meal)
            }
        }
        localStorage.setItem("purchaseMeals",JSON.stringify(newArr))
        purchaseMeal = JSON.parse(localStorage.getItem("purchaseMeals"));
        trElm.style.display = 'none';
    });
});



var trElmOfTotalOrder = document.createElement('tr');
var tdElmText = document.createElement('th');
tdElmText.textContent = "Total Of Order";
tdElmText.colSpan = '6';

var tdElmOfTotalSum = document.createElement('th');
tdElmOfTotalSum.textContent = totalOfOrder;

trElmOfTotalOrder.appendChild(tdElmText);
trElmOfTotalOrder.appendChild(tdElmOfTotalSum);
tableBodyElm.append(trElmOfTotalOrder);


var orderForm = document.forms[0];

orderForm.addEventListener('submit',function(e){
    e.preventDefault();
    var successMessageElm = document.createElement('p')
    successMessageElm.classList.add('alert','alert-success','mt-4');
    successMessageElm.textContent = "Thanks for Purchase From Our Website 😊";
    orderForm.appendChild(successMessageElm);

    setTimeout(() => {
        localStorage.removeItem("purchaseMeals")
        location.href = '../../index.html';
    }, 3000);
});



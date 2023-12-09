//localStorage.removeItem("purchaseMeals")
var getAllMeals = JSON.parse(localStorage.getItem("meals"));
var showOrder = document.getElementById('showOrder');

function changeStyleViewOrderWhenNotPurchase(){
    if(!myOrder){
        showOrder.style.opacity = '0.3';
        showOrder.style.backgroundColor = 'red';
        showOrder.style.cursor = 'default'
    }else{
        flagButtonViewOrder = 1;
    }
}
function changeStyleViewOrderWhenOrder(){
    showOrder.style.cursor = 'pointer';
    showOrder.style.backgroundColor = '#ffbe33';
    showOrder.style.opacity = 1;
    showOrder.style.color = 'white';
    flagButtonViewOrder = 1;
}
showOrder.addEventListener('click',function(e){
    e.preventDefault();
    if(flagButtonViewOrder){
        location.href = '../../order.html';
    }
});


if (getAllMeals) {
    var mealsParentElm = document.getElementsByClassName("row grid")[0];

    var typeMeal = {
        1: "breakfast",
        2: "lanuch",
        3: "dinner",
    };
    var currentDate = new Date();
    var currentHours = currentDate.getHours();

    for (const mealData of getAllMeals) {
    var mealElm = document.createElement("div");
    mealElm.classList.add(
    "col-sm-6",
    "col-lg-4",
    "all",
    typeMeal[mealData.type]
    );
    var boxElm = document.createElement("div");
    boxElm.classList.add("box");
    var boxImageElm = document.createElement("div");
    boxImageElm.classList.add("img-box");
    var imageElm = document.createElement("img");

    var randomImage = Math.ceil(8 * Math.random());
    imageElm.src = `./assets/images/f${randomImage}.png`;

    var boxDetailsElm = document.createElement("div");
    boxDetailsElm.classList.add("detail-box");
    var mealName = document.createElement("h5");
    mealName.textContent = mealData.name;
    var mealDescription = document.createElement("p");
    mealDescription.textContent = mealData.descrption;
    var mealOption = document.createElement("div");
    mealOption.classList.add("options");
    var mealPrice = document.createElement("h6");
    mealPrice.textContent = `${mealData.price}$`;
    var orderMeal = document.createElement("a");

    if (currentHours < 12 && mealData.type == 1) {
        orderMeal.innerHTML = `<i class="fa fa-cart-plus" aria-hidden="true"></i>`;
        orderMeal.style.cursor = "pointer";
    } else if (currentHours >= 12 && currentHours <= 15 && mealData.type == 2) {
        orderMeal.innerHTML = `<i class="fa fa-cart-plus" aria-hidden="true"></i>`;
        orderMeal.style.cursor = "pointer";
    } else if (currentHours > 15 && mealData.type == 3) {
        orderMeal.innerHTML = `<i class="fa fa-cart-plus" aria-hidden="true"></i>`;
        orderMeal.style.cursor = "pointer";
    } else {
        orderMeal.style.backgroundColor = "red";
    }

    orderMeal.addEventListener("click", function () {
    if (this.hasChildNodes()) {
        var getAllPurchaseMeals = JSON.parse(localStorage.getItem("purchaseMeals"));
        var found = false;
        var mealObj = {
            name: mealData.name,
            price: parseInt(mealData.price),
            type: mealData.type,
            descrption: mealData.descrption,
            image: imageElm.src,
            quantity: 1,
        };
        if (getAllPurchaseMeals) {
            for (const purchaseMeal of getAllPurchaseMeals) {
                if (purchaseMeal.name == mealObj.name) {
                    found = true;
                }
            }
        }

        var parElm = document.createElement("p");

        if (!found) {
            var newArr = [];
            if (getAllPurchaseMeals) {
                for (const meal of getAllPurchaseMeals) {
                    newArr.push(meal);
                }
            }
            newArr.push(mealObj);
            localStorage.setItem("purchaseMeals", JSON.stringify(newArr));

            parElm.classList.add("alert", "alert-success");
            parElm.textContent = `You Added successfully`;
        } else {
            parElm.classList.add("alert", "alert-danger");
            parElm.textContent = `You Added Before`;
        }
        changeStyleViewOrderWhenOrder();
        this.parentElement.parentElement.append(parElm);
        setTimeout(() => {
            this.parentElement.parentElement.removeChild(parElm);
        }, 2000);

    }
    });

    mealElm.appendChild(boxElm);
    boxElm.appendChild(boxImageElm);
    boxImageElm.appendChild(imageElm);
    boxElm.appendChild(boxDetailsElm);
    boxDetailsElm.append(mealName);
    boxDetailsElm.appendChild(mealDescription);
    boxDetailsElm.appendChild(mealOption);
    mealOption.appendChild(mealPrice);
    mealOption.appendChild(orderMeal);
    mealsParentElm.appendChild(mealElm);
    }

    
    var myOrder = JSON.parse(localStorage.getItem("purchaseMeals"));
    var flagButtonViewOrder = 0;
    window.addEventListener('load',function(){
        changeStyleViewOrderWhenNotPurchase();
    });

}

var greeting = document.getElementById('greeting');
greeting.innerHTML = `Welcome Admin:  ${sessionStorage.getItem('userName')}`;

var form = document.forms[0];

form.addEventListener('submit',function(e){
    e.preventDefault();
    var nameElem = document.getElementById('name');
    var priceElem = document.getElementById('price');
    var typeElem = document.getElementById('type');
    var descrptionElem = document.getElementById('descrption');

    var arrError = [];
    var allowType = ['1','2','3'];

    
    if(!allowType.includes(typeElem.value)){
        arrError.push("You Must choose Type of meals");
    }

    if(descrptionElem.value.length < 10){
        arrError.push("You must Enter More than 10 char");
    }

    if(nameElem.value.length < 2){
        arrError.push("You must Enter More than 10 char");
    }

    if(arrError.length == 0){

        var mealObj = {
            name:nameElem.value,
            price: parseInt(priceElem.value),
            type:typeElem.value,
            descrption:descrptionElem.value,
        }
        var getAllMeal = JSON.parse(localStorage.getItem("meals"));
        var newArr = []
        if(getAllMeal){
            for(const meal of getAllMeal){
                newArr.push(meal)
            }
        }
        newArr.push(mealObj)
        localStorage.setItem("meals",JSON.stringify(newArr))


        var parElm = document.createElement('p')
        parElm.classList.add('alert','alert-success');
        parElm.style.marginTop = '5px'
        parElm.textContent = "Meal Added Successfully...";
        form.lastElementChild.appendChild(parElm)
        setTimeout(()=>{
            form.lastElementChild.removeChild(parElm)
            form.reset();
        },2000)

    }else{
        var ulElm = document.createElement('ul');
        ulElm.classList.add('list-group');
        ulElm.style.marginTop = "10px";
        console.log(arrError)

        for(var err of arrError){
            var liElm = document.createElement('li')
            liElm.textContent = err;
            liElm.classList.add('list-group-item', 'list-group-item-danger')
            liElm.style.marginTop = "2px"
            ulElm.appendChild(liElm);
        }
        form.lastElementChild.appendChild(ulElm)
        setTimeout(function(){
            form.lastElementChild.removeChild(ulElm)
        },5000)
    }
});


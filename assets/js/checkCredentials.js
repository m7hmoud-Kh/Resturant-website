const form = document.forms[0];


form.addEventListener('submit',function(e){
    e.preventDefault();
    const userName = document.getElementById('userName').value;
    const password = document.getElementById('password').value;
    const xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function(){
        if(this.status == 200 && this.readyState==4){
            const response = JSON.parse(this.response)
            checkCredentials(response,userName,password);
        }
    }

    xhttp.open('get','../assets/data/credentials.json');
    xhttp.send();
});

function checkCredentials(response,userName,password){
    console.log(response.data,userName,password);
    if(response.data.userName == userName && response.data.password == password){
        sessionStorage.setItem('userName',userName);
        location.href = '../../admin/males.html';
    }else{
        var errerMessage = document.getElementById('errerMessage');
        errerMessage.style.display = 'block';
        errerMessage.addEventListener('click',function(){
            this.style.display = 'none';
        });
    }
}
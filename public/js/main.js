let button = document.querySelector(".orange-btn")
let input = document.querySelector(".usernaem")
var myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");





button.addEventListener("click", (e) => {
    e.preventDefault()
    fetch(`https://instagram-bulk-profile-scrapper.p.rapidapi.com/clients/api/ig/ig_profile?ig=${input.value}&response_type=json&corsEnabled=false`, {
        "method": "GET",
        "headers": {
            "ig": "fairytalefolkdorset",
            "x-rapidapi-host": "instagram-bulk-profile-scrapper.p.rapidapi.com",
            "x-rapidapi-key": "7cc114bb66mshed1b12c7c757e11p1ce9d5jsn862685503287"
        }
    }).then(response => response.json()).then(res => {
        if(res.length == 1){
            var raw = JSON.stringify({
                "data": res
            });
            var requestOptions = {
                method: 'POST',
                headers: myHeaders,
                body: raw,
                redirect: 'follow'
            };
      
           fetch("http://localhost:8000/aded", requestOptions)
            .then(response => response.text())
            .then(result => console.log(result))
            .catch(error => console.log('error', error)); 
            window.location = "/home"
        }else {
            alert("user topilmadi")
        }
    })
})

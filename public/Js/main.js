const submitBtn = document.getElementById("submitBtn")
const cityName = document.getElementById("cityName")
const city_name = document.getElementById("city_name")
const temp_real_val = document.getElementById("temp_real_val");
const temp_status = document.getElementById("temp_status");
const datahide = document.querySelector(".middle_layer");

const getInfo = async(event) =>{
    event.preventDefault();
    let cityVal = cityName.value;
    if(cityVal === ""){
        city_name.innerText = 'Plz Write City Name Before Search';
        datahide.classList.add("data_hide");
    }
    else{
        try {
            let url = `https://api.openweathermap.org/data/2.5/weather?q=${cityVal}&units=metric&appid=5241a408ca9c7b51ddcee650c2d1856e`;
            const res = await fetch(url);
            const data = await res.json();
            const arrData = [data];

            city_name.innerText = `${arrData[0].name},${arrData[0].sys.country}`;
            temp_real_val.innerText = `${arrData[0].main.temp}`;

            const tempMood = arrData[0].weather[0].main;

             //condition to check sunny or cloudy
             if (tempMood == "Clear") {
                temp_status.innerHTML =
                    "<i class='fas  fa-sun' style='color: #eccc68;'></i>";
                } else if (tempMood == "Clouds") {
                temp_status.innerHTML =
                    "<i class='fas  fa-cloud' style='color: #f1f2f6;'></i>";
                } else if (tempMood == "Rain") {
                temp_status.innerHTML =
                    "<i class='fas  fa-cloud-rain' style='color: #a4b0be;'></i>";
                } else {
                temp_status.innerHTML =
                    "<i class='fas  fa-sun' style='color: #eccc68;'></i>";
                }

                datahide.classList.remove('data_hide');
                cityVal = "";
            
        } catch(e) {
            console.log(e)
            cityVal = "";
            datahide.classList.add("data_hide");
            city_name.innerText = 'Plz Enter City Name Correctly';
        }
    }
}

submitBtn.addEventListener('click',getInfo);
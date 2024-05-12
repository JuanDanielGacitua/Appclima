
//Api para el clima
const API_KEY = 'dc3bb12c1988143e3234d09bf991c43c';

//log recibe la data del usuario relacionada a su posición "position"
//esta posicion se mostrará en consola
const fetchData = position => {
//creamos latitud y longitud en base a las coordenadas obtenidas en onload
    const {latitude, longitude} = position.coords;
    fetch(`http://api.openweathermap.org/data/2.5/weather?units=metric&lat=${latitude}&lon=${longitude}&appid=${API_KEY}`)
    //appi obtenida de página de clima https://openweathermap.org/current#one
        .then(response => response.json())
        .then(data => setWeatherData(data));
}

const setWeatherData = data => {
    console.log(data);
    //en esta variable constante iremos indicando los id que aparecen en archivo html
    const weatherData = {
        location: data.name,
        //description se obtiene de data que corresponde a los datos obtenidos de la api, de la array weather posicion 0 desde el main
        description: data.weather[0].main,
        //los siguientes valores se obtienen del main, en donde aparece la humedad y presión por ejemplo
        humidity: data.main.humidity,
        pressure: data.main.pressure,
        temperature: data.main.temp,
        date: getDate(),
    }
    //ahora procedemos a utilizar el Objeto Objeto
    //Lo que hace este objeto es recorrer la variable weatherData y devolvernos las key que corresponden a los valores del lado izquierdo
    //como por ejemplo: location, description, humidity...
    Object.keys(weatherData).forEach( key =>{
        //ahora hay que setear la info en html
        document.getElementById(key).textContent = weatherData[key];
    });

    cleanUp();
}

//ahora haremos la función de cleanUP
const cleanUp = () => {
    let container = document.getElementById('container');
    let loader = document.getElementById('loader');

    loader.style.display = 'none'; /*Al colocar none se dejará de mostrar*/
    container.style.display = 'flex'; /*El flex es para centrar el container */

    /*Esta funcion se utilizará para que al entrar a la página se muestre un simbolo de cargando
    Cuando se cargue la información se mostrará la temperatura*/
}

//Ahora vamos a obtener la fecha
//creamos una nueva funcion getDate que usaremos para obtener la fecha, se coloca getDate igual () que significa sin parámetros, luego creamos
//una variable "let date" y devolvemos con un return
const getDate = () => {
    let date = new Date();
    return `${date.getDate()}-${('0' + (date.getMonth() +1)).slice(-2)}-${date.getFullYear()}`;

    //Explicacion de date.getMonth
    //en primer lugar se le suma 1 porque indica el mes anterior, luego se le suma un cero "0" como string utilizando el slice en caso
    //de que el mes solo tenga un digito (más que nada es por un tema estético)
}


const onLoad = () => {
//navigator se usa para buscar la ubicacion del usuario
    navigator.geolocation.getCurrentPosition(fetchData);
}
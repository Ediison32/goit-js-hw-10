
/* import slimSelect from 'slim-select' */
import axios from "axios";
import Notiflix from 'notiflix';
axios.defaults.headers.common["x-api-key"] = "live_xNaVyKjrytKZJbNeye777XFMq3QXuX2CIuxwzmyMw878058YyKRDGUbnRMnZ5KWn";
/* new slimSelect({
    
    select : '.breed-select'
})  */
const select = document.querySelector('.breed-select');
const catInfo = document.querySelector('.cat-info');
const noselect = document.querySelector('.noselect');
const loader = document.querySelector('.loader');



// funcion de peticion de datos usando axios.get 
function petCat(){
    return axios.get('https://api.thecatapi.com/v1/breeds?api-key=live_xNaVyKjrytKZJbNeye777XFMq3QXuX2CIuxwzmyMw878058YyKRDGUbnRMnZ5KWn')
    // promise de la peticion
    .then(response =>{
        select.innerHTML =  `<option value= ${0}>   </option>`
        response.data.map(x =>{       
            select.innerHTML += `<option value=${x.reference_image_id}>${x.name}</option>`
          /*   console.log(x.reference_image_id); */
        });

        return data;
        
    }) 
    // catch el posible error que pueda generar
    .catch(error =>{
     console.log(`Error al obtener los gatos ${error}`);
        
    })  
}


const apiInfo = petCat();

/* Notiflix.Notify.failure('Qui timide rogat docet negare'); */
select.addEventListener('change', event =>{
    console.log(event.target.value);
    imgfecht(event.target.value)
    .then(response =>{
        noselect.style.display = 'none'
        loader.style.display = 'none'
        console.log(response.data.breeds[0].name);
        catInfo.innerHTML =`

            <img class='infoImg' src=${response.data.url} alt="">
            <div     class="information">
                <h2  class="">${response.data.breeds[0].name}</h2>
                <p   class="">${response.data.breeds[0].description}</p>
                <h3  class="">Temperament</h3>
                <p   class="">${response.data.breeds[0].temperament}</p>
            </div>

        `
    })
    .catch(error =>{
        
        Notiflix.Notify.failure(`Error al obtener los gatos ${error}`)
    })
});


function imgfecht (ip){
    loader.style.display = 'block'
    catInfo.innerHTML = ' '
    return axios.get(`https://api.thecatapi.com/v1/images/${ip}`)
}
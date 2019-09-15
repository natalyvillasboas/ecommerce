let datos = []
let orden = 'asc'

function sortProducts(criteria, array) {
    const {orden, desde, hasta} = criteria // const orden = criteria.orden

    if(orden == 'asc'){
        array.sort((a, b) => (a.cost > b.cost) ? 1 : -1)
    }else{
        array.sort((a, b) => (b.cost > a.cost) ? 1 : -1)
    }

    if(desde >= 0 && hasta > 0){
        let prods = []
        array.forEach(prod => {
            if(prod.cost >= desde && prod.cost <= hasta){
                prods.push(prod)
            }
        })
        array = prods
    }

    return array
}



function showProductsList(array) {
    const bodyListaHTML = document.getElementById('listaProductos')
    bodyListaHTML.innerHTML= ''
    console.log(array)
    array.map(prod => {
        let tr = document.createElement('tr')
        let td1 = document.createElement('td')
        let td2 = document.createElement('td')
        let td3 = document.createElement('td')

        let nombre = document.createTextNode(prod.name)
        let precio = document.createTextNode(`${prod.currency} ${prod.cost}`)
        let descripcion = document.createTextNode(prod.description)

        td1.appendChild(nombre)
        td2.appendChild(precio)
        td3.appendChild(descripcion)

        tr.appendChild(td1)
        tr.appendChild(td2)
        tr.appendChild(td3)

        bodyListaHTML.appendChild(tr)
    })
}

function btnAplicar(){
    const desde = document.getElementById('precioDesde').value
    const hasta = document.getElementById('precioHasta').value

    const criterio = {
        orden, // orden: orden
        desde,
        hasta
    }
    const array = sortProducts(criterio, datos)
    showProductsList(array)
}

function ordenar(order = 'asc'){
    orden = order
    if(order == 'asc'){
        document.getElementById('dropdownMenuButton').textContent = 'Ascendente'
    }else{
        document.getElementById('dropdownMenuButton').textContent  = 'Descendente'
    }
}

//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function (e) {
    const data = getJSONData(PRODUCTS_URL)

    data
        .then(d => { 
            datos = d.data 
            showProductsList(datos) 
        })
        .catch(err => console.error(err))
});
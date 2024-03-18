let form = document.getElementById("form1")
form.addEventListener('submit', (e)=>{
    e.preventDefault()
    console.log(document.getElementById("adress").value)
    weatherFunction()
    form.reset()
})
const errorF = document.getElementById("error")
const locationF = document.getElementById("location")
const forecastF = document.getElementById("forecast")

let weatherFunction = async()=>{
    try{
        const adress=document.getElementById("adress").value
        const res=await fetch('http://localhost:3000/weather?adress='+ adress)
        const data = await res.json()
        console.log (data)
        if (data.error){
            errorF.innerText=data.error
            locationF.innerText=""
            forecastF.innerText=""
        }
        else{
            locationF.innerText="Country Name is:"+ data.location
            forecastF.innerText="The Capital is: "+ data.forecast
            errorF.innerText=""
        }
    }
    catch(e){
        console.log(e)
    }
}

console.log('client side java script is loaded')

 
const weatherform = document.querySelector('form')
const search = document.querySelector('input')
const messagebox1 = document.querySelector('#message1')
const messagebox2 = document.querySelector('#message2')
const messagebox3 = document.querySelector('#message3')

 
weatherform.addEventListener('submit',(e)=>{
    e.preventDefault()
  const location = search.value  
  messagebox1.textContent = 'loading..'
  
  fetch('http://localhost:300/Weather?address='+location).then((response) => {
    response.json().then((data)=>
    {
        if(data.error)
        {
            messagebox1.textContent = data.error
        }
        else
        {
            messagebox1.textContent = 'Country is :' + data.country
            messagebox2.textContent = 'Region is :' + data.Region
            messagebox3.textContent = 'Temperature is :'+ data.temparature + ' °C'

        }
    })
})
})
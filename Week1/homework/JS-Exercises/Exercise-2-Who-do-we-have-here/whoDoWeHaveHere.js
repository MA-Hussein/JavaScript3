// Exercise 2: Who do we have here?

// With XMLHTTPSRequest

'use strict';
(function(){
 let xhr = new XMLHttpRequest();
 xhr.open('GET', 'https://www.randomuser.me/api');
 xhr.addEventListener('load', function(){
     if(xhr.status >=200 && xhr.status <= 299){
         console.log(JSON.parse(this.response));
     }else{
         console.log(`Error: ${xhr.status}`);
     }
 })
 xhr.onerror = function(){
     console.log(`Error!: ${xhr.status}`)
 }
 xhr.send();
})()


// With Axios

axios
.get('https://www.randomuser.me/api')
.then(function(response){
    console.log(response.data)
})
.catch(function(error){
    console.log(error)
})
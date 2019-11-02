// Exercise 1: Place the kitten

// With XMLHTTPSRequest

(function(){
    let xhr = new XMLHttpRequest();
    xhr.open('GET', 'https://www.placekitten.com/api');
    xhr.addEventListener('load', function(){
        if(xhr.status >=200 && xhr.status <= 299){
            console.log(this.response);

        }else{
            console.log(`Error : ${xhr.status}`)
        }
    })
    xhr.onerror=function(){
        console.log(`Error : ${xhr.status}`)
    }
    xhr.send();

})()

// With Axios

axios
.get('https://www.placekitten.com/api')
.then(function(response){
    console.log(response.data)
})
.catch(function(error){
    console.log(error)
})
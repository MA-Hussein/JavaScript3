//Exercise 3: Photo Gallery.

//With XMLHTTPSRequest

'use strict';

(function(){
  let xhr = new XMLHttpRequest();
  xhr.open('GET', 'https://picsum.photos/400');
  function loadImage(){  
      if(xhr.status >= 200 && xhr.status <= 299){
          const newImage = document.createElement('img');
          document.body.appendChild(newImage);
          newImage.setAttribute('src', xhr.responseURL);
      }else{
          console.log(`Error : ${xhr.status}`);
      }

  };
  xhr.addEventListener('load', loadImage);
  xhr.onerror = function(){
      console.log('Error!')
  };
  xhr.send(); 

})()

//With Axios

axios
.get('https://picsum.photos/400')
.then(function(response){
        const newImaeg = document.createElement('img');
        document.body.appendChild(newIamge);
        newImage.setAttribute('src', response.request.responseURL);
})
.catch(function(error){
    console.log(error)
})
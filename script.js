let audioBar = document.querySelector('#audio_bar');
let searchSection = document.querySelector('#search');
let searchText = document.querySelector('#searchText');
let images = document.querySelector('.thumbnail');
let submitButton = document.querySelector('#submitButton');
let searchResults = document.querySelector('#searchResults');
let paused = document.querySelector('#paused');



//There are several things I would like to alter:
//The bucket 'audioFile' is dumping the data upon every click, and I would like to change that
// for styling, I would like to add to the conditional statement that the text/background colors change upon play
// on that, perhaps adding in an image overlay to the image itself
// In general, the event bubbling is operating correctly, minus the data dumping.




submitButton.addEventListener('click', function(evt) {
  evt.preventDefault();
  let search = searchText.value;
  let html = '';
  fetch(`https://itunes.apple.com/search?term=${search}&limit=16`)
  .then(function(response) {
    return response.json();
    console.log(response.json());
  })
  .then(function(data) {
    let results = data.results;
    console.log(results)
    results.forEach(function(result) {
      let resultData =
       `<div id ="result">
          <a href="${result.artistViewUrl}" target="_blank"><p class="musicDes">${result.artistName}:
          </p></a>
          <a href="${result.trackViewUrl}" target="_blank"><p class="musicDes">${result.trackName}
          </p></a>
          <div data="${result.previewUrl}" class="thumbnail" style="background-image:url('${result.artworkUrl100}')"></div>
        </div>`
      html += resultData;
    });
    searchResults.innerHTML = html;
    images = document.querySelectorAll(".thumbnail");
  });
  searchSection.value = '';
});

let audioFile = '';

searchResults.addEventListener('click', function(evt){
console.log(evt.target.getAttribute('data'));
//most specific: checks for pause being true/false on click
  if(audioBar.paused === false) {
    audioBar.pause();
    console.log('1');
//next specific: if paused OR audioFile has data, then store previewUrl data in audioFile
  }else if (audioBar.paused || audioFile !== null) {
    audioFile = evt.target.getAttribute('data');
    audioBar.setAttribute('src', audioFile);
    console.log('2', audioFile);
//least specific: if the event target has 'data', store data in audioFile and set the audioBar source to audioFile
  }else if(evt.target.hasAttribute('data')){
    audioFile = evt.target.getAttribute('data');
    audioBar.setAttribute('src', audioFile);
    console.log('3');
  };
});

//note: the autoplay attribute of audioBar is set to true, so upon the click event, it will autoplay

//to see an event's attributes, console.log(evt);

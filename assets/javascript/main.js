let topics = ['rooster','got','luffy','cat','beer','kevin','jacky','friends','himym','donald'];

let dataStorage = '';

function displayButtons(){
    $('#buttons').empty();
    for (let i = 0; i < topics.length; i++){
        let button = $('<button class="button"></button');
        button.text(topics[i]);
        $('#buttons').append(button);
    }
}

function displayGifs(data){
    dataStorage = data;
    $('#gifs').empty();
    for (let i = 0; i < data.data.length; i++){
        console.log(data);
        let imgDiv = $('<div></div>');
        let imgBlock = $('<img src="' + data.data[i].images.downsized_still.url + '"/>');
        let imgRating = $('<p>' + data.data[i].rating + '</p>');
        imgBlock.addClass('stillGif');
        imgBlock.attr('id','img-'+i);
        imgDiv.append(imgBlock).append(imgRating);
        $('#gifs').append(imgDiv);
    }
    
}

$(document).ready(function(){

    displayButtons();

    $('.button').click(function(event){
        query = event.target.innerHTML;
        var xhr = $.get("http://api.giphy.com/v1/gifs/search?q=" + query + "&api_key=LE368ulPYMOd9WAAKgEfNA7SZJHnsYaO&limit=10");
        xhr.done(displayGifs);
    });

    $(document).on('click','.stillGif',function(){
        let index = event.target.getAttribute('id').slice(4,5);
        this.setAttribute('src', dataStorage.data[index].images.downsized.url)
        this.classList.remove('stillGif');
        this.classList.add('animGif');
    });

    $(document).on('click','.animGif',function(){
        let index = event.target.getAttribute('id').slice(4,5);
        this.setAttribute('src', dataStorage.data[index].images.downsized_still.url)
        this.classList.remove('animGif');
        this.classList.add('stillGif');
    });

    $('#xtraTopicSubmit').click(function(){
        let topic = $('xtraTopic').value;
        console.log(topic);
        topics.push(topic);
        displayButtons();
    })
    
});
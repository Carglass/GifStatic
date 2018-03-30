let topics = ['rooster','got','luffy','cat','beer','kevin','jacky','friends','himym','donald'];

let dataStorage = '';

function displayButtons(){
    $('#buttons').empty();
    for (let i = 0; i < topics.length; i++){
        let button = $('<button class="button btn btn-secondary col-2"></button');
        button.text(topics[i]);
        $('#buttons').append(button);
    }
}

function displayGifs(data){
    dataStorage = data;
    $('#gifs').empty();
    for (let i = 0; i < data.data.length; i++){
        console.log(data);
        let imgDiv = $('<div class="col-6"></div>');
        let imgBlock = $('<img src="' + data.data[i].images.downsized_still.url + '"/>');
        let imgRating = $('<p>Rating: ' + data.data[i].rating + '</p>');
        imgBlock.addClass('stillGif');
        imgBlock.attr('id','img-'+i);
        imgDiv.append(imgBlock).append(imgRating);
        $('#gifs').append(imgDiv);
    }
    
}

$(document).ready(function(){

    displayButtons();

    $(document).on('click','.button',function(event){
        query = event.target.innerHTML;
        var xhr = $.getJSON("https://api.giphy.com/v1/gifs/search?q=" + query + "&api_key=LE368ulPYMOd9WAAKgEfNA7SZJHnsYaO&limit=10");
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

    $('#xtraTopicSubmit').click(function(event){
        event.preventDefault();
        let topic = $('#xtraTopic').val();
        if (topic !== ''){
            topics.push(topic);
            $('#xtraTopic').val('');
            displayButtons();
        }
    });

    $('#xtraTopic').keypress(function(e) {
        if(e.which == 13) {
            e.preventDefault();
            let topic = $('#xtraTopic').val();
            topics.push(topic);
            $('#xtraTopic').val('');
            displayButtons();
        }
    });
    
});
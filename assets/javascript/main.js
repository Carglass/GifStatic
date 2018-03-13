let topics = ['rooster','got','luffy','cat','beer','kevin','jacky','friends','himym','donald'];

let dataStorage = '';

for (let i = 0; i < topics.length; i++){
    let button = $('<button class="button"></button');
    button.text(topics[i]);
    $('#buttons').append(button);
}

function displayGifs(data){
    dataStorage = data;
    $('#gifs').empty();
    for (let i = 0; i < data.data.length; i++){
        let imgBlock = $('<img src="' + data.data[i].images.downsized_still.url + '"/>')
        imgBlock.addClass('stillGif');
        imgBlock.attr('id','img-'+i);
        $('#gifs').append(imgBlock);
    }
    $('.stillGif').click(function(){
        console.log(this);
        let index = event.target.getAttribute('id').slice(4,5);
        this.setAttribute('src', dataStorage.data[index].images.downsized.url)
        this.removeClass('stillGif').addClass('animGif');
    });
}

$(document).ready(function(){

    $('.button').click(function(event){
        query = event.target.innerHTML;
        var xhr = $.get("http://api.giphy.com/v1/gifs/search?q=" + query + "&api_key=LE368ulPYMOd9WAAKgEfNA7SZJHnsYaO&limit=10");
        xhr.done(displayGifs);
    });

    // $('.stillGif').click(function(){
    //     let index = this.attr('id').slice(4,5);
    //     console.log(index);
    //     this.attr('src', dataStorage.data[i].images.downsized.url)
    // });
    
});
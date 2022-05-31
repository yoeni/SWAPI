$(document).ready(function(){
    //get persons
    for(i = 1; i <= 9; i++) {
        var persons=$.getJSON("/api/persons?page="+i);
        persons.then(personsAdd);
    }//get planets
    for(i = 1; i <= 6; i++) {
        var planets=$.getJSON("/api/planets?page="+i);
        planets.then(planetsAdd);
    }//get starships
    for(i = 1; i <= 4; i++) {
        var starships=$.getJSON("/api/starships?page="+i);
        starships.then(starshipsAdd);
    }

    $('#inputText').keypress((e)=>{
        if(e.which==13){
            findPerson();
        }
    })
});

function personsAdd(persons) {
    persons.forEach(function(person){
        personAdd(person);
    });
}
function planetsAdd(planets) {
    planets.forEach(function(planet){
        planetAdd(planet);
    });
}
function starshipsAdd(starships) {
    starships.forEach(function(starship){
        starshipAdd(starship);
    });
}


function personAdd(person){
    var newPerson=$('<li>'+person.name+'</li>');

    $('.persons').append(newPerson);
}
function planetAdd(planet){
    var newPlanet=$('<li>'+planet.name+'</li>');

    $('.planets').append(newPlanet);
}
function starshipAdd(starship){
    var newStarship=$('<li>'+starship.name+'</li>');
    $('.starships').append(newStarship);
}
   
function findPerson(){
var myPerson=$('#inputText').val();
   $.post('/api/persons/',{name:myPerson},
   function(data){
        $('.myPerson').html(
            "<table>"+
                "<tr>"+
                    "<th><b>Name:</b></th><th>"+data.name+"</th>"+
                "</tr>"+
                "<tr>"+
                    "<th><b>Gender:</b></th><th>"+data.gender+"</th>"+
                "</tr>"+
                "<tr>"+
                    "<th><b>Height:</b></th><th>"+data.height+"</th>"+
                "</tr>"+
                "<tr>"+
                    "<th><b>Films:</b></th><th><ol class='films'></ol></th>"+
                "</tr>"+
            "</table>"
        );
        getPersonFilms(data.films);
   })
   .then(()=>{
    $('#inputText').val('');
   });
}

function getPersonFilms(data){
    data.forEach(function(film){ 
        var film=$.getJSON("/api/film?page="+film);
        film.then(res=>{
            console.log(res.title);
            var newPersonFilm=$("<li style='width:fit-content;'>"+res.title+"</li>");
            $('.films').append(newPersonFilm);
        });
    });
}
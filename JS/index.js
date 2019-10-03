// JQuery Function to Make sure no code is run until the HTML is fully loaded.
$(function () {
    // When the page loads, the Pokemon info card should be hidden by default.
    $("#pokemonInfoCard").hide();

    // Set up the event handler for when the search button is clicked 
    $("#search").click(function() {
        $("#pokemonInfoList").html("");
        let pokemonNameOrId = $("#pokemonInput").val().toLowerCase();
        getPokemonInfo(pokemonNameOrId);
    });

    function determineBackgroundColor(type) {
        switch (type) {
            case "bug":
                return "#A6B51D";
            case "dark":
                return "#4D392C";
            case "dragon":
                return "#735CDB";
            case "electric":
                return "#FCBB17";
            case "fairy":
                return "#EFA8EF";
            case "fighting":
                return "#7E321B";
            case "fire":
                return "#EA3E0D";
            case "flying":
                return "#9DAEF7";
            case "ghost":
                return "#5F5FB2";
            case "grass":
                return "#72C235";
            case "ground":
                return "#D1B055";
            case "ice":
                return "#6DD3F5";
            case "normal":
                return "#B8B1A6";
            case "poison":
                return "#924593";
            case "psychic":
                return "#EA457E";
            case "rock":
                return "#A68E44";
            case "steel":
                return "#B3B3C2";
            case "water":
                return "#2079D2";
            default:
                return "#000";
        }
    }

    // Function to retreive information about a pokemon from the API
    function getPokemonInfo(nameOrId) {
        // We need a way to asynchronously handle making the API call and do stuff when we get a response, since we don't know how long it will take to get a response.

        // If we tried to write a synchronous code (code that runs one line after another) this could cause problems if we try to pull information from the API response before we get it back.

        $.ajax({
            // The URL we're making the request to.
            url: "https://pokeapi.co/api/v2/pokemon/" + nameOrId,
            // The type of our request.
            type: "GET",
            // The function that we pass in here will be called if our request is successful.
            success: function(result) {
                console.log(result);
                // On success of retrievial, get information about pokemon.
                let name = result.name;
                let spriteLink = result.sprites.front_default;
                let id = result.id;
                let weight = result.weight
                let types = result.types;
                
                $("#pokemonName").html(name.toUpperCase());
                $("#pokemonImage").attr("src", spriteLink);
                $("#pokemonInfoList").append('<li class="list-group-item" >ID: ' + id + '</li>');
                $("#pokemonInfoList").append('<li class="list-group-item" >Weight: ' + weight + ' lbs.</li>');

                for (type of types) {
                    let li = document.createElement("li");
                    li.classList.add("list-group-item");
                    li.classList.add("text-caplitalize");
                    li.innerHTML = type.type.name;
                    li.style.backgroundColor = determineBackgroundColor(type.type.name);

                    $("#pokemonInfoList").append(li);
                }

                // On success of retrieving API, show pokemon info card.
                $("#pokemonInfoCard").show();
            },
            // The function we pass in here will be called if our request fails.
            error: function(error) {
                console.log(error);
            }
        })
    }
});

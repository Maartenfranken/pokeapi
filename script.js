function searchFunction() {
  var search = "";
  if(isNaN(document.getElementById("txtSearch").value)){
    search = document.getElementById("txtSearch").value.toLowerCase();
  }
  else{
    search = document.getElementById("txtSearch").value;
  }
  $.getJSON(
    'http://pokeapi.co/api/v2/pokemon/' + search + '/',
    function(data) {
      $("#pokeName").text(data.name.charAt(0).toUpperCase() + data.name.slice(1));
      var pokeType = '';
      $.each(data.types, function(slot, types){
        pokeType += "<div class='pokeType pokeType--" + types.type.name + "'><p>" + types.type.name + "</p></div>";
      });
      $("#pokeType").html(pokeType);
      var weight = data.weight.toString();
      var cutWeight = weight.slice(0, -1);
      var lastCharInWeight = weight.slice(-1);
      var height = data.height.toString();
      var cutHeight = height.slice(0, -1);
      var lastCharInHeight = height.slice(-1);
      if(cutWeight === "") {
        cutWeight = "0";
      }
      if(cutHeight === "") {
        cutHeight = "0";
      }
      $("#pokeWeight").text("Weight: " + cutWeight + "." + lastCharInWeight + " kg");
      $("#pokeHeight").text("Height: " +  cutHeight + "." + lastCharInHeight + " m");
      $("#pokeImg").html("<img src='" + data.sprites.front_default + "'/>");
    }
  )
  .fail(function(){
    $("#pokeImg").html("");
    $("#pokeName").text("This pokemon is not in our database.");
    $("#pokeType").text("");
    $("#pokeWeight").text("");
    $("#pokeHeight").text("");
  });
};

function myFunction() {
    var x = document.getElementById("myTopnav");
    if (x.className === "topnav") {
        x.className += " responsive";
    } else {
        x.className = "topnav";
    }
}

$('document').ready(function(){
  $("#txtSearch").keyup(function(event){
    if(event.which == 13){
      $("#bttnSearch").trigger("onclick");
    }
  });
});

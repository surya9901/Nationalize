//background color for body

document.body.style.backgroundColor = "lightgrey";

// creating a div element

var div = document.createElement("div");
document.body.append(div);

// creating a h1 element

var h1 = document.createElement("h1");
h1.innerText = "NATIONALIZE";
h1.setAttribute("class", "display-5 mt-2");

//styling & appending h1 element

h1.style.wordSpacing = "10px";
h1.style.fontFamily = "'Goblin One',cursive";
h1.style.color = "white";
h1.style.textShadow = "3px 2px 8px lightblue";
h1.style.textAlign = "center";
h1.style.backgroundColor = "black";
div.append(h1);

//creating heading

var h2 = document.createElement("h2");
h2.innerHTML = "HOLA AMIGO!";
h2.setAttribute("class", "display-4 mt-2");
div.append(h2);

// styling for head

h2.style.textAlign = "center";
h2.style.padding = "10px";

//creating a line

var line = document.createElement("hr");
line.style.color = "grey";
line.style.height = "3px";
h2.append(line);

// creating para

var text = document.createElement("p");
text.innerHTML =
  "This page is used to find your Nationality & its probability by giving your Name as input<br><br>Type your Name in the below box";
div.append(text);

//styling

text.setAttribute("class", "h4");
text.style.fontFamily = "'Zen Loop', cursive";
text.style.fontSize = "30px";
text.style.fontWeight = "bold";
text.style.textAlign = "center";

//creating input div

var input_div = document.createElement("div");
div.append(input_div);

//styling the input div

input_div.style.textAlign = "center";

//creating input box
var input = document.createElement("input");
input.setAttribute("id", "myInput");
input.setAttribute("placeholder", "Michael");
input.setAttribute("class", "input form-control-lg mt-3 mb-3");
input_div.append(input);

//styling input box
input.style.border = "1px solid white";
input.style.borderRadius = "10px 10px 10px 10px";

//creating a button

var search = document.createElement("button");
search.innerText = "Search";
search.setAttribute("onclick", "handleClick()");
search.setAttribute("class", "btn btn-secondary");
search.setAttribute("type", "button");
input_div.append(search);

//styling the button

search.style.marginLeft = "15px";

//creating a button

var reset = document.createElement("button");
reset.innerText = "Reset";
reset.setAttribute("onclick", "reload()");
reset.setAttribute("class", "btn btn-secondary");
reset.setAttribute("type", "button");
input_div.append(reset);

//styling the button

reset.style.marginLeft = "15px";

//creating a div to display the data

var div2 = document.createElement("div");
div2.setAttribute("class", "conatiner-lg");
div2.setAttribute("id", "d2");
div2.style.margin = "-4px";
div2.style.textAlign = "center";
div2.style.fontFamily = "'Comic Neue', cursive";
div2.style.fontSize = "20px";
document.body.append(div2);

//activates once submit button clicked

function handleClick() {
  document.getElementById("d2").innerHTML = "";

  var value = document.getElementById("myInput").value;
  if (value == "" || null) {
    alert("Pls Enter a valid data");
    return false;
  } else {
    viewinfo();
  }
}

async function viewinfo() {
  try {
    var value = document.getElementById("myInput").value;

    var data = await fetch("https://api.nationalize.io/?name=" + value);
    var res = await data.json();

    if (res.country == "" || null) {
      alert("Sorry your name does not exist in our database!");
      reload()
      return false;
    } else {
      var name = document.createElement("div");
      name.innerText = "Name : " + value;
      div2.append(name);

      var len = res.country.length;

      if (len >= 3) {
        len = res.country.length - 1;
        for (let i = 0; i < len; i++) {
          const element = res.country[i];
          country_name(element.probability, element.country_id);
        }
      } else {
        len = res.country.length;
        for (let i = 0; i < len; i++) {
          const element = res.country[i];
          country_name(element.probability, element.country_id);
        }
      }
    }
  } catch (error) {
    console.error();
  }
}

async function country_name(a, b) {
  var data = await fetch("https://restcountries.eu/rest/v2/alpha/" + b);
  var res = await data.json();
  var name = res.name;

  if (a >= 1) {
    var nation1 = document.createElement("div");
    nation1.innerHTML =
      "Country Name : " + name + " <br> Probability is : " + a;
    document.getElementById("d2").append(nation1);
  } else {
    var nation1 = document.createElement("div");
    nation1.innerHTML =
      "Country Name : " + name + " <br> Probability is : " + a.toFixed(2);
    document.getElementById("d2").append(nation1);
  }
}

// actiavtes once the reset button clicked

function reload() {
  location.reload();
}

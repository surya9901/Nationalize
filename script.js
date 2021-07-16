
    //background color for body

    document.body.style.backgroundColor = "lightgray"

    // creating a div element

    var div = document.createElement("div")
    document.body.append(div)

    // creating a h1 element

    var h1 = document.createElement("h1");
    h1.innerText = "NATIONALIZE";
    h1.setAttribute("class", "display-5 mt-2")

    //styling & appending h1 element

    h1.style.wordSpacing = "10px"
    h1.style.fontFamily = "'Goblin One',cursive"
    h1.style.color = "white"
    h1.style.textShadow = "3px 2px 8px lightblue"
    h1.style.textAlign = "center"
    h1.style.backgroundColor = "black"
    div.append(h1)

    //creating heading

    var h2 = document.createElement("h2");
    h2.innerHTML = "HOLA AMIGO!";
    h2.setAttribute("class", "display-4 mt-2")
    div.append(h2)

    // styling for head

    h2.style.textAlign = "center"
    h2.style.padding = "10px";


    //creating a line 

    var line = document.createElement("hr")
    line.style.color = "grey"
    line.style.height = "3px"
    h2.append(line)

    // creating para

    var text = document.createElement("p")
    text.innerHTML = "This page is used to find your Nationality & its probability by giving your Name as input<br><br>Type your Name in the below box"
    div.append(text)

    //styling

    text.setAttribute("class", "h4")
    text.style.fontFamily = "'Zen Loop', cursive"
    text.style.fontSize = "30px"
    text.style.fontWeight = "bold"
    text.style.textAlign = "center"

    //creating input div

    var input_div = document.createElement("div")
    div.append(input_div)

    //styling the input div

    input_div.style.textAlign = "center";

    //creating input box
    var input = document.createElement("input")
    input.setAttribute("id", "myInput")
    input.setAttribute("placeholder", "Type you name here")
    input.setAttribute("class", "input form-control-lg mt-3 mb-3")
    input_div.append(input)

    //styling input box
    input.style.border = "1px solid white"
    input.style.borderRadius = "10px 10px 10px 10px"

    //creating a button

    var search = document.createElement("button")
    search.innerText = "Search"
    search.setAttribute("onclick", "handleClick()")
    search.setAttribute("class", "btn btn-secondary")
    search.setAttribute("type", "button")
    input_div.append(search)

    //styling the button

    search.style.marginLeft = "15px"

    //creating a button

    var reset = document.createElement("button")
    reset.innerText = "Reset"
    reset.setAttribute("onclick", "reload()")
    reset.setAttribute("class", "btn btn-secondary")
    reset.setAttribute("type", "button")
    input_div.append(reset)

    //styling the button

    reset.style.marginLeft = "15px"

    //creating a div to display the data 

    var div2 = document.createElement("div")
    div2.setAttribute("calss", "conatiner-lg")
    div2.style.margin = "-4px"
    div2.style.textAlign = "center"
    div2.style.fontFamily = "'Comic Neue', cursive"
    div2.style.fontSize = "20px"
    document.body.append(div2)

    //activates once submit button clicked

    function handleClick(value) {
        var value = document.getElementById("myInput").value
        if (value == "" || null) {
            alert("Pls Enter a valid data")
            return false;
        }
        else {
            viewinfo()
        }
    }

    //activates once the viewinfo function is called

    async function viewinfo() {

        try {
            var value = document.getElementById("myInput").value

            var name = document.createElement("div")
            name.innerText = "Name : " + value;
            div2.append(name)

            var data = await fetch("https://api.nationalize.io/?name=" + value)
            var res = await data.json()
            console.log(res);

            //res = {name : "surya", country[{country_id: "NP", probability: 0.43252053674130175},
            //{country_id: "ID", probability: 0.3104362081766422},
            //{country_id: "IN", probability: 0.23641770224675593}]}


            for (let i = 0; i < 2; i++) {

                const element = res.country[i]

                var nation1 = document.createElement("div")
                nation1.innerText = ("Country Nationality : " + element.country_id);
                div2.append(nation1)


                var probab1 = document.createElement("div")
                probab1.innerText = ("Country Probability : " + element.probability);
                div2.append(probab1)
            }
        } catch (error) {
            consol.error();
        }
    }

    //actiavtes once the reset button clicked

    function reload() {
        location.reload()
    }

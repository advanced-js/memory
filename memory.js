// YOUR CODE GOES HERE
var memArray = [];
var objArray = [];
var countCorrect = 0;
var countTotal = 0;

function toggle(obj) 
{
    var el = document.getElementById(obj);
    objArray.push(document.getElementById(obj));
    el.style.display = "none";
    el.nextElementSibling.style.display = "block";

    if (memArray.length == 0) 
    {//When 1 tile is displayed
        memArray.push(el.nextElementSibling.innerHTML); //put value into an array
    }
    else if (memArray.length == 1) 
    {//When 2nd tile is displayed
        memArray.push(el.nextElementSibling.innerHTML); //put value into an array
        if (memArray[0] != memArray[1]) {
            setTimeout(function () { timedView(el) }, 1000);
            objArray[0].nextElementSibling.style.display = "none";
            objArray[0].style.display = "block";

        }
        else 
        {
            countCorrect += 2;
        }
        //Empty the Memory Array
        memArray = [];
        objArray = [];
    }
    countTotal++;

    if (countCorrect == 16) 
    {
        alert("Percentage correct is: " + ((countCorrect/countTotal)*100));
    }

}

function timedView(el)
{
    el.nextElementSibling.style.display = "none";
    el.style.display = "block";
}

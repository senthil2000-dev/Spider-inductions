function addItem(id, op, available) {
    const spanEl=document.querySelector(".numAdded");
    var xhttp = new XMLHttpRequest();
    id=String(id);
    xhttp.open("POST", "ajax/getOnline.php", true);
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.send();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            console.log(this.responseText);
            let items=JSON.parse(this.responseText);
                if(op==1) {
                    if(count(id, items)<available) {
                        items.push(id);
                    }
                } 
                else {
                    const index = items.indexOf(id);
                    console.log(index);
                    if (index > -1) {
                        items.splice(index, 1);
                    }
                }
                sendTo(items);
            if(count(id, items)>0)
                spanEl.innerHTML=count(id, items)+" ADDED";
            else
                spanEl.innerHTML="ADD TO CART";
        }
    }
}


function sendTo(items) {
    let str=items.join();
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", "ajax/sendOnline.php", true);
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.send("str="+str);
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            console.log(str);
        }
    }
}

function count(val, array) {
    var count = 0;
    for(var i = 0; i < array.length; ++i){
        if(array[i] == val)
            count++;
    }
    return count;
}
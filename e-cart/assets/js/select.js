trs=Array.from(document.querySelectorAll("tr"));
trs.shift();
trs.forEach(element => {
    element.style.cursor="pointer";
    element.addEventListener("click", function () {
        window.location.href="item.php?id="+element.id;
    });
});
const amount=(document.querySelector(".totalAmount"));
var xhttp = new XMLHttpRequest();
xhttp.open("POST", "ajax/getTotal.php", true);
xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
xhttp.send();
xhttp.onreadystatechange = function() {
if (this.readyState == 4 && this.status == 200) {
    amount.innerHTML+="<span class='priceAmount'><b>"+this.responseText+"</b></span>";
    }
}

function purchase() {
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", "ajax/purchaseAjax.php", true);
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.send();
    xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
        console.log(this.responseText);
        Array.from(document.querySelectorAll("tr")).forEach((el)=> {
            if(!el.classList.contains("top"))
                el.remove();
        });
        emptyCart();
    }
    }
}

function emptyCart() {
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", "ajax/emptyCart.php", true);
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.send();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
                amount.innerHTML="<span class='alert alert-success'>Purchase Successfull !!! Click <a href='buyerDashboard.php'>here</a> to go to dashboard</span>";
        }
    }
}
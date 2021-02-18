function deleteFunc(btn, id, table) {
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", "ajax/delete.php", true);
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.send("id="+id+"&table="+table);
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
        btn.closest("tr").remove();
        }
    }
}
function editFunc(id, $table) {
    window.location.href='edit.php?id='+id+"&table="+$table;
}


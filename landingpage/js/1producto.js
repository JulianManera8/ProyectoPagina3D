var imgPrincipal = document.getElementById('fotoPrincipal');
let otraFoto = document.getElementsByClassName('otraFoto');



otraFoto[0].onclick = function () {
    imgPrincipal.src = otraFoto[0].src;
}
otraFoto[1].onclick = function () {
    imgPrincipal.src = otraFoto[1].src;
}
otraFoto[2].onclick = function () {
    imgPrincipal.src = otraFoto[2].src;
}
otraFoto[3].onclick = function () {
    imgPrincipal.src = otraFoto[3].src;
}
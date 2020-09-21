function muestraModal() {
    document.getElementById("modal").style.display = "block"
}

function cierraModal() {
    document.getElementById("modal").style.display = "none"
}

document.getElementById("muestraModal").onclick = muestraModal

document.getElementById("cerrarModal").onclick = cierraModal

console.log("Camarero!!!")

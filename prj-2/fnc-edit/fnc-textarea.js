function copyTextarea(id) {
  const st = document.getElementById(id).value
  navigator.clipboard.writeText(st)
  console.log(`copy: ${st}`)
}

function clearTextarea(id) {
  document.getElementById(id).value = ''
}

function updateTextarea(id, txt) {
  document.getElementById(id).value = txt
}
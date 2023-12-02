//drabbing the the buttom id using the querySelector
const update = document.querySelector('#update-button')
const deleteButton = document.querySelector('#delete-button')
const messageDiv = document.querySelector('#message')

const input = document.querySelector('.input').value

//adding the event listener when we click to the buttom
update.addEventListener('click', _ => {
    // sending the PUT request using the fetch method
    fetch('/quotes', {
      method: 'put', // we are sending the a put request by setting the fetche's method to put
      headers: { 'Content-Type': 'application/json' }, // telling the server that we're sending JSON data
      // convert the data we send into JSON by using the JSON.Stringify
      body: JSON.stringify({
        name: 'Cebo Mthor',
        quote: 'Do hard things!!!!!!!!!!....',
      }),
    })
    .then(res =>{
      if (res.ok) return res.json()
    })
    .then(response =>{
      window.location.reload(true)
    })
    .catch(error => console.error(error))
})

deleteButton.addEventListener('click', _ =>{
  fetch('/quotes', {
    method: 'delete',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      name: 'Cebo Mthor'
    })
  })
  .then(res => {
    if (res.ok) return res.json()
  })
  .then(data =>{
    if (data === 'No quote to delete'){
      messageDiv.textContent = 'No Cebo Mthor to delete'
    } else{
      window.location.reload()
    }
  })
  .catch(error => console.error(error))
})
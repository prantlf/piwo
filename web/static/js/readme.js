setTimeout(() => {
  const form = document.getElementById('login')
  form.addEventListener('submit', event => {
    event.preventDefault()
    console.log('Login form:', new FormData(form))
  })
}, 1000)

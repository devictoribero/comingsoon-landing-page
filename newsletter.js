(function() {
  const input = document.getElementById('Subscribe-email');
  const subscribeForm = document.getElementById('Subscribe');
  
  subscribeForm.addEventListener('submit', function(e) {
    e.preventDefault();

    if (!isValidEmail(input.value)) {
      return;
    }

    registryEmailToNewsletter(input.value);
  })

  function isValidEmail(email) {
    return (
      email !== undefined &&
      email.trim() !== "" &&
      hasEmailFormat(email)
    )
  }

  function hasEmailFormat(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }

  function registryEmailToNewsletter(email) {
    fetch('url')
  }
})();
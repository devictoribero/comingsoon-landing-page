(function() {
  const inputEmail = document.getElementById('Subscribe-email');
  const subscribeForm = document.getElementById('Subscribe');
  const errorPlaceholder = document.getElementsByClassName('Subscribe-error')[0];
  const storeEmailEndpoint = 'http://www.google.com';
  
  // This event listener is triggers each time a user presses a key when the input is focused
  inputEmail.addEventListener('keypress', function(e) {
    if (!hasEmailFormat(e.target.value)) {
      shoWrongEmailFormatMessage();
    }
  })

  // When the user fires the submit of the form.
  // It could be pressing enter or clicking the submit button
  subscribeForm.addEventListener('submit', function(e) {
    e.preventDefault();

    if (!isValidEmail(inputEmail.value)) {

      shoWrongEmailFormatMessage();
      return;
    }

    registerEmailToNewsletter(inputEmail.value);
  })

  function isValidEmail(email) {
    return (
      email !== undefined &&
      email.trim() !== '' &&
      hasEmailFormat(email)
    )
  }

  function hasEmailFormat(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@']+(\.[^<>()\[\]\\.,;:\s@']+)*)|('.+'))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }

  function shoWrongEmailFormatMessage() {
    errorPlaceholder.innerHTML = 'The email is not valid';
  }

  function registerEmailToNewsletter(email) {
   let _httpRequest = new XMLHttpRequest();
   _httpRequest.onreadystatechange = function() {
    if (_httpRequest.readyState == 4 && _httpRequest.status != 200) {
      showGeneralError();
    }
  }
   _httpRequest.addEventListener('load', onAjaxPetitionSuccess);
   _httpRequest.open('POST', storeEmailEndpoint);

   let jsonData = {email: email};
   let formattedJsonData = JSON.stringify(jsonData);
   _httpRequest.send(formattedJsonData);
  }

  function onAjaxPetitionSuccess () {
    showSubscriptionConfirmation(email);
  }

  function showSubscriptionConfirmation(email) {
    const _html = getSubscriptionConfirmationHtml(email);
    const _subscriptionCard = document.getElementsByClassName('Subscription')[0];
    _subscriptionCard.remove();

    document.body.innerHTML += _html;
  }

  function showGeneralError() {
    errorPlaceholder.innerHTML = 'Something went wrong. Try it later please';
  }

  function getSubscriptionConfirmationHtml(email) {
    return `<div class="Card SubscriptionConfirmation">
    <svg
      aria-hidden="true"
      data-prefix="far"
      data-icon="smile-beam"
      class="SubscriptionConfirmation-icon svg-inline--fa fa-smile-beam fa-w-16"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 496 512"
    >
      <path
        fill="currentColor"
        d="M248 8C111 8 0 119 0 256s111 248 248 248 248-111 248-248S385 8 248 8zm0 448c-110.3 0-200-89.7-200-200S137.7 56 248 56s200 89.7 200 200-89.7 200-200 200zm84-143.4c-20.8 25-51.5 39.4-84 39.4s-63.2-14.3-84-39.4c-8.5-10.2-23.6-11.5-33.8-3.1-10.2 8.5-11.5 23.6-3.1 33.8 30 36 74.1 56.6 120.9 56.6s90.9-20.6 120.9-56.6c8.5-10.2 7.1-25.3-3.1-33.8-10.2-8.4-25.3-7.1-33.8 3.1zM136.5 211c7.7-13.7 19.2-21.6 31.5-21.6s23.8 7.9 31.5 21.6l9.5 17c2.1 3.7 6.2 4.7 9.3 3.7 3.6-1.1 6-4.5 5.7-8.3-3.3-42.1-32.2-71.4-56-71.4s-52.7 29.3-56 71.4c-.3 3.7 2.1 7.2 5.7 8.3 3.4 1.1 7.4-.5 9.3-3.7l9.5-17zM328 152c-23.8 0-52.7 29.3-56 71.4-.3 3.7 2.1 7.2 5.7 8.3 3.5 1.1 7.4-.5 9.3-3.7l9.5-17c7.7-13.7 19.2-21.6 31.5-21.6s23.8 7.9 31.5 21.6l9.5 17c2.1 3.7 6.2 4.7 9.3 3.7 3.6-1.1 6-4.5 5.7-8.3-3.3-42.1-32.2-71.4-56-71.4z"
      />
    </svg>
    <div class="SubscriptionConfirmation-message">
      <h2 class="SubscriptionConfirmation-title">
        We registered your petition
      </h2>
      <span class="SubscriptionConfirmation-text"
        >Thank you for the subscription. We\'ll send you some information at <i>${email}</i>.</span
      >
    </div>
  </div>
  `
  }
})();
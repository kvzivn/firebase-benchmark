import { initializeApp } from "firebase/app";
import { getFunctions, httpsCallable } from 'firebase/functions';

const firebaseConfig = {
  apiKey: "AIzaSyBa9HRh52NoydE0YYUoDqQmMiN2Pqxtl7Y",
  authDomain: "benchmark-add-contact.firebaseapp.com",
  projectId: "benchmark-add-contact",
  storageBucket: "benchmark-add-contact.appspot.com",
  messagingSenderId: "647876934453",
  appId: "1:647876934453:web:224e1fb31f47641edeea7c"
};

const app = initializeApp(firebaseConfig);
const addBenchmarkContact = httpsCallable(getFunctions(app), 'addBenchmarkContact');

const init = async () => {
  const forms = document.querySelectorAll('[name="wf-form-newsletter-signup-form"]');

  forms.forEach((form) => {
    form.addEventListener('submit', function(e){
      e.preventDefault();

      var formData = new FormData(e.target);
      var email = formData.get('Email');

      if (!email) {
        console.log('No valid email field found in the form.');
        return;
      }

      addBenchmarkContact({ email })
        .then(() => {
          form.innerHTML = '<div class="text-large text-neutral-white">Thank you for subscribing to our newsletter!</div>';
        })
        .catch((error) => {
          console.log(error.message);
          form.innerHTML = '<div class="text-large text-neutral-white">Something went wrong while submitting the form.</div>';
        });
    });
  });
}

init()
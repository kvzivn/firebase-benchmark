import { initializeApp } from "firebase/app";
import { getFunctions, httpsCallable } from 'firebase/functions';

const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
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

          const successMessages = document.querySelectorAll('.newsletter-cta-success-message')
          const errorMessages = document.querySelector('.newsletter-cta-error-message')
          const submitButton = form.querySelector('.w-button');
          const originalSubmitValue = submitButton.value;
          submitButton.value = submitButton.getAttribute('data-wait');

          var formData = new FormData(e.target);
          var email = formData.get('Email');

          if (!email) {
              console.log('No valid email field found in the form.');
              return;
          }

          addBenchmarkContact({ email })
            .then((result) => {
                console.log(result.data);
                form.style.display = 'none';
                successMessages.forEach(m => m.style.display = 'block')
            })
            .catch((error) => {
                console.log(error.message);
                errorMessages.forEach(m => m.style.display = 'block');
            })
            .finally(() => {
                submitButton.value = originalSubmitValue;
            });
      });
  });
}


init()






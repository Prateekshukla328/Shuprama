
const auth = firebase.auth();

// Email login
function loginWithEmail() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  auth.signInWithEmailAndPassword(email, password)
    .then(() => {
      document.getElementById("message").innerText = "Logged in successfully!";
      saveSession();
    })
    .catch(error => alert("Login Error: " + error.message));
}

// Email signup
function signupWithEmail() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  auth.createUserWithEmailAndPassword(email, password)
    .then(() => {
      document.getElementById("message").innerText = "Account created!";
      saveSession();
    })
    .catch(error => alert("Signup Error: " + error.message));
}

// Phone login
function sendOTP() {
  const phoneNumber = document.getElementById("phone").value;
  window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container', {
    size: 'normal'
  });
  auth.signInWithPhoneNumber(phoneNumber, window.recaptchaVerifier)
    .then(confirmResult => {
      window.confirmationResult = confirmResult;
      document.getElementById("otp-section").style.display = "block";
      document.getElementById("message").innerText = "OTP sent!";
    })
    .catch(error => alert("OTP Error: " + error.message));
}

function verifyOTP() {
  const otp = document.getElementById("otp").value;
  if (window.confirmationResult) {
    window.confirmationResult.confirm(otp)
      .then(() => {
        document.getElementById("message").innerText = "Phone login successful!";
        saveSession();
      })
      .catch(error => alert("OTP Verification Failed: " + error.message));
  }
}

function saveSession() {
  const user = auth.currentUser;
  if (user) {
    localStorage.setItem("user", JSON.stringify({ uid: user.uid, email: user.email || '', phone: user.phoneNumber || '' }));
  }
}

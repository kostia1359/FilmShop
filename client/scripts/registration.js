window.onload = () => {
    const signInButton = document.getElementById('sign_in');
    const signUpButton = document.getElementById('sign_up');
    const signInForm = document.getElementById('login_form');
    const signUpForm = document.getElementById('registration_form');

    signInButton.addEventListener('click', replaceForms(signInForm, signUpForm));

    signUpButton.addEventListener('click', replaceForms(signUpForm, signInForm))

    function replaceForms(formToBeViewed, formToBeHidden) {
        return function () {
            formToBeHidden.reset();
            formToBeHidden.style.display = 'none';
            formToBeViewed.style.display = 'flex';
        }
    }

}
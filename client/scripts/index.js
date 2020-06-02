import {generateBtnEventListener,deleteEventListeners} from "./helpers/eventListeners.js";

window.onload = () => {
    const awardButton = document.getElementById('openAwardTable');
    const descriptionButton = document.getElementById('openDescriptionTable');
    const genreButton = document.getElementById('openGenreTable');

    const awardSelect=generateBtnEventListener('award', awardButton);
    const descriptionSelect=generateBtnEventListener('description', descriptionButton);
    const genreSelect=generateBtnEventListener('genre', genreButton);

    descriptionButton.addEventListener('click',descriptionSelect);
    genreButton.addEventListener('click',genreSelect);
    awardButton.addEventListener('click', awardSelect);
}
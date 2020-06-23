import {generateBtnEventListener,deleteEventListeners} from "./helpers/eventListeners.js";

window.onload = () => {
    const awardButton = document.getElementById('openAwardTable');
    const descriptionButton = document.getElementById('openDescriptionTable');
    const genreButton = document.getElementById('openGenreTable');
    const filmButton = document.getElementById('openFilmTable');
    const logOutButton=document.getElementById('logout');

    const awardSelect=generateBtnEventListener('award', awardButton);
    const descriptionSelect=generateBtnEventListener('description', descriptionButton);
    const genreSelect=generateBtnEventListener('genre', genreButton);
    const filmSelect=generateBtnEventListener('film',filmButton);

    descriptionButton.addEventListener('click',descriptionSelect);
    genreButton.addEventListener('click',genreSelect);
    awardButton.addEventListener('click', awardSelect);
    filmButton.addEventListener('click', filmSelect);
    logOutButton.addEventListener('click', async ()=>{
        await fetch('http://localhost:3050/users/logout');
        document.location.reload(true);
    })
}
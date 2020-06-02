import {generateBtnEventListener,deleteEventListeners} from "./helpers/eventListeners.js";

const url = 'http://localhost:3050/api/award/';




window.onload = () => {
    const awardButton = document.getElementById('openAwardTable');
    const f=generateBtnEventListener('award', awardButton);

    awardButton.addEventListener('click', f);
}
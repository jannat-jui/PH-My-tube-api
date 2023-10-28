const loadData = async () => {
    const res = await fetch('https://openapi.programming-hero.com/api/videos/categories');
    const data = await res.json();
    const catagories = data.data;
    displayCategories(catagories);
}

const displayCategories = items => {
    const butttonContainer = document.getElementById('button-container');
    items.forEach(item => {
        const div = document.createElement('div');
        div.innerHTML = `
        <button onclick = "loadCardData('${item.category_id}')" id="catagories-button" class="btn btn-ghost bg-[#25252526] rounded-md text-[#252525B3] inter text-base capitalize font-semibold hover:bg-[#FF1F3D] hover:text-white  focus:bg-[#FF1F3D] active:bg-[#FF1F3D] focus:text-white active:text-white">${item.category}</button>
        `;
        butttonContainer.appendChild(div);
    })
    const buttons = document.getElementById('catagories-button');
    buttons.addEventListener('click', () => {
        buttons.classList.toggle('clicked');
    });
}
let cardData = [];

const loadCardData = async (id) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/videos/category/${id}`);
    const data = await res.json();
    cardData = data.data;
    
    if (data.status === true) {
        displayAllCards(cardData);
        const emptyCardContainer = document.getElementById('empty-card-container');
    emptyCardContainer.innerHTML = '';
    
    }
    if (data.status === false) {
        const cardContainer = document.getElementById('card-container');
        cardContainer.innerHTML = '';
        displayAllCardsIfEmpty();
        return;
    }

}

const displayAllCards = cardData => {
    const cardContainer = document.getElementById('card-container');
    cardContainer.innerHTML = '';
    cardData.forEach(data => {
        const div = document.createElement('div');
        div.innerHTML = `
        <div class="w-[19.5rem]">
        <div class=" relative w-fit">
            <img class="rounded-lg w-[19.5rem] h-[12.5rem]" src="${data.thumbnail}" alt="">
            <h3 id="date" class=" bg-[#171717] text-white inter text-[0.625rem] w-fit  absolute bottom-[0.75rem] right-[0.75rem]">${convertsTOhm(data.others?.posted_date)}</h3>
        </div>
        <div class="flex gap-[0.75rem] mt-5">
            <img class="w-[2.5rem] h-[2.5rem] rounded-[50%]" src="${data.authors[0].profile_picture}" alt="">
            <h2 class="text-[#171717] inter font-semibold text-[1.25rem]">${data.title}</h2>
        </div>
        <div class="flex mt-2 gap-2 ml-[3.2rem]">
            <h4 class="text-[#171717B3] inter text-sm">${data.authors[0].profile_name}</h4>
            <h3>${data.authors[0].verified ? '<img src="./image/bluetick.svg" alt=""></img>' : ''}</h3>
        </div>
        <p class="text-[#171717B3] inter text-sm mt-3 ml-[3.2rem] mb-4">${data.others.views} views</p>
    </div>
        `;
        cardContainer.appendChild(div);
    })
    
    
    function convertsTOhm(seconds) {

        if (seconds) {
            const hours = Math.floor(seconds / 3600);
            const minutes = Math.floor((seconds % 3600) / 60);

            return `${hours}hrs ${minutes} min ago`;
        }
        else if (seconds = '') {
            return '';
        }
        else {
            return '';
        }
    }
}


const displayAllCardsIfEmpty = ()=>{

    const emptyCardContainer = document.getElementById('empty-card-container');
    emptyCardContainer.innerHTML = '';
    const div = document.createElement('div');
    div.classList = `flex flex-col justify-center items-center h-[70vh]`;
    div.innerHTML = `
    <img class="mx-auto" src="./image/icon.png" alt="">
    <h1 class="mt-8 mx-auto w-[27rem] text-[#171717] text-center text-[2rem] font-semibold">Oops!! Sorry, There is no content here</h1>
    `
    emptyCardContainer.appendChild(div);
}

document.getElementById('blog-btn').addEventListener('click', function getCardData(data){
    window.location.href = 'blog.html'
})

loadData()
loadCardData('1000')

function sortCardsByViews() {
    cardData.sort((a, b) => {
      const viewsA = parseInt(a.others.views, 10);
      const viewsB = parseInt(b.others.views, 10);
      return viewsB - viewsA;
    });
    displayAllCards(cardData);
}






const loadPhone = async (searchText, dataLimite) => {
    const getUrl = `https://openapi.programming-hero.com/api/phones?search=${searchText}`
    const res = await fetch(getUrl)
    const info = await res.json()
    displayPhone(info.data, dataLimite);
}

const displayPhone = (phone, dataLimite) => {
    const phoneContainer = document.getElementById('phone-container');
    phoneContainer.textContent = '';
    //Display 20 phone only 
    const showALl = document.getElementById('show-all');
    if (dataLimite && phone.length > 10) {
        phone = phone.slice(0, 20);
        showALl.classList.remove('d-none')
    } else {
        showALl.classList.add('d-none')
    }

    //Display no phone found
    const noPhone = document.getElementById('no-found-massage');
    if (phone.length === 0) {
        noPhone.classList.remove('d-none')
    } else {
        noPhone.classList.add('d-none')
    }

    //Display all phone

    phone.forEach(getPhon => {
        const phoneDiv = document.createElement('div');
        phoneDiv.classList.add('col');
        phoneDiv.innerHTML = `
                <div class="card" style="width: 18rem;">
                     <img src="${getPhon.image}" class="card-img-top" alt="...">
                <div class="card-body">
                <h5 class="card-title">${getPhon.phone_name}</h5>
                <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                <button onclick="loadPhoneDetails('${getPhon.slug}')" class="btn btn-info" data-bs-toggle="modal" data-bs-target="#phoneDetailModal">Details</button>
               
        </div>
        </div>
        
        `;
        phoneContainer.appendChild(phoneDiv)
    })

    //Stop Spiner or loader 
    toggleSponer(false)
}

const processSearch = (dataLimite) => {
    toggleSponer(true)
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    loadPhone(searchText, dataLimite);
    searchField.value = '';

}
//Handel Search Btn
document.getElementById('btn-search').addEventListener('click', function () {
    //Start Loder 
    processSearch(10)

})
//Enter Button Event Handeler 
document.getElementById('search-field').addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        processSearch(10)

    }
})

//Toggle Spiner 
const toggleSponer = isLoading => {
    const loadSection = document.getElementById('loder');
    if (isLoading) {
        loadSection.classList.remove('d-none')
    } else {
        loadSection.classList.add('d-none')
    }
}
//Not the best way the system
document.getElementById('btn-show-more').addEventListener('click', function () {

    processSearch();

})


const loadPhoneDetails = async (id) => {
    const url = `https://openapi.programming-hero.com/api/phone/${id}`
    const res = await fetch(url)
    const info = await res.json()
    displyaPhoneDetails(info.data);
}

const displyaPhoneDetails = phone => {
    console.log(phone);
    const modelTitle = document.getElementById('phoneDetailModalLabel');
    modelTitle.innerText = phone.name;
    const phoneDeatis = document.getElementById('phone-details');
    phoneDeatis.innerHTML = `
    <p>Release Data ${phone.releaseDate ? phone.releaseDate : 'No Release Data'}</p>
    <p>Porcessore ${phone.mainFeatures ? phone.mainFeatures.chipSet : 'Not future'}</p>
    <p>Ram & Stroge ${phone.mainFeatures ? phone.mainFeatures.memory : 'Not information Ram and Stroge'}</p>
    `;
    //<p>Release Data ${phone.releaseDate}</p>
};


//loadPhone()

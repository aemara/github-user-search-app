const searchButton = document.querySelector('.search-form button');
const toggleThemeButton = document.querySelector('.toggle-theme');
const input = document.querySelector('.search-form input');
searchButton.addEventListener('click', getUserInfo);

let theme = "light";


async function getUserInfo() {
    try {
        
        const userName = input.value;
        const response = await fetch(`https://api.github.com/users/${userName}`);
        if(response.ok) {
            const jsonObject = await response.json();
            showUserInfo(jsonObject);
        } else {
            document.querySelector('.no-results').removeAttribute('hidden');
        }
    } catch(error) {
        console.log(error);
    }
}


const showUserInfo = (response) => {

    

    if(!response.location) {response.location = 'Not available';}
    if(!response.blog) {response.blog = 'Not available';}
    if(!response.twitter_username) {response.twitter_username = 'Not available'};
    if(!response.company) {response.company = 'Not available'};

    const container = document.querySelector('.container');
    const userInfoDiv = document.createElement("div");
    userInfoDiv.classList.add('user-info');
    const dateJoined = parseDate(response.created_at);
    userInfoDiv.innerHTML = `

    
        <div class="header-info">
            
            <img class="user-image" src="${response.avatar_url}">


            <div class="name-date">
                    <div class="name-handle">
                        <h2 class="name">${response.name}</h2>
                        <h3><a class="user-name" href="${response.html_url}">@${response.login}</a></h3>
                    </div>

                    
                    <p class="date-join">${dateJoined}</p>  
            </div>       
        </div>

        <div class="bio">
                <p>${response.bio ? response.bio : 'This profile has no bio'}</p>
        </div>    

            <div class="numbers numbers-light">

                <div class="repos number">
                    <p id="repos">repos</p>
                    <h2 id="repos-number" class="dark-h2">${response.public_repos}</h2>
                </div>
                <div class="followers number">
                    <p id="followers">followers</p>
                    <h2 id="followers-number" class="dark-h2">${response.followers}</h2>
                </div>
                <div class="following number">
                    <p id="following">following</p>
                    <h2 id="following-number" class="dark-h2">${response.following}</h2>
                </div>

            </div>

            <div class="extra-info extra-info-light">

                <div class="location-blog">
                    <div class="location extra-info-bit">
                        <img src="assets/icon-location.svg">
                        <p>${response.location}</p>
                    </div>
                    <div class="blog  extra-info-bit">
                        <img src="assets/icon-website.svg">
                        <p><a class = "extra-info-link light-theme-link" href="${response.blog}">${response.blog}</a></p>
                    </div>
                </div>


                <div class="twitter-company">
                    <div class="twitter  extra-info-bit">
                        <img src="assets/icon-twitter.svg">
                        <p><a class = "extra-info-link light-theme-link" href="https://twitter.com/${response.twitter_username}">${response.twitter_username}</a></p>
                    </div>
                    <div class="company  extra-info-bit">
                        <img src="assets/icon-company.svg">
                        <p><a class = "extra-info-link light-theme-link" href="https://github.com/${response.company.substring(1)}">${response.company}</a></p>
                    </div>
                </div>

            </div>
        
    
`;

if(document.querySelector('.user-info')) {
    document.querySelector('.user-info').innerHTML = '';
    document.querySelector('.user-info').innerHTML = userInfoDiv.innerHTML;
} else {
    container.append(userInfoDiv);
}


if(theme === 'dark') {
     /*User Info Section*/
     document.querySelector('.name').classList.add('white-text');
    document.querySelector('.date-join').classList.add('white-text');
     document.querySelector('.user-info').classList.add('user-info-dark');
     const extraInfoLinks = document.querySelectorAll('.extra-info-link');
     extraInfoLinks.forEach((link) => {
         link.classList.remove('light-theme-link');
         link.classList.add('dark-theme-link');
     })
 
     /*Stats Section*/
     document.querySelector('.numbers').classList.remove('numbers-light');
     document.querySelector('.numbers').classList.add('numbers-dark');
     const statNumbers = document.querySelectorAll('.numbers h2');
     statNumbers.forEach((statNumber) => {
         statNumber.classList.remove('dark-h2');
         statNumber.classList.add('white-text');
     })
}


    if(response.location === 'Not available') {
        const locationDiv = document.querySelector('.location');
        locationDiv.classList.add('not-available');
    }

    if(response.blog === 'Not available') {
        document.querySelector('.blog').classList.add('not-available');
        document.querySelector('.blog p .extra-info-link').remove();
        document.querySelector('.blog p').innerHTML = 'Not available';
    }

    if(response.twitter_username === 'Not available') {
        document.querySelector('.twitter').classList.add('not-available');
        document.querySelector('.twitter p .extra-info-link').remove();
        document.querySelector('.twitter p').innerHTML = 'Not available';
    }

    if(response.company === 'Not available') {
        document.querySelector('.company').classList.add('not-available');
        document.querySelector('.company p .extra-info-link').remove();
        document.querySelector('.company p').innerHTML = 'Not available';
    }
}

const parseDate = (dateString) => {
    const year = dateString.slice(0,4);
    let month = dateString.slice(5,7);
    const day = dateString.slice(8,10);

    switch(month) {
        case '01':
            month = 'Jan';
            break;
            case '02':
                month = 'Feb';
                break;
            case '03':
                month = 'Mar';
                break;
            case '04':
                month = 'Apr';
                break;  
            case '05':
                month = 'May';
                break;
            case '06':
                month = 'Jun';
                break;  
            case '07':
                month = 'Jul';
                break;
            case '08':
                month = 'Aug';
                break;            
            case '09':
                month = 'Sep';
                break;
            case '10':
                month = 'Oct';
                break;
            case '11':
                month = 'Nov';
                break;
            case '12':
                month = 'Dec';
                break;    
                
    }

    return `Joined ${day} ${month} ${year}`;
}

const toggleTheme = () => {
    theme = theme === "light" ? "dark" : "light"

    document.body.classList.toggle('dark-background');
    document.querySelector('.logo').classList.toggle('white-text');

    if(theme === 'dark') {
        document.querySelector('.toggle-theme').innerHTML = "<p>light</p> <img src=\"./assets/icon-sun.svg\"/>";
        document.querySelector('.toggle-theme p').classList.toggle('white-text');
    } else {
        document.querySelector('.toggle-theme').innerHTML = "<p>dark</p> <img src=\"./assets/icon-moon.svg\"/>";
        
    }
    
    

    /*Search Bar*/
    document.querySelector('form').classList.toggle('search-dark');
    document.querySelector('form input').classList.toggle('search-light');
    document.querySelector('form input').classList.toggle('search-dark');

   

    /*User Info Section*/
    document.querySelector('.name').classList.toggle('white-text');
    document.querySelector('.date-join').classList.toggle('white-text');
    document.querySelector('.user-info').classList.toggle('user-info-dark');
    const extraInfoLinks = document.querySelectorAll('.extra-info-link');
    extraInfoLinks.forEach((link) => {
        link.classList.toggle('light-theme-link');
        link.classList.toggle('dark-theme-link');
    })

    /*Stats Section*/
    document.querySelector('.numbers').classList.toggle('numbers-light');
    document.querySelector('.numbers').classList.toggle('numbers-dark');
    const statNumbers = document.querySelectorAll('.numbers h2');
    statNumbers.forEach((statNumber) => {
        statNumber.classList.toggle('dark-h2');
        statNumber.classList.toggle('white-text');
    })
    
    
}

const toggleButtonHover = () => {
    if (theme === light) {

    }
}


toggleThemeButton.onclick = toggleTheme;
input.addEventListener('focus', () => {
    document.querySelector('.no-results').setAttribute('hidden', true);
})

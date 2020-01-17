document.addEventListener("DOMContentLoaded", function() {
    const baseURL = "http://localhost:3000/"
    const usersURL = "http://localhost:3000/users"
    // let userShow = `http://localhost:3000/users/${user.id}`
    getUsers()
    function getUsers() {
        fetch(usersURL)
        .then(resp => resp.json())
        .then(users => {
        // for(const property in users){
        //     console.log(`${property}: ${users[property]}`)}
        //     renderUsers(users)
         users.forEach(user => renderUsers(user))
        })
    }

    let mainDiv = document.getElementById("main")
    let usersIndexDiv = document.getElementById("users-index")
    let userProfile = document.createElement("div")
    userProfile.classList.add("hidden")
    mainDiv.appendChild(userProfile)
    

    function renderUsers(user) {
        let userDiv = document.createElement("div")
        let userUl = document.createElement("ul")
        let userLi = document.createElement("li")
        userDiv.className = "user-div"
        userLi.dataset.id = user.id
        userUl.className = "user-ul"
        userLi.clasName = "user-li"
        userLi.innerText = user.username
        userUl.appendChild(userLi)
        userDiv.appendChild(userUl)  
        usersIndexDiv.appendChild(userDiv)    
    }

    usersIndexDiv.addEventListener("click", function(e) {
        usersIndexDiv.classList.add("hidden")
        renderUser(e.target.dataset.id)
    })

    function renderUser(id) {
        fetch(`http://localhost:3000/users/${id}`)
        .then(resp => resp.json())
        .then(userInfo => {
         displayUserProfile(userInfo)})
    }

    function displayUserProfile(userInfo) {
        userProfile.style.display = "block"
        let nameHead = document.createElement("h1")
        let displayPicDiv = document.createElement("div")
        let displayPicImg = document.createElement("img")
        let aboutMeDiv = document.createElement("div")
        let aboutMeP = document.createElement("p")
        let imgColumn = document.createElement("div")
        let imgRow = document.createElement("div")

        imgRow.className = "img-row"
        nameHead.className = "user-display-name"
        imgColumn.id = "img-column"
        userProfile.className = "user-show-page"
        displayPicImg.className = "display-pic"
        userProfile.dataset.id = userInfo.id
        nameHead.innerText = userInfo.username
        displayPicImg.src = userInfo.display_pic
        displayPicDiv.appendChild(displayPicImg)
        aboutMeP.innerText = userInfo.about_me
        aboutMeP.className = "about-me-p"
        aboutMeDiv.appendChild(aboutMeP)

        userInfo.photos.forEach(function(photo) {
            let tileContent = document.createElement("div")
            let gridImage = document.createElement("img")
            gridImage.src = photo.photo_url
            tileContent.appendChild(gridImage)
            tileContent.className = "tile-content"
            tileContent.dataset.id = photo.id
            tileContent.dataset.userId = userInfo.id
            imgColumn.appendChild(tileContent)
            imgRow.appendChild(imgColumn)

        })
        userProfile.appendChild(nameHead)
        userProfile.appendChild(displayPicDiv)
        userProfile.appendChild(aboutMeDiv)
        userProfile.appendChild(imgRow)
        
        console.log(userInfo)
    }

})

// be able to click on user and go to their profile
// show profile
// see list of photos associated with that user

document.addEventListener("DOMContentLoaded", function() {
    const baseURL = "http://localhost:3000/"
    const usersURL = "http://localhost:3000/users"
    let mainDiv = document.getElementById("main")
    let navBar = document.getElementById("the-nav-bar")
    navBar.classList.add("hidden")
    let loginDiv = document.createElement("div")
    let signupDiv = document.createElement("div")
    let usersListBtn = document.getElementById("usersNavBtn")
    let usersIndexDiv = document.getElementById("users-index")
    let userProfile = document.createElement("div")
    usersIndexDiv.classList.add("hidden")
    userProfile.classList.add("hidden")
    signupDiv.classList.add("hidden")
    mainDiv.appendChild(userProfile)
    mainDiv.appendChild(loginDiv)
    mainDiv.appendChild(signupDiv)

    loginCreate()
    function loginCreate() {
        loginDiv.innerHTML = ""
        userProfile.classList.add("hidden")
        loginDiv.classList.remove("hidden")
        let loginInput = document.createElement("input")
        let loginBtn = document.createElement("button")
        let loginBanner = document.createElement("h1")
        let loginP = document.createElement("p")
        let loginOrP = document.createElement("p")
        let signupLinkP = document.createElement("p")
        loginOrP.innerText = "Or"
        loginOrP.className = "login-or-p"
        signupLinkP.innerText = "Sign Up"
        signupLinkP.className = "signup-link-p"
        signupLinkP.id = "signup-link"
        loginP.innerText = "Would you like to"
        loginP.className = "login-p"
        loginBanner.innerText = "Welcome!"
        loginBanner.className = "login-banner"
        loginInput.placeholder = "Username: "
        loginInput.className = "login-input"
        loginInput.id = "login-input"
        loginBtn.innerText = "Log In"
        loginBtn.className = "login-btn"
        loginDiv.appendChild(loginBanner)
        loginDiv.appendChild(loginP)
        loginDiv.appendChild(loginInput)
        loginDiv.appendChild(loginBtn)
        loginDiv.appendChild(loginOrP)
        loginDiv.appendChild(signupLinkP)
    }

    function signupCreate() {
        loginDiv.classList.add("hidden")
        signupDiv.classList.remove("hidden")
        let signupForm = document.createElement("form")
        let signupNameInput = document.createElement("input")
        let signupPasswordInput = document.createElement("input")
        let signupDisplayPicInput = document.createElement("input")
        let signupAboutMeInput = document.createElement("input")
        let signupSubmitBtn = document.createElement("input")

        signupNameInput.id = "signup-name-input"
        signupNameInput.placeholder = "Name: "
        signupPasswordInput.id = "signup-password-input"
        signupPasswordInput.placeholder = "Password: "
        signupDisplayPicInput.id = "signup-display-pic-input"
        signupDisplayPicInput.placeholder = "Display Pic Url:"
        signupAboutMeInput.id = "signup-about-me-input"
        signupAboutMeInput.placeholder = "Description: "
        signupSubmitBtn.className = "signup-submit-btn"
        signupSubmitBtn.attributes = ("value", "Submit")
        signupSubmitBtn.type = "submit"
        signupSubmitBtn.id = "signup-submit-btn"

        signupForm.appendChild(signupNameInput)
        signupForm.appendChild(signupPasswordInput)
        signupForm.appendChild(signupDisplayPicInput)
        signupForm.appendChild(signupAboutMeInput)
        signupForm.appendChild(signupSubmitBtn)
        signupDiv.appendChild(signupForm)
    }

    function getUsers() {
        fetch(usersURL)
        .then(resp => resp.json())
        .then(users => {
            usersIndexDiv.innerHTML = ""
         users.forEach(user => renderUsers(user))
        })
    }

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
        signupDiv.classList.add("hidden")
        loginDiv.classList.add("hidden")
        navBar.classList.remove("hidden")
        userProfile.innerHTML = ""
        userProfile.classList.remove("hidden")

        let nameHead = document.createElement("h1")
        let displayPicDiv = document.createElement("div")
        let displayPicImg = document.createElement("img")
        let aboutMeDiv = document.createElement("div")
        let aboutMeP = document.createElement("p")
        let imgBody = document.createElement("div")
        let commentUl = document.createElement("ul")
        let pictureFormDiv = document.createElement("div")
        let pictureForm = document.createElement("form")
        let urlField = document.createElement("input")
        let captionField = document.createElement("input")
        let pictureSubmitBtn = document.createElement("input")
        let userDeleteBtn = document.createElement("button")

        userDeleteBtn.id = "user-delete-btn"
        userDeleteBtn.dataset.userid = userInfo.id
        userDeleteBtn.innerText = "Delete Profile"
        pictureFormDiv.id = "picture-form-div"
        pictureForm.appendChild(urlField)
        pictureForm.appendChild(captionField)
        pictureForm.appendChild(pictureSubmitBtn)
        urlField.id = "url-field"
        captionField.id = "caption-field"
        pictureSubmitBtn.id = "picture-submit-btn"
        pictureSubmitBtn.dataset.userid = userInfo.id
        pictureSubmitBtn.type = "submit"
        commentUl.className = "comments-list"
        imgBody.className = "img-body"
        nameHead.className = "user-display-name"
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
            let likeBtn = document.createElement("button")
            let likeSpan = document.createElement("span")
            let likeCounter = document.createElement("span")
            let commentUl = document.createElement("ul")
            let commentForm = document.createElement("form")
            let descriptionField = document.createElement("input")
            let commentSubmitBtn = document.createElement("input")
            let photoDeleteBtn = document.createElement("button")
            
            if (photo.caption) {
                let caption = document.createElement("p") 
                caption.innerText = photo.caption 
                tileContent.appendChild(caption)
            }

            photoDeleteBtn.innerText = "Delete Photo"
            photoDeleteBtn.dataset.photoid = photo.id
            photoDeleteBtn.className = "photo-delete-btn"
            descriptionField.attributes = ("type", "text")
            descriptionField.name = ("description")
            descriptionField.id = `comment-description-${photo.id}`
            descriptionField.dataset.photoid = photo.id
            descriptionField.dataset.userid = userInfo.id
            descriptionField.className = "description-field"
            commentSubmitBtn.attributes = ("value", "Submit")
            commentSubmitBtn.type = "submit"
            commentSubmitBtn.className = "comment-submit"
            commentSubmitBtn.value = "Add Comment"
            commentSubmitBtn.dataset.photoid = photo.id
            commentSubmitBtn.dataset.userid = userInfo.id
            commentForm.appendChild(descriptionField)
            commentForm.appendChild(commentSubmitBtn)
            commentUl.id = `comment-ul-${photo.id}`
            commentUl.dataset.id = photo.id
            commentUl.className = ("comment-ul")
            likeCounter.dataset.id = photo.id
            likeCounter.className = ("like-counter")
            likeSpan.className = "likes"
            likeBtn.innerText = "Like"
            likeBtn.className = "like-btn"
            likeBtn.dataset.userid = userInfo.id

            if (photo.likes) {
                let like = photo.likes.length
                likeCounter.innerText = like
                likeSpan.innerText = "Likes: "
                likeSpan.appendChild(likeCounter)
            } else if (!photo.likes) {
                like = 0
                likeCounter.innerText = like
                likeSpan.innerText = "Likes: "
                likesSpan.appendChild(likeCounter)
            }

            if (photo.comments) {
                photo.comments.forEach(function(comment) {
                    let commentLi = document.createElement("li")
                    let commentDeleteBtn = document.createElement("button")
                    commentDeleteBtn.className = "comment-delete-btn"
                    commentDeleteBtn.innerText = "X"
                    commentDeleteBtn.dataset.photoid = photo.id
                    commentDeleteBtn.dataset.commentid = comment.id
                    commentLi.className = "comment-li"
                    commentLi.dataset.id = comment.id
                    commentLi.innerText = comment.description
                    commentLi.appendChild(commentDeleteBtn)
                    commentUl.appendChild(commentLi)
                })
            }

            gridImage.src = photo.photo_url
            tileContent.appendChild(gridImage)
            tileContent.className = "tile-content"
            tileContent.dataset.id = photo.id
            likeBtn.dataset.userid = userInfo.id
            likeBtn.dataset.id = photo.id
            likeSpan.dataset.id = photo.id
            tileContent.appendChild(likeSpan)
            tileContent.appendChild(likeBtn)
            tileContent.appendChild(commentUl)
            tileContent.appendChild(commentForm)
            tileContent.appendChild(photoDeleteBtn)
            imgBody.appendChild(tileContent)
        })
        userProfile.appendChild(nameHead)
        userProfile.appendChild(displayPicDiv)
        userProfile.appendChild(aboutMeDiv)
        pictureFormDiv.appendChild(pictureForm)
        imgBody.appendChild(pictureFormDiv)
        imgBody.appendChild(userDeleteBtn)
        userProfile.appendChild(imgBody)
    }

    usersListBtn.addEventListener("click", function(e) {
        userProfile.classList.add("hidden")
        usersIndexDiv.classList.remove("hidden")
        loginDiv.classList.add("hidden")
        getUsers()
    })

    loginDiv.addEventListener("click", function(e) {
        if (e.target.className === "login-btn") {
            let loginInput = document.getElementById("login-input")
            fetch("http://localhost:3000/users")
            .then(resp => resp.json())
            .then(users => {
               
                users.forEach(function(user) {
                    if (user.username === loginInput.value) {
                        renderUser(user.id)
                    }
                })
            })
        }
        if(e.target.id === "signup-link") {
            signupCreate()
        }
    })

    signupDiv.addEventListener("submit", function(e) {
        e.preventDefault()
        console.log(e.target.lastChild.id)
        if (e.target.lastChild.id === "signup-submit-btn") {
            console.log("pass")
            let nameData = document.getElementById("signup-name-input")
            let passwordData = document.getElementById("signup-password-input")
            let userPicData = document.getElementById("signup-display-pic-input")
            let aboutMeData = document.getElementById("signup-about-me-input")
            fetch("http://localhost:3000/users", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json"
                },
                body: JSON.stringify({
                    username: nameData.value,
                    password: passwordData.value,
                    display_pic: userPicData.value,
                    about_me: aboutMeData.value 
                })
            })
            .then(resp => resp.json())
            .then(newUser => {
                console.log(newUser)
                renderUser(newUser.id)
            })
        }
    })

    userProfile.addEventListener("submit", function(e) {
        e.preventDefault()
        if (e.target.lastChild.className === "comment-submit") {
            let descriptionInput = document.getElementById(`comment-description-${e.target.lastChild.dataset.photoid}`)
            fetch("http://localhost:3000/comments", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json"
                },
                body: JSON.stringify({
                    user_id:  e.target.lastChild.dataset.userid,
                    description: descriptionInput.value,
                    photo_id: e.target.lastChild.dataset.photoid
                })
            }) 
            .then(resp => resp.json())
            .then(aComment => {
                let commentUl = document.getElementById(`comment-ul-${e.target.lastChild.dataset.photoid}`)
                let commentLi = document.createElement("li")
                commentLi.className = "comment-li"
                commentLi.innerText = aComment.description
                commentUl.appendChild(commentLi)
                renderUser(aComment.user_id)
            }) 
            e.target.reset();
        }  
         if (e.target.lastChild.id === "picture-submit-btn") {
             let urlData = document.getElementById("url-field")
             let captionData = document.getElementById("caption-field")
             fetch("http://localhost:3000/photos", {
                 method: "POST",
                 headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json"
                 },
                 body: JSON.stringify({
                     user_id: e.target.lastChild.dataset.userid,
                     photo_url: urlData.value,
                     caption: captionData.value,
                 })
             })
             .then(resp => resp.json())
             .then(photo => {
                 renderUser(photo.user_id)
             })
         }         
    })

    userProfile.addEventListener("click", function(e) {
        if (e.target.className === "comment-delete-btn") {
        fetch(`http://localhost:3000/comments/${e.target.dataset.commentid}`, {
            method: "DELETE",
        })
            e.target.parentNode.remove()
        }
        if (e.target.className === "photo-delete-btn") {
            fetch(`http://localhost:3000/photos/${e.target.dataset.photoid}`, {
                method: "DELETE",
            })
            e.target.parentNode.remove()
        }
        if (e.target.id === "user-delete-btn") {
            fetch(`http://localhost:3000/users/${e.target.dataset.userid}`, {
                method: "DELETE",
            })
            loginCreate()
        }
    })

    userProfile.addEventListener("click", function(e) {
        if (e.target.className === "like-btn") {
            let likeCounters = userProfile.querySelectorAll(".like-counter")
            likeCounters.forEach(function(counter) {
            if (counter.dataset.id === e.target.dataset.id) {
                counter.innerText = parseInt(counter.innerText) + 1
            }
            })
            fetch("http://localhost:3000/likes", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json"
            },
            body: JSON.stringify({
                user_id: e.target.dataset.userid,
                photo_id: e.target.dataset.id})
            })
        }
    })
})

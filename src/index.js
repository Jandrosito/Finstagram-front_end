document.addEventListener("DOMContentLoaded", function() {
    const baseURL = "http://localhost:3000/"
    const usersURL = "http://localhost:3000/users"

    let mainDiv = document.getElementById("main")
    let navBar = document.getElementById("the-nav-bar")
    let loginDiv = document.createElement("div")
    let signupDiv = document.createElement("div")
    let profileViewBtn = document.getElementById("profileNavBtn")
    let usersListBtn = document.getElementById("usersNavBtn")
    let logoutNavBtn = document.getElementById("logoutNavBtn")
    let usersIndexDiv = document.getElementById("users-index")
    let userProfile = document.createElement("div")
    let currentUser = ""

    usersIndexDiv.classList.add("hidden")
    userProfile.classList.add("hidden")
    signupDiv.classList.add("hidden")
    navBar.classList.add("hidden")
    mainDiv.appendChild(userProfile)
    mainDiv.appendChild(loginDiv)
    mainDiv.appendChild(signupDiv)

    loginCreate()
    function loginCreate() {
        loginDiv.innerHTML = ""
        userProfile.classList.add("hidden")
        loginDiv.classList.remove("hidden")

        let loginFormDiv = document.createElement("div")
        let loginBanner = document.createElement("h1")
        let signupLinkP = document.createElement("p")

        loginFormDiv.id = "login-form-div"
        loginFormDiv.innerHTML = `
<div class="page">
<div class="container">
  <div class="left">
    <div class="login">Login</div>
    <div class="eula">By logging in you agree to the ridiculously long terms that you didn't bother to read</div>
  </div>
  <div class="right">
    <svg viewBox="0 0 320 300">
      <defs>
        <linearGradient
                        inkscape:collect="always"
                        id="linearGradient"
                        x1="13"
                        y1="193.49992"
                        x2="307"
                        y2="193.49992"
                        gradientUnits="userSpaceOnUse">
          <stop
                style="stop-color:#ff00ff;"
                offset="0"
                id="stop876" />
          <stop
                style="stop-color:#ff0000;"
                offset="1"
                id="stop878" />
        </linearGradient>
      </defs>
      <path d="m 40,120.00016 239.99984,-3.2e-4 c 0,0 24.99263,0.79932 25.00016,35.00016 0.008,34.20084 -25.00016,35 -25.00016,35 h -239.99984 c 0,-0.0205 -25,4.01348 -25,38.5 0,34.48652 25,38.5 25,38.5 h 215 c 0,0 20,-0.99604 20,-25 0,-24.00396 -20,-25 -20,-25 h -190 c 0,0 -20,1.71033 -20,25 0,24.00396 20,25 20,25 h 168.57143" />
    </svg>
    <div class="form">
      <label for="username">Username</label>
      <input type="username" id="login-Input" class="login-input">
      <input type="submit" class="login-btn" value="Login">
    </div>
  </div>
</div>
</div>
      `
         signupLinkP.innerText = "Sign Up"
         signupLinkP.className = "signup-link-p"
         signupLinkP.id = "signup-link"
         loginBanner.innerText = "Welcome!"
         loginBanner.className = "login-banner"
        loginDiv.appendChild(loginBanner)
        loginDiv.appendChild(loginFormDiv)
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

    function profileEditCreate(user_id) {
        console.log(user_id)
        let aboutMeDiv = document.getElementById("about-me-div")
        let profileEditForm = document.createElement("form")
        let nameEditField = document.createElement("input")
        let passwordEditField = document.createElement("input")
        let photoEditField = document.createElement("input")
        let aboutMeEditField = document.createElement("input")
        let profileEditSubmit = document.createElement("input")

        nameEditField.placeholder = "Name:"
        nameEditField.id = "name-edit-field"
        passwordEditField.placeholder = "Password:"
        passwordEditField.id = "password-edit-field"
        photoEditField.placeholder = "Photo Url:"
        photoEditField.id = "photo-edit-field"
        aboutMeEditField.placeholder = "Description:"
        aboutMeEditField.id = "about-me-edit-field"
        profileEditSubmit.type = "submit"
        profileEditSubmit.value = "Submit"
        profileEditSubmit.id = "profile-edit-submit"
        profileEditSubmit.dataset.userid = user_id
        
        profileEditForm.appendChild(nameEditField)
        profileEditForm.appendChild(passwordEditField)
        profileEditForm.appendChild(photoEditField)
        profileEditForm.appendChild(aboutMeEditField)
        profileEditForm.appendChild(profileEditSubmit)
        aboutMeDiv.prepend(profileEditForm)
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
        userDiv.id = "user-div"
        userUl.id = "user-ul"
        userLi.className = "user-li"
        userDiv.className = "user-div"
        userLi.dataset.id = user.id
        userUl.className = "user-ul"
        userLi.className = "user-li"
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
        let profileEditBtn = document.createElement("button")

        profileEditBtn.innerText = "Edit Profile"
        profileEditBtn.dataset.userid = userInfo.id
        profileEditBtn.id = "profile-edit-btn"
        userDeleteBtn.id = "user-delete-btn"
        userDeleteBtn.dataset.userid = userInfo.id
        userDeleteBtn.innerText = "Delete Profile"
        pictureFormDiv.id = "picture-form-div"
        pictureForm.appendChild(urlField)
        pictureForm.appendChild(captionField)
        pictureForm.appendChild(pictureSubmitBtn)
        urlField.id = "url-field"
        urlField.placeholder = "Image url:"
        captionField.id = "caption-field"
        captionField.placeholder = "Caption:"
        pictureSubmitBtn.id = "picture-submit-btn"
        pictureSubmitBtn.dataset.userid = userInfo.id
        pictureSubmitBtn.type = "submit"
        pictureSubmitBtn.value = "Submit Photo"
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
        aboutMeDiv.id = "about-me-div"
        aboutMeP.className = "about-me-p"
        aboutMeDiv.appendChild(aboutMeP)
        
         if (userInfo.comments.length < 1) {
            let noPhotoText = document.createElement("h3")
            if (currentUser.id === userInfo.id) {
                noPhotoText.innerText = "You have not posted any photos yet"
            } else {
                noPhotoText.innerText = "This user has not posted any photos yet"
            }
                imgBody.appendChild(noPhotoText)
        } else if (userInfo.photos) {
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
                let likeDiv = document.createElement("div")
                
                if (photo.caption) {
                    let caption = document.createElement("p") 
                    caption.innerText = photo.caption 
                    tileContent.appendChild(caption)
                }

                gridImage.className = "grid-image"
                photoDeleteBtn.innerText = "Delete Photo"
                photoDeleteBtn.dataset.photoid = photo.id
                photoDeleteBtn.className = "photo-delete-btn"
                descriptionField.attributes = ("type", "text")
                descriptionField.name = "description"
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
                commentUl.className = "comment-ul"
                likeCounter.dataset.id = photo.id
                likeCounter.className = "like-counter"
                likeSpan.className = "likes"
                likeBtn.innerText = "Like"
                likeBtn.className = "like-btn"
                likeBtn.dataset.userid = userInfo.id
                likeDiv.id = "like-div"

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

                if (photo.comments && photo.comments.length) {
                    photo.comments.forEach(function(comment) {
                        let commentLi = document.createElement("li")
                        let commentDeleteBtn = document.createElement("button")
                        commentDeleteBtn.className = "comment-delete-btn"
                        commentDeleteBtn.innerText = "𝙓"
                        commentDeleteBtn.dataset.photoid = photo.id
                        commentDeleteBtn.dataset.commentid = comment.id
                        commentLi.className = "comment-li"
                        commentLi.dataset.id = comment.id
                        commentLi.innerText = comment.description
                        if (currentUser.id === comment.user_id) {
                        commentLi.appendChild(commentDeleteBtn)
                        }
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
                likeDiv.appendChild(likeBtn)
                likeDiv.appendChild(likeCounter)
                tileContent.appendChild(likeDiv)
                tileContent.appendChild(photoDeleteBtn)
                tileContent.appendChild(commentUl)
                tileContent.appendChild(commentForm)
                imgBody.appendChild(tileContent)
            })
        }
        userProfile.appendChild(nameHead)
        userProfile.appendChild(displayPicDiv)
        if (currentUser.id === userInfo.id) {
        userProfile.appendChild(userDeleteBtn)
        userProfile.appendChild(profileEditBtn)
        }
        userProfile.appendChild(aboutMeDiv)

        if (currentUser.id === userInfo.id) {
        pictureFormDiv.appendChild(pictureForm)
        }
        imgBody.appendChild(pictureFormDiv)
        userProfile.appendChild(imgBody)
    }
    
    profileViewBtn.addEventListener("click", function(e) {
        userProfile.classList.remove("hidden")
        usersIndexDiv.classList.add("hidden")
        loginDiv.classList.add("hidden")
        signupDiv.classList.add("hidden")
        renderUser(currentUser.id)
    })

    usersListBtn.addEventListener("click", function(e) {
        userProfile.classList.add("hidden")
        usersIndexDiv.classList.remove("hidden")
        loginDiv.classList.add("hidden")
        signupDiv.classList.add("hidden")
        getUsers()
    })

    logoutNavBtn.addEventListener("click", function(e) {
        userProfile.classList.add("hidden")
        usersIndexDiv.classList.add("hidden")
        loginDiv.classList.remove("hidden")
        signupDiv.classList.add("hidden")
        navBar.classList.add("hidden")
    })

    loginDiv.addEventListener("click", function(e) {
        if (e.target.className === "login-btn") {
            let loginInput = document.getElementById("login-Input")
            fetch("http://localhost:3000/users")
            .then(resp => resp.json())
            .then(users => {
               
                users.forEach(function(user) {
                    if (user.username === loginInput.value) {
                        currentUser = user
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
        signupDiv.classList.add("hidden")
        e.preventDefault()
        if (e.target.lastChild.id === "signup-submit-btn") {
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
                currentUser = newUser
                renderUser(newUser.id)
                e.target.reset();
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
                    user_id:  currentUser.id,
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
                renderUser(e.target.lastChild.dataset.userid)
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
        if (e.target.id === "profile-edit-btn") {
            let editBtn = document.getElementById("profile-edit-btn")
            editBtn.classList.add("hidden")
            profileEditCreate(e.target.dataset.userid)
        }
        if (e.target.id === "profile-edit-submit") {
            let usernameData = document.getElementById("name-edit-field")
            let passwordData = document.getElementById("password-edit-field")
            let photoData = document.getElementById("photo-edit-field")
            let aboutMeData = document.getElementById("about-me-edit-field")
            console.log(usernameData.value)
            console.log(e.target.dataset.userid)
            fetch(`http://localhost:3000/users/${e.target.dataset.userid}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json"
                },
                body: JSON.stringify({
                    username: usernameData.value,
                    password: passwordData.value,
                    display_pic: photoData.value,
                    about_me: aboutMeData.value,
                })
            })
            .then(resp => resp.json())
            .then(editedUser => {
                console.log(editedUser)
                console.log(editedUser.id)
                renderUser(editedUser.id)
            })
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




     var current = null;
     loginDiv.addEventListener('focus', function(e) {
         if (e.target.id === "login-input") {
      if (current) current.pause();
      current = anime({
        targets: 'path',
        strokeDashoffset: {
          value: 0,
          duration: 700,
          easing: 'easeOutQuart'
        },
        strokeDasharray: {
          value: '240 1386',
          duration: 700,
          easing: 'easeOutQuart'
        }
      });
    }
    });
    loginDiv.addEventListener('focus', function(e) {
        if (e.target.className === "login-btn") {
      if (current) current.pause();
      current = anime({
        targets: 'path',
        strokeDashoffset: {
          value: -730,
          duration: 700,
          easing: 'easeOutQuart'
        },
        strokeDasharray: {
          value: '530 1386',
          duration: 700,
          easing: 'easeOutQuart'
        }
      });
    }
    });




})

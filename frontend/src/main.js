// importing named exports we use brackets
import { createPostTile, uploadImage } from './helpers.js';

// when importing 'default' exports, use below syntax
import API from './api.js';

const api  = new API();

/**
*   Upload image
*   to upload image, we must first add the caption in the text box beside the post button
*   then we upload the .png we want to post
*/
const input = document.querySelector('input[type="file"]');
input.addEventListener('change',(e)=> {
    const caption = document.getElementById('caption');
    const name = document.getElementById('name');
    api.getMe()
        .then(response =>response.json())
        .then(profile => {
            uploadImage(e, caption.value, profile.name);
            //sendPost(caption.value, e);
            const reader = new FileReader();

            console.log(e.target.files[0]);

            reader.onloadend = function() {
                console.log('RESULT', reader.result);
                const payload = {
                    'description_text': caption.value,
                    'src': reader.result.replace('data:image/png;base64,','')
                }
                console.log(reader.result);
                console.log(payload);

                const token = localStorage.getItem('AUTH_KEY');
                console.log(token);
                fetch('http://localhost:5000/post', {
                    headers: {
                        'Authorization' : `Token ${token}`,
                        'Accept': 'application/json',
                        'Content-Type' : 'application/json'
                    },
                    method: 'POST',
                    body: JSON.stringify({
                        'description_text': caption.value,
                        'src': reader.result
                    })

                })
                .then(response=>{
                    console.log(response);
                })
                const file = document.getElementById('file');
                file.value = '';

                const desc = document.getElementById('caption');
                desc.value = '';
            }
            reader.readAsDataURL(e.target.files[0]);

        });
});

/**
*   Hides the large feed
*/
const largefeed = document.getElementById('large-feed');
largefeed.classList.toggle('hide');

/**
*   Login
*   to login, user must specify username and password, in the provided field
*   and press the login button
*/
const login = document.getElementById('login');
login.addEventListener('click',(event)=> {

    const username = document.getElementById('username');
    const password = document.getElementById('password');

    validateLogin(username.value, password.value);
});

/**
*   This adds the Welcome <user_name> to the header and
*   hides it before logging in
*/
const name = document.createElement('h4');
name.setAttribute('id', 'name');
name.setAttribute('class','hide');

const status = document.createElement('h4');
status.setAttribute('id', 'status');
status.setAttribute('class','hide');

const header = document.getElementsByTagName('header');
header[0].appendChild(name);
header[0].appendChild(status);



/**
*   Sign Up
*   If the sign up button is pressed, a new text field will come out
*   fill all the user details onthe provided field and press create to sign up
*   After signing up, the user will be automatically logged in
*/
const signup = document.getElementById('signup');
signup.addEventListener('click',()=>{
    const register = document.getElementById('register_form');
    register.classList.toggle('hide');
    const login = document.getElementById('login_form');
    login.classList.toggle('hide');
})

/**
*   Create
*   Registers the user to the database and logs in the user
*/
const create = document.getElementById('create');
create.addEventListener('click',()=>{
    const newusername = document.getElementById('newusername');
    const newname = document.getElementById('newname');
    const newemail = document.getElementById('newemail');
    const newpassword = document.getElementById('newpassword');

    registerUser(newusername.value, newname.value, newemail.value, newpassword.value);
});

/**
*   Log out
*   Deletes the AUTH_KEY(token) from local storage, and hides everything
*   from the menu
*/
const logout = document.getElementById('logout');
logout.addEventListener('click',()=>{
    logout.classList.toggle('hide');
    const form = document.getElementById('login_form');
    const username = document.getElementById('username');
    const password = document.getElementById('password');
    const name = document.getElementById('name');

    username.value='';
    password.value='';
    name.innerHTML='';

    form.classList.toggle('hide');
    name.classList.toggle('hide');
    localStorage.removeItem('AUTH_KEY');
    console.log('Authentication token deleted, logging out')

    const caption = document.getElementById('caption');
    const file = document.getElementById('file');
    const largefeed = document.getElementById('large-feed');
    const nav = document.getElementById('nav');


    if(!caption.classList.contains('hide')) {
        caption.classList.toggle('hide');
    }

    if(!file.classList.contains('hide')) {
        file.classList.toggle('hide');
    }

    if(!nav.classList.contains('hide')) {
        nav.classList.toggle('hide');
    }

    const user_profile = document.getElementById('user_profile');
    const label = document.getElementById('label');
    if(label!==undefined) {
        user_profile.removeChild(label);
    }
    if(!user_profile.classList.contains('hide')) {
        user_profile.classList.toggle('hide');
    }
    if(!largefeed.classList.contains('hide')) {
        largefeed.classList.toggle('hide');
    }


})

/**
*   Back
*   if pressed, user will go back from resitration page to login page
*/
const back = document.getElementById('back');
back.addEventListener('click',()=>{
    const login_form = document.getElementById('login_form');
    const register_form = document.getElementById('register_form');
    login_form.classList.toggle('hide');
    register_form.classList.toggle('hide');
});


/**
*   Display User Profile
*   This will display the user profile
*/
const profile = document.getElementById('profile');
profile.addEventListener('click',()=>{
    profile.classList.toggle('hide');

    const user_profile = document.getElementById('user_profile');
    user_profile.classList.toggle('hide');


    const tofeed = document.getElementById('tofeed');
    tofeed.classList.toggle('hide');

    const largefeed = document.getElementById('large-feed');
    largefeed.classList.toggle('hide');


});

/**
*   Hide User Profile/ Back to feed
*   This will hide the user profile
*/
const tofeed = document.getElementById('tofeed');
tofeed.addEventListener('click',()=>{
    tofeed.classList.toggle('hide');

    const profile = document.getElementById('profile');
    profile.classList.toggle('hide');

    const largefeed = document.getElementById('large-feed');

    largefeed.classList.toggle('hide');
    user_profile.classList.toggle('hide');

});

/**
*   Display User Profile
*   This will display the user profile

const post = document.getElementById('post');
post.addEventListener('click', (e)=>{
    const caption = document.getElementById('caption');
    //const file  document.getElemetById('')
    console.log(caption.value);

})
*/

/**
*   Login helper function
*   send API request and process the response
*   will alert differently when wrong input is passed
*/
function validateLogin(username, password) {
    api.sendLogin(username, password)
        .then((response) => {
            if(response.status===200) {
                console.log('Succesfully logged in');
                const nav = document.getElementById('nav');
                const form = document.getElementById('login_form');
                const name = document.getElementById('name');
                const logout = document.getElementById('logout');
                const status = document.getElementById('status');

                nav.classList.toggle('hide');
                form.classList.toggle('hide');
                logout.classList.toggle('hide');
                name.classList.toggle('hide');
                status.classList.toggle('hide');

            } else if (response.status == 403) {
                window.alert('Missing/Invalid password');
            } else {
                window.alert('Missing username');
            }
            return response.json();
        })
        .then((json) => {
            console.log(json.token);
            localStorage.setItem('AUTH_KEY', json.token)

            api.getMe()
                .then(response =>response.json())
                .then(profile => {
                    name.innerHTML= `Welcome ${profile.name}`;
                    //status.innerHTML= `Followers ${profile.followed_num} Following ${profile.following.length}`
                    const user_profile = document.getElementById('user_profile');

                    const label = document.createElement('h3');
                    label.setAttribute('id', 'label');
                    label.innerHTML = `User Profile
                    \<br>Name: ${profile.name}
                    \<br>User Name: ${profile.username}
                    \<br>Email: ${profile.email}
                    \<br>Following: ${profile.following.length}
                    \<br>Followers: ${profile.followed_num}`;
                    user_profile.appendChild(label);

                    const nav = document.getElementById('nav');
                    const caption = document.getElementById('caption');
                    const file = document.getElementById('file');
                    if(caption.classList.contains('hide')) {
                        caption.classList.toggle('hide');
                    }
                    if(nav.classList.contains('hide')) {
                        nav.classList.toggle('hide');
                    }

                    if(file.classList.contains('hide')) {
                        file.classList.toggle('hide');
                    }
                });


            displayFeed();
        })
        .catch(err=>console.log(err));



}

/**
*   Sign up helperf function
*   send API request and process the response
*/
function registerUser(newusername, newname, newemail, newpassword) {
    api.sendSignUp(newusername, newname, newemail, newpassword)
        .then(response=> {
            if(response.status == 200) {
                console.log('signed up successfully');
            }
            return response.json();
        })
        .then(json=> {
            console.log(json.token);
            localStorage.setItem('AUTH_KEY', json.token)
            const form = document.getElementById('register_form');
            const name = document.getElementById('name');
            const logout = document.getElementById('logout');
            const status = document.getElementById('status');

            form.classList.toggle('hide');
            logout.classList.toggle('hide');
            name.classList.toggle('hide');
            status.classList.toggle('hide');

            api.getMe()
                .then(response =>response.json())
                .then(profile => {
                    name.innerHTML= `Welcome ${profile.name}`;
                    status.innerHTML= `Followers ${profile.followed_num} Following ${profile.following.length}`
                });
            displayFeed();
        })


}
/**
*   Display Feed
*   send API request and process the response
*   creates sections of post in the main page(feed) and display them
*/
function displayFeed() {
    api.getFeed()
        .then(response => response.json())
        .then(json => {
            json.posts.reduce((parent, post) => {

                parent.appendChild(createPostTile(post));

                return parent;

            }, document.getElementById('large-feed'))
        })
        .then(()=>{
            const likeButton = document.getElementsByClassName('btn-like');
            const comment = document.getElementsByClassName('new_comment');
            const post = document.getElementsByTagName('section');
            console.log(post);
            for(let i = 0; i<likeButton.length; i++) {
                likeButton[i].addEventListener('click', (event)=>{
                    console.log(`like ${post[i].id}`);
                    api.sendLike(post[i].id);
                })
            }

        });
    largefeed.classList.toggle('hide');

}


/**
*   Follow
*   to follow another user, user must specify username of the to be followed
*/
const follow = document.getElementById('follow');
follow.addEventListener('click',(event)=> {

    const followed = document.getElementById('followed');

    api.sendFollow(followed.value)
        .then(response=>response.json())
        .then(json=> {
            console.log(json);
            if(json.status !== 200) {
                alert('Follow failed');
            }
        })

});

/**
*   Unfollow
*   to follow another user, user must specify username of the followed
*/
const unfollow = document.getElementById('unfollow');
unfollow.addEventListener('click',(event)=> {

    const followed = document.getElementById('followed');

    api.sendUnFollow(followed.value)
        .then(response=>response.json())
        .then(json=> {
            console.log(json);
        })

});

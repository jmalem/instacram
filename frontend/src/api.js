// change this when you integrate with the real API, or when u start using the dev server
const API_URL = "http://127.0.0.1:5000"

const getJSON = (path, options) =>
    fetch(path, options)
        .then(res =>{
            return res
         })
        .catch(err => console.warn(`API_ERROR: ${err.message}`));

/**
 * This is a sample class API which you may base your code on.
 * You don't have to do this as a class.
 */
export default class API {
    /**
     * Defaults to teh API URL
     * @param {string} url
     */
    constructor(url = API_URL) {
        this.url = url;
    }

    makeAPIRequest(path, option) {

        return getJSON(`${this.url}/${path}`, option);
    }



    /**
     * @returns feed array in json format
     */
    getFeed() {
        const token = localStorage.getItem('AUTH_KEY');
        console.log(`token is ${token}`);
        const packet = {
            headers: {
                'Authorization': `Token ${token}`,
                'accept': 'application/json'
            },
            method: 'GET'
        }
        return this.makeAPIRequest('user/feed', packet);
    }

    /**
     * @returns auth'd user in json format
     */
    getMe() {
        const token = localStorage.getItem('AUTH_KEY');
        console.log(`token is ${token}`);
        const packet = {
            headers: {
                'Authorization': `Token ${token}`,
                'accept': 'application/json'
            },
            method: 'GET'
        }
        return this.makeAPIRequest('user/', packet);
    }

    /**
    *  @returns AUTH_KEY(token)
    */
    sendLogin(username, password) {
        const headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        };
        const data = {
            'username': username,
            'password': password
        };
        const segment = {
            headers,
            method:  'POST',
            body: JSON.stringify(data)
        };
        return this.makeAPIRequest('auth/login', segment);
    }
    /**
    *  @returns AUTH_KEY(token)
    */
    sendSignUp(newusername, newname, newemail, newpassword) {
        const headers = {
            'Content-Type': 'application/json',
            'accept': 'application/json'
        };
        const data = {
            'username': newusername,
            'password': newpassword,
            'email': newemail,
            'name': newname
        };
        const segment = {
            headers,
            method: 'POST',
            body: JSON.stringify(data)
        };
        return this.makeAPIRequest('auth/signup', segment);
    }

    /**
    *  @returns status
    */
    sendLike(id) {
        const token = localStorage.getItem('AUTH_KEY');
        console.log(`token is ${token}`);
        const packet = {
            headers: {
                'Authorization': `Token ${token}`,
                'accept': 'application/json',
            },
            method: 'PUT'
        }

        return this.makeAPIRequest(`post/like?id=${id}`, packet);
    }


    /**
    *   @returns status
    */
    sendFollow(username) {
        const token = localStorage.getItem('AUTH_KEY');
        console.log(`token is ${token}`);
        const packet = {
            headers: {
                'Authorization': `Token ${token}`,
                'accept': 'application/json',
            },
            method: 'PUT'
        }

        return this.makeAPIRequest(`user/follow?username=${username}`, packet);
    }

    /**
    *   @returns status
    */
    sendUnFollow(username) {
        const token = localStorage.getItem('AUTH_KEY');
        console.log(`token is ${token}`);
        const packet = {
            headers: {
                'Authorization': `Token ${token}`,
                'accept': 'application/json',
            },
            method: 'PUT'
        }

        return this.makeAPIRequest(`user/unfollow?username=${username}`, packet);
    }
/*
    sendPost(description, e) {
        const image = getImage(e, description);
        const token = localStorage.getItem('AUTH_KEY');
        console.log(image);
        console.log('sini');
        const body = {
            'description_text': description,
            'src': image
        }
        const packet = {
            headers: {
                'Authorization': `Token ${token}`,
                'accept': 'application/json',
            },
            method: 'POST',
            body: JSON.stringify(body)
        }
        return this.makeAPIRequest('post/', packet);
    }*/
}

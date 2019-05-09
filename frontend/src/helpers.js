/* returns an empty array of size max */
export const range = (max) => Array(max).fill(null);

/* returns a randomInteger */
export const randomInteger = (max = 1) => Math.floor(Math.random()*max);

/* returns a randomHexString */
const randomHex = () => randomInteger(256).toString(16);

/* returns a randomColor */
export const randomColor = () => '#'+range(3).map(randomHex).join('');

/**
 * You don't have to use this but it may or may not simplify element creation
 *
 * @param {string}  tag     The HTML element desired
 * @param {any}     data    Any textContent, data associated with the element
 * @param {object}  options Any further HTML attributes specified
 */
export function createElement(tag, data, options = {}) {
    const el = document.createElement(tag);
    el.innerHTML = data;

    // Sets the attributes in the options object to the element
    return Object.entries(options).reduce(
        (element, [field, value]) => {
            element.setAttribute(field, value);
            return element;
        }, el);
}

/**
 * Given a post, return a tile with the relevant data
 * @param   {object}        post
 * @returns {HTMLElement}
 */
export function createPostTile(post) {
    const section = createElement('section', null, { class: 'post', id: post.id });

    section.appendChild(createElement('h2', post.meta.author, { class: 'post-title' }));

    //section.appendChild(createElement('img', null,
    //    { src: post.src, alt: post.meta.description_text, class: 'post-image' }));

    // The correct way
    section.appendChild(createElement('img', null,
        { src: `data:image/jpg;base64,${post.src}`, alt: post.meta.description_text, class: 'post-image' }));


    section.appendChild(createElement('p', `likes ${post.meta.likes.length}`, { class: 'post-like' }));
    section.appendChild(createElement('button', 'like', { class: 'btn-like' }));

    const date =Date(post.meta.published.toString());
    section.appendChild(createElement('p', `<b>${post.meta.author}</b> ${post.meta.description_text} <br><small>Posted at ${date}</small>`, { class: 'post-detail' }));

    for(const comment of post.comments) {
        section.appendChild(createElement('p', `<b>${comment.author}</b> ${comment.comment} <sub>${Date(comment.published.toString())}</sub>`, { class: 'post-detail' }));
    }

    const newCommentBox = createElement('input', null, { type: `text`, class: 'post-detail new-comment', placeholder:'Add comment here...' });
    const btn = createElement('button', 'Add comment', { class: 'btn btn-comment'});
    section.appendChild(newCommentBox);
    section.appendChild(btn);
    // my added function
    //section.appendChild(createImage(post.src));
    return section;
}


// Given an input element of type=file, grab the data uploaded for use
export function uploadImage(event, desc, name) {
    const [ file ] = event.target.files;
    //console.log(event.target.files);
    const validFileTypes = [ 'image/jpeg', 'image/png', 'image/jpg' ]
    const valid = validFileTypes.find(type => type === file.type);
    // bad data, let's walk away
    if (!valid)
        return false;

    // if we get here we have a valid image
    const reader = new FileReader();

    reader.onload = (e) => {
        // do something with the data result

        const section = createElement('section', null, { class: 'post', id:'#' });
        section.appendChild(createElement('h2', name, { class: 'post-title' }));



        const dataURL = e.target.result;
        const image = createElement('img', null, { src: dataURL, alt: desc, class: 'post-image' });
        section.appendChild(image);
        section.appendChild(createElement('p', `likes ${0}`, { class: 'post-like' }));
        section.appendChild(createElement('button', 'like', { class: 'btn-like' }));

        const date = Date(Date.now().toString());
        section.appendChild(createElement('p', `<b>${name}</b> ${desc} <br><small>Posted at ${date}</small>`, { class: 'post-detail' }));


        const newCommentBox = createElement('input', null, { type: `text`, class: 'post-detail new-comment', placeholder:'Add comment here...' });
        const btn = createElement('button', 'Add comment', { class: 'btn btn-comment'});

        section.appendChild(newCommentBox);
        section.appendChild(btn);
        const largefeed = document.getElementById('large-feed');
        largefeed.appendChild(section);
    };

    // this returns a base64 image
    reader.readAsDataURL(file);
}



/*
    Reminder about localStorage
    window.localStorage.setItem('AUTH_KEY', someKey);
    window.localStorage.getItem('AUTH_KEY');
    localStorage.clear()
*/
export function checkStore(key) {
    if (window.localStorage)
        return window.localStorage.getItem(key)
    else
        return null

}

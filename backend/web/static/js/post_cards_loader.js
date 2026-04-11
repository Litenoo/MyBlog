function getCookie(name) {
    let cookieValue = null;

    if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';');

        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();

            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }

    return cookieValue;
}

const csrftoken = getCookie('csrftoken');

let searchTimer = null;


let page = 1;
let loading = false;
let query = "";

const container = document.getElementById("post_container");
const input = document.getElementById("search_input");

onInputChangeDebounce(input, (value) => {
    console.log(`searchbar input : ${value}`);
    page = 1;
    query = value;
    posts_list = [];
    container.innerHTML="";
    loadPosts();
})

async function onInputChangeDebounce(input, callback, delay = 700) {
    let timeout_id = null;

    input.addEventListener("input", () => {
        clearTimeout(timeout_id);

        timeout_id = setTimeout(() => {
            callback(input.value)
        }, delay);
    })
}


async function loadPosts() {

    if (loading) return;
    loading = true;

    const response = await fetch(`/api/posts/?page=${page}`, {
        method: "POST",
        credentials: "same-origin",
        headers: {
            "Content-Type": "application/json",
            "X-CSRFToken": csrftoken
        },
        body: JSON.stringify({
            query: query,
        })
    });

    const data = await response.json();

    renderPosts(data.results);

    page += 1;
    loading = false;
}

function renderPosts(posts) {

    posts.forEach(post => {

        const tile = document.createElement("a");
        tile.href = `/article/${post.slug}`;
        tile.classList.add("post_tile");

        const date = new Date(post.created_at);
        let formatted = "";

        if (!isNaN(date.getTime())) {
            formatted = date.toISOString().split("T")[0];
        }

        const description = post.content.slice(0, 130);

        const tags = post.tags;
        let tags_display = "";

        tags.forEach(tag => {
            tags_display += `<a class="tag">${tag.title}</a>`;
        });

        tile.innerHTML = `
            <h4>${post.title}</h4>
            <div class="tags_container">${tags_display}</div>
            <div>${description}...</div>
            <div class="small_text">${formatted}</div>
        `;

        container.appendChild(tile);
    });

    console.log("posts have been rendered !");
}

loadPosts();
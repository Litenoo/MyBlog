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

let page = 1;
let loading = false;
let query = "";

async function loadPosts() {

    const response = await fetch("/api/posts/", {
        method: "POST",
        credentials: "same-origin",
        headers: {
            "Content-Type": "application/json",
            "X-CSRFToken": csrftoken
        },
        body: JSON.stringify({
            query: "",
            page: page
        })
    });

    const data = await response.json();
    renderPosts(data.results);
}

function renderPosts(posts) {

    const container = document.getElementById("post_container");

    posts.forEach(post => {

        const tile = document.createElement("a");
        tile.href = `/article/${post.slug}`;
        tile.classList.add("post_tile");

        const date = new Date(post.created_at);
        const formatted = date.toISOString().split("T")[0];

        const description = post.content.slice(0, 130)


        tile.innerHTML = `
            <h4>${post.title}</h4>
            <div>${description}...</div>
            <div class="small_text">${formatted}</div>
        `;

        container.appendChild(tile);
    });

    console.log("posts have been rendered !")
}

window.addEventListener("scroll", () => {

    if (
        window.innerHeight + window.scrollY >=
        document.body.offsetHeight - 300
    ) {
        loadPosts();
    }

});

loadPosts();
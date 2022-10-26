const editFormHandler = async function(event) {
    event.preventDefault();

    const titleEl = document.getElementById('post-title');
    const bodyEl = document.getElementById('post-body');
    const postId = document.getElementById('post-id')

    const response = await fetch("/api/post/" + postId.value, {
        method: "put", 
        body: JSON.stringify({
            title: titleEl.value,
            body: bodyEl.value
        }),
        headers: { "Content-Type": "application/json" }
    });
    if(!response.ok) {
        throw new Error("HTTP error: " + response.status)
    }
    document.location.replace("/dashboard");
}

document.querySelector("#edit-post-form").addEventListener("submit", editFormHandler);
const deletePostHandler = async function(event) {
    event.preventDefault();
    
    const postId = document.getElementById('post-id')

    const response = await fetch("/api/post/" + postId.value, {
        method: "delete"
    });
    
    if(!response.ok) {
        throw new Error("HTTP error: " + response.status)
    }

    document.location.replace("/dashboard");
}

document.querySelector("#delete-btn").addEventListener("click", deletePostHandler);
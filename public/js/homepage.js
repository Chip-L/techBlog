const acc = document.getElementsByClassName("accordion");
const commentForms = document.getElementsByTagName("form");

for (let i = 0; i < commentForms.length; i++) {
  commentForms[i].addEventListener("submit", addCommentHandler);
}

for (let i = 0; i < acc.length; i++) {
  acc[i].addEventListener("click", function () {
    this.classList.toggle("active");
    var comments = this.nextElementSibling;
    if (comments.style.maxHeight) {
      comments.style.maxHeight = null;
    } else {
      comments.style.maxHeight = comments.scrollHeight + "px";
    }
  });
}

async function addCommentHandler(event) {
  event.preventDefault();

  const curPath = window.location.pathname;
  const id = event.target.id;

  const comment = document.querySelector("#comment" + id).value;

  if (comment) {
    const response = await fetch("/api/posts/addComment", {
      method: "POST",
      body: JSON.stringify({ post_id: id, comment }),
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      document.location.replace(curPath);
    } else {
      alert("Failed to add comment");
    }
  }
}

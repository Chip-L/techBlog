const formSubmit = document.querySelector("form");
formSubmit.addEventListener("submit", submitEventHandler);

const deleteBtn = document.querySelector("#delete");
if (deleteBtn) {
  deleteBtn.addEventListener("click", deleteEventHandler);
}

async function submitEventHandler(event) {
  event.preventDefault();

  const body = {
    title: document.querySelector("#title").value,
    content: document.querySelector("#content").value,
  };

  if (formSubmit.id) {
    body.id = formSubmit.id;
  }

  if (body.title && body.content) {
    const response = await fetch("/api/posts/addPost", {
      method: "POST",
      body: JSON.stringify(body),
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      document.location.replace("/dashboard");
    } else {
      alert("Failed to add/modify post");
    }
  }
}

async function deleteEventHandler(event) {
  console.log("I said delete!");
  const response = await fetch("/api/posts/" + formSubmit.id, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
  });

  if (response.ok) {
    document.location.replace("/dashboard");
  } else {
    alert("Failed to delete post");
  }
}

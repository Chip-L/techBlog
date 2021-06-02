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

  if (formSubmit.dataset.id) {
    body.id = formSubmit.dataset.id;
  }

  console.log(body);

  if (title && content) {
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

function deleteEventHandler(eventt) {
  console.log("I said delete!");
}

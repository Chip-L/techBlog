async function createFormHandler(event) {
  event.preventDefault();

  const username = document.querySelector("#username").value;
  const password = document.querySelector("#password").value;

  if (username && password) {
    const response = await fetch("/api/users/", {
      method: "POST",
      body: JSON.stringify({ name: username, password }),
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      document.location.replace("/");
    } else {
      alert("Failed to log in");
    }
  }
}

document
  .querySelector("#sign-up-form")
  .addEventListener("submit", createFormHandler);

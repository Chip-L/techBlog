document.querySelector("#addPost").addEventListener("click", () => {
  document.location.replace("/createPost");
});

const editBtns = document.querySelectorAll(".editMe");
for (let i = 0; i < editBtns.length; i++) {
  editBtns[i].addEventListener("click", (event) => {
    document.location.replace("/createPost/" + event.currentTarget.id);
  });
}

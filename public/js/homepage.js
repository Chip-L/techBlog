const acc = document.getElementsByClassName("accordion");

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

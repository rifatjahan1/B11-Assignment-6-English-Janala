
  document.querySelectorAll(".social-icon").forEach(icon => {
    icon.addEventListener("click", function() {
      const url = this.getAttribute("data-url");
      window.open(url, "_blank");
    });
  });



  





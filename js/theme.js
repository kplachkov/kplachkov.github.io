function themeChange() {
  const body = document.body;
  const button = document.getElementById("theme");
  if (localStorage.getItem("darkmode") === "true") {
    body.classList.remove("darkmode");
    localStorage.setItem("darkmode", false);
    button.innerHTML = "dark-mode";
    document.getElementById("theme-color").content = "#FFFFFF";
  } else {
    body.classList.add("darkmode");
    localStorage.setItem("darkmode", true);
    button.innerHTML = "light-mode";
    document.getElementById("theme-color").content = "#000000";
  }
}

function onLoad() {
  const body = document.body;
  const button = document.getElementById("theme");
  if (localStorage.getItem("darkmode") === "true") {
    body.classList.add("darkmode");
    button.innerHTML = "light-mode";
  }
}

onLoad();

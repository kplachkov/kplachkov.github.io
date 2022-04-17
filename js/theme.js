const darkModeStorageKey = "dark-mode";
const rootDarkThemeClass = "dark-theme";

function switchTheme() {
  const buttonThemeSwitcher = document.getElementById("button-theme-switcher");
  const themeColor = document.getElementById("theme-color");

  if (localStorage.getItem(darkModeStorageKey) === "true") {
    document.querySelector(":root").classList.remove(rootDarkThemeClass);

    buttonThemeSwitcher.innerHTML = "dark-mode";
    themeColor.content = "#F9F9F9";

    localStorage.setItem(darkModeStorageKey, "false");
  } else {
    document.querySelector(":root").classList.add(rootDarkThemeClass);

    buttonThemeSwitcher.innerHTML = "light-mode";
    themeColor.content = "#282828";

    localStorage.setItem(darkModeStorageKey, "true");
  }
}

function onLoad() {
  const buttonThemeSwitcher = document.getElementById("button-theme-switcher");
  const themeColor = document.getElementById("theme-color");

  if (localStorage.getItem(darkModeStorageKey) === "true") {
    document.querySelector(":root").classList.add(rootDarkThemeClass);

    buttonThemeSwitcher.innerHTML = "light-mode";
    themeColor.content = "#282828";
  }
}

onLoad();

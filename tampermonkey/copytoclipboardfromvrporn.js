// ==UserScript==
// @name         Copy to clipboard from VRPorn
// @version      2023.0.1
// @description  Clicking a download link copies the URL to the clipboard.
// @match        https://vrporn.com/*
// @grant        GM.setClipboard
// ==/UserScript==

(function () {
  "use strict";

  const downloads = document.querySelectorAll(
    ".list_version_download .download-btn"
  );
  const icon =
    "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' height='20px' width='20px' fill='%23d2d2d2' viewBox='0 0 24 24'%3E%3Ctitle%3Econtent-copy%3C/title%3E%3Cpath d='M19,21H8V7H19M19,5H8A2,2 0 0,0 6,7V21A2,2 0 0,0 8,23H19A2,2 0 0,0 21,21V7A2,2 0 0,0 19,5M16,1H4A2,2 0 0,0 2,3V17H4V3H16V1Z' /%3E%3C/svg%3E\")";

  function createBtn(url) {
    const btn = document.createElement("a");
    btn.dataset.url = url;
    btn.style.zIndex = "10";
    btn.style.position = "relative";
    btn.style.marginLeft = "15px";
    btn.style.backgroundImage = icon;
    btn.style.backgroundRepeat = "norepeat";
    btn.style.width = "20px";
    btn.style.height = "20px";
    btn.addEventListener("click", function (event) {
      event.stopPropagation();
      const url = "'" + event.target.dataset.url + "'";
      console.log(url);
      GM.setClipboard(url);
    });
    return btn;
  }

  downloads.forEach(function (download) {
    const element = download.querySelector("span");
    const url = download.getAttribute("data");
    element.append(createBtn(url));
  });
})();

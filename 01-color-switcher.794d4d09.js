const t=document.querySelector("button[data-start]"),e=document.querySelector("button[data-stop]"),n=document.querySelector("body");t.addEventListener("click",(function(n){d=setInterval(o,1e3),t.disabled=!0,e.disabled=!1})),e.addEventListener("click",(function(n){clearInterval(d),t.disabled=!1,e.disabled=!0}));let d=null;function o(){n.style.backgroundColor=`#${Math.floor(16777215*Math.random()).toString(16).padStart(6,0)}`}
//# sourceMappingURL=01-color-switcher.794d4d09.js.map
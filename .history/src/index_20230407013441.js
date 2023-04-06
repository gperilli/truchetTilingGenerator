import { setTruchetBlockLayout } from '/src/setLayout.js'
import { updateBlockLayout } from '/src/setLayout.js'
import GUI from '/node_modules/lil-gui/dist/lil-gui.esm.js';


export { tilingArea };

const tilingArea = "truchcetTilingArea";

/////////////////////////////////////////////////////
// localStorage Initial Setting
/////////////////////////////////////////////////////
localStorage.setItem("truchetSettings-reset", "false")
if (localStorage.getItem("truchetSettings") == null || localStorage.getItem("truchetSettings-reset") == "true") {
    // load default rhombile Settings
    localStorage.setItem("truchetSettings", JSON.stringify({ 
        tileDensity: 20, 
        coloring: "randomCubeColors", 
        colorTwo: "#000",
        coloringOpacity: 0.5, 
        fadeIn: "appearOnLoad",
        animation: "static"
    }))
}
const truchetSettings = JSON.parse(localStorage.getItem("truchetSettings"))
console.log(truchetSettings);

/////////////////////////////////////////////
// on load / on resize
////////////////////////////////////////////
const topLevelContainer = document.querySelector("body");
window.addEventListener( 'load', function(event) {
    setTruchetBlockLayout(topLevelContainer, truchetSettings);
});

window.addEventListener( 'resize', function(event) {
    updateBlockLayout(topLevelContainer, truchetSettings)
});
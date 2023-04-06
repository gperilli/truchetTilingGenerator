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

/////////////////////////////////////////////
// the options menu 
////////////////////////////////////////////
const camelConverter = {
    singleColor: "Single Color",
    randomTileColors: 'Random Tile Colors', 
    randomCubeColors: 'Random Cube Colors', 
    lines: 'Lines',
    appearOnLoad:'Appear On Load', 
    randomTileFadeIn: 'Random Tile Fade In', 
    randomBlockFadeIn: 'Random Block Fade In',
    shimmer: "Shimmer"
}

const gui = new GUI();

const obj = { 
    density: truchetSettings["tileDensity"], 
    opacity: truchetSettings["coloringOpacity"] * 100, 
    coloring: camelConverter[truchetSettings.coloring], 
    fadeins: camelConverter[truchetSettings.fadeIn], 
    color1: truchetSettings["colorTwo"],
    animations: camelConverter[truchetSettings.animation]
}

gui.add( obj, 'density', 5, 50 ).onChange( value => {
    truchetSettings.tileDensity = Math.floor(value);
    console.log(truchetSettings)
    localStorage.setItem("truchetSettings", JSON.stringify(truchetSettings))
    document.querySelector(`#${tilingArea}`).remove()
    setTruchetBlockLayout(topLevelContainer, truchetSettings)
});
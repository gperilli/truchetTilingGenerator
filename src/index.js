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
        tileDensity: 10, 
        tileEdgeWidth: 5,
        tileEdgeColor: "#000",
        shapeEdgeWidth: 5,
        shapeEdgeColor: "#000",
        coloring: "Contiguous Group Colors",
        monochromeColor: "#000",
        opacityGradient: "Left To Right",
        animation: "Static"
    }))
}
const truchetSettings = JSON.parse(localStorage.getItem("truchetSettings"))


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
    contiguousGroupColors: "Contiguous Group Colors",
    monochrome: "Monochrome",
    leftToRight: 'Left To Right', 
    rightToLeft: 'Right To Left', 
    topToBottom: 'Top To Bottom',
    bottomToTop:'Bottom To Top', 
    randomTileFadeIn: 'Random Tile Fade In', 
    randomBlockFadeIn: 'Random Block Fade In',
    static: "Static",
    tileRotations: "Tile Rotations"
}

const gui = new GUI();

const obj = { 
    density: truchetSettings["tileDensity"], 
    tileEdgeWidth: truchetSettings["tileEdgeWidth"], 
    tileEdgeColor: truchetSettings["tileEdgeColor"], 
    coloring: camelConverter[truchetSettings.coloring], 
    shapeEdgeWidth: truchetSettings["shapeEdgeWidth"], 
    shapeEdgeColor: truchetSettings["shapeEdgeColor"], 
    monochromeColor: truchetSettings["colorTwo"],
    animations: camelConverter[truchetSettings.animation]
}

gui.add( obj, 'density', 3, 20, 1 ).onChange( value => {
    truchetSettings.tileDensity = Math.floor(value);
    localStorage.setItem("truchetSettings", JSON.stringify(truchetSettings))
    document.querySelector(`#${tilingArea}`).remove()
    setTruchetBlockLayout(topLevelContainer, truchetSettings)
});

gui.add( obj, 'tileEdgeWidth', 0, 20, 1 ).onChange( value => {
    truchetSettings.tileEdgeWidth = Math.floor(value);
    localStorage.setItem("truchetSettings", JSON.stringify(truchetSettings))
    //document.querySelector(`#${tilingArea}`).remove()
    //setTruchetBlockLayout(topLevelContainer, truchetSettings)
});

gui.addColor( obj, 'tileEdgeColor' ).onChange( value => {
    truchetSettings.tileEdgeColor = value;
    console.log(truchetSettings)
    localStorage.setItem("truchetSettings", JSON.stringify(truchetSettings))
    //document.querySelector(`#${tilingArea}`).remove()
    //setTruchetBlockLayout(topLevelContainer, truchetSettings)
});



gui.add( obj, 'shapeEdgeWidth', 0, 20, 1 ).onChange( value => {
    truchetSettings.shapeEdgeWidth = Math.floor(value);
    localStorage.setItem("truchetSettings", JSON.stringify(truchetSettings))
    //document.querySelector(`#${tilingArea}`).remove()
    //setTruchetBlockLayout(topLevelContainer, truchetSettings)
});

gui.addColor( obj, 'shapeEdgeColor' ).onChange( value => {
    truchetSettings.shapeEdgeColor = value;
    console.log(truchetSettings)
    localStorage.setItem("truchetSettings", JSON.stringify(truchetSettings))
    //document.querySelector(`#${tilingArea}`).remove()
    //setTruchetBlockLayout(topLevelContainer, truchetSettings)
});



gui.add( obj, 'coloring', [ 'Contiguous Group Colors', 'Monochrome', 'Not Filled In' ] ).onChange( value => {
    let unspacedValue = value.replaceAll(' ', '');
    let camelizedValue = unspacedValue.replace(unspacedValue.charAt(0), unspacedValue.charAt(0).toLowerCase());
    truchetSettings.coloring = camelizedValue
    localStorage.setItem("truchetSettings", JSON.stringify(truchetSettings))
    document.querySelector(`#${tilingArea}`).remove()
    setTruchetBlockLayout(topLevelContainer, truchetSettings)
});


gui.addColor( obj, 'monochromeColor' ).onChange( value => {
    truchetSettings.monochromeColor = value;
    console.log(truchetSettings)
    localStorage.setItem("truchetSettings", JSON.stringify(truchetSettings))
    document.querySelector(`#${tilingArea}`).remove()
    setRhombileBlockLayout(topLevelContainer, truchetSettings)
});

gui.add( obj, 'animations', [ 'Static', 'Random Tile Rotate' ] ).onChange( value => {
    let unspacedValue = value.replaceAll(' ', '');
    let camelizedValue = unspacedValue.replace(unspacedValue.charAt(0), unspacedValue.charAt(0).toLowerCase());
    truchetSettings.coloring = camelizedValue
    localStorage.setItem("truchetSettings", JSON.stringify(truchetSettings))
    document.querySelector(`#${tilingArea}`).remove()
    setTruchetBlockLayout(topLevelContainer, truchetSettings)
});
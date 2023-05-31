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
        shapeEdgeWidth: 5,
        shapeEdgeColor: "#000",
        tileBorderWidth: 5,
        tileBorderColor: "#000",
        overlayColor: "#000",
        overlayOpacity: 0.0,
        shapeEdgeWidth: 5,
        shapeEdgeColor: "#000",
        coloring: "Contiguous Group Colors",
        monochromeColorOne: "#000",
        monochromeColorTwo: "#fff",
        opacityGradient: "Left To Right",
        // animation: "Static"
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
    tileBorderWidth: truchetSettings["tileBorderWidth"],
    tileBorderColor: truchetSettings["tileBorderColor"],
    overlayColor: truchetSettings["overlayColor"],
    overlayOpacity: truchetSettings["overlayOpacity"],
    coloring: camelConverter[truchetSettings.coloring],
    shapeEdgeWidth: truchetSettings["shapeEdgeWidth"],
    shapeEdgeColor: truchetSettings["shapeEdgeColor"],
    monochromeColorOne: truchetSettings["monochromeColorOne"],
    monochromeColorTwo: truchetSettings["monochromeColorTwo"],
    // animations: camelConverter[truchetSettings.animation]
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
    document.querySelector(`#${tilingArea}`).remove()
    setTruchetBlockLayout(topLevelContainer, truchetSettings)
});

gui.addColor( obj, 'tileEdgeColor' ).onChange( value => {
    truchetSettings.tileEdgeColor = value;
    console.log(truchetSettings)
    localStorage.setItem("truchetSettings", JSON.stringify(truchetSettings))
    //document.querySelector(`#${tilingArea}`).remove()
    //setTruchetBlockLayout(topLevelContainer, truchetSettings)
});

gui.add( obj, 'tileBorderWidth', 0, 20, 1 ).onChange( value => {
    truchetSettings.tileBorderWidth = Math.floor(value);
    localStorage.setItem("truchetSettings", JSON.stringify(truchetSettings))
    document.querySelector(`#${tilingArea}`).remove()
    setTruchetBlockLayout(topLevelContainer, truchetSettings)
});

gui.addColor( obj, 'tileBorderColor' ).onChange( value => {
    truchetSettings.tileBorderColor = value;
    console.log(truchetSettings)
    localStorage.setItem("truchetSettings", JSON.stringify(truchetSettings))
    document.querySelector(`#${tilingArea}`).remove()
    setTruchetBlockLayout(topLevelContainer, truchetSettings)
});

gui.addColor( obj, 'overlayColor' ).onChange( value => {
    truchetSettings.overlayColor = value;
    console.log(truchetSettings)
    localStorage.setItem("truchetSettings", JSON.stringify(truchetSettings))
    document.querySelector(`#${tilingArea}`).remove()
    setTruchetBlockLayout(topLevelContainer, truchetSettings)
});

gui.add( obj, 'overlayOpacity', 0, 1, 0.1 ).onChange( value => {
    truchetSettings.overlayOpacity = value;
    localStorage.setItem("truchetSettings", JSON.stringify(truchetSettings))
    document.querySelector(`#${tilingArea}`).remove()
    setTruchetBlockLayout(topLevelContainer, truchetSettings)
});

gui.add( obj, 'shapeEdgeWidth', 0, 1 ).onChange( value => {
    truchetSettings.shapeEdgeWidth = value;
    localStorage.setItem("truchetSettings", JSON.stringify(truchetSettings))
    document.querySelector(`#${tilingArea}`).remove()
    setTruchetBlockLayout(topLevelContainer, truchetSettings)
});

gui.addColor( obj, 'shapeEdgeColor' ).onChange( value => {
    truchetSettings.shapeEdgeColor = value;
    console.log(truchetSettings)
    localStorage.setItem("truchetSettings", JSON.stringify(truchetSettings))
    document.querySelector(`#${tilingArea}`).remove()
    setTruchetBlockLayout(topLevelContainer, truchetSettings)
});

gui.add( obj, 'coloring', [ 'Contiguous Group Colors', 'Monochrome', 'Not Filled In' ] ).onChange( value => {
    let unspacedValue = value.replaceAll(' ', '');
    let camelizedValue = unspacedValue.replace(unspacedValue.charAt(0), unspacedValue.charAt(0).toLowerCase());
    truchetSettings.coloring = camelizedValue
    localStorage.setItem("truchetSettings", JSON.stringify(truchetSettings))
    document.querySelector(`#${tilingArea}`).remove()
    setTruchetBlockLayout(topLevelContainer, truchetSettings)
});


gui.addColor( obj, 'monochromeColorOne' ).onChange( value => {
    truchetSettings.monochromeColorOne = value;
    console.log(truchetSettings)
    localStorage.setItem("truchetSettings", JSON.stringify(truchetSettings))
    document.querySelector(`#${tilingArea}`).remove()
    setTruchetBlockLayout(topLevelContainer, truchetSettings)
});

gui.addColor( obj, 'monochromeColorTwo' ).onChange( value => {
    truchetSettings.monochromeColorTwo = value;
    console.log(truchetSettings)
    localStorage.setItem("truchetSettings", JSON.stringify(truchetSettings))
    document.querySelector(`#${tilingArea}`).remove()
    setTruchetBlockLayout(topLevelContainer, truchetSettings)
});

// gui.add( obj, 'animations', [ 'Static', 'Random Tile Rotate' ] ).onChange( value => {
//     let unspacedValue = value.replaceAll(' ', '');
//     let camelizedValue = unspacedValue.replace(unspacedValue.charAt(0), unspacedValue.charAt(0).toLowerCase());
//     truchetSettings.coloring = camelizedValue
//     localStorage.setItem("truchetSettings", JSON.stringify(truchetSettings))
//     document.querySelector(`#${tilingArea}`).remove()
//     setTruchetBlockLayout(topLevelContainer, truchetSettings)
// });

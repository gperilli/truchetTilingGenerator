import { topLevelContainerSize } from '/src/utils/topLevelContainerSize.js'
import { portraitLandscapeSwitcher } from '/src/utils/portraitLandscapeSwitcher.js'
import { setTruchetTiling } from '/src/setTruchetTiling.js'
import { tilingArea } from '/src/index.js';

export { setTruchetBlockLayout }
export { updateBlockLayout }

let topLevelContainerParams
let containerSquare
let isLandscape

// Main Square
let topLevelContainerDimensions, topLevelContainerWidth, topLevelContainerHeight, containerSquareWidth, containerXOffset, containerYOffset;

function containerSquarePositioning(containerSquare, containerSquareWidth, containerXOffset, containerYOffset) {
    containerSquare.style.width = containerSquareWidth + "px";
    containerSquare.style.height = containerSquareWidth + "px";
    containerSquare.style.left = "".concat((containerXOffset * 2), "px");
    containerSquare.style.top = "".concat(containerYOffset, "px");
}

function setTruchetBlockLayout(topLevelContainer, truchetSettings) {

    // get screen size
    topLevelContainerDimensions = topLevelContainerSize(topLevelContainer)
    
    isLandscape = topLevelContainerDimensions.width > topLevelContainerDimensions.height;
    topLevelContainerParams = portraitLandscapeSwitcher(isLandscape, topLevelContainerDimensions.width, topLevelContainerDimensions.height)
    containerSquareWidth = topLevelContainerParams.width
    containerXOffset = topLevelContainerParams.left
    containerYOffset = topLevelContainerParams.top
    
    // set position and size of main container square
    const containerSquareElement = `<div id="${tilingArea}" style="position: absolute; overflow: hidden;"></div>`;
    topLevelContainer.insertAdjacentHTML("beforeend", containerSquareElement);
    containerSquare = document.querySelector(`#${tilingArea}`);
    containerSquarePositioning(containerSquare, containerSquareWidth, containerXOffset, containerYOffset);

    /////////////////////////////////////////////
    // set the truchet tiling
    ////////////////////////////////////////////
    setTruchetTiling(containerSquare, containerSquareWidth, truchetSettings);
    
}


function updateBlockLayout(topLevelContainer, truchetSettings) {

    // get screen size
    topLevelContainerDimensions = topLevelContainerSize(topLevelContainer)
    
    isLandscape = topLevelContainerDimensions.width > topLevelContainerDimensions.height;
    topLevelContainerParams = portraitLandscapeSwitcher(isLandscape, topLevelContainerDimensions.width, topLevelContainerDimensions.height)
    containerSquareWidth = topLevelContainerParams.width
    containerXOffset = topLevelContainerParams.left
    containerYOffset = topLevelContainerParams.top

    document.querySelector(`#${tilingArea}`).innerHTML = '';
    containerSquarePositioning(containerSquare, containerSquareWidth, containerXOffset, containerYOffset);
    
    /////////////////////////////////////////////
    // set the truchet tiling
    ////////////////////////////////////////////     
    setTruchetTiling(containerSquare, containerSquareWidth, truchetSettings);

}

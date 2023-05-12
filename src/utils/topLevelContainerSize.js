export { topLevelContainerSize }

function topLevelContainerSize(topLevelContainer) {
    let topLevelContainerWidth = topLevelContainer.innerWidth || topLevelContainer.clientWidth;
	let topLevelContainerHeight = topLevelContainer.innerHeight || topLevelContainer.clientHeight;
    let topLevelContainerDimensions = {
        width: topLevelContainerWidth,
        height: topLevelContainerHeight
    }
    return topLevelContainerDimensions
}

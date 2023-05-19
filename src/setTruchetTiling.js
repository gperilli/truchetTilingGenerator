import { degrees_to_radians } from '/src/utils/trig.js'

export { setTruchetTiling }


class TruchetTile {
    constructor(tileWidth, truchetSettings) {
        this.truchetSettings = truchetSettings;
        this.blockContainer = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        this.blockContainer.style.background = "#ccc";
        //this.blockContainer.style.border = `${truchetSettings["tileEdgeWidth"]}px solid black`;
        //this.blockContainer.style.boxSizing = "border-box";
        this.tileWidth = tileWidth;
        this.strokeWidth = 5;
        this.blockContainer.setAttribute("height", tileWidth);
        this.blockContainer.setAttribute("width", tileWidth);
        this.blockContainer.style.position = "absolute";
        this.tileType = Math.floor(Math.random() * 2) == 0 ? 'a' : 'b';

        this.topLeft;
        this.topRight;
        this.botttomLeft;
        this.bottomRight;

        this.topLeftClass;
        this.topRightClass;
        this.botttomLeftClass;
        this.bottomRightClass;

        this.topLeftElement;
        this.topRightElement;
        this.botttomLeftElement;
        this.bottomRightElement;

        this.cornerPieceTop = {element: null, colorGroup: []};
        this.cornerPieceBottom = {element: null, colorGroup: []};
        this.backPiece = {element: null, colorGroup: []};

        this.init()
    }

    init() {

        if (this.tileType == 'a') {
            this.createTileA()
        } else {
            this.createTileB()
        }

        // <rect width="300" height="100" style="fill:rgb(0,0,255);stroke-width:3;stroke:rgb(0,0,0)" />
        let rec = document.createElementNS("http://www.w3.org/2000/svg", "rect");
        rec.style.width = "100%";
        rec.style.height = "100%";
        rec.style.fill = this.truchetSettings["overlayColor"];
        rec.style.fillOpacity = this.truchetSettings["overlayOpacity"];
        rec.style.boxSizing = "border-box";
        rec.style.stroke = this.truchetSettings["tileBorderColor"];
        rec.style.strokeWidth = `${this.truchetSettings["tileBorderWidth"]}px`;
        this.blockContainer.appendChild(rec);
        console.log(this.truchetSettings["overlayOpacity"]);
        return this.blockContainer;
    }

    createTileA()

    // tileType == 'a'
    //   _ _ _
    //  |_|   |  truchetTopLeft
    //  |    _|
    //  |_ _|_|  truchetBottomRight
    //

    {
        this.createPieSlice({
            centreX: this.tileWidth - this.truchetSettings["tileEdgeWidth"],
            centreY: this.tileWidth - this.truchetSettings["tileEdgeWidth"],
            startAngleRadians: degrees_to_radians(180) ,
            sweepAngleRadians: degrees_to_radians(90),
            radius: ((this.tileWidth / 2) + (this.strokeWidth / 2)) - this.truchetSettings["tileEdgeWidth"],
            fillColour: "#000" } ); //border
        this.bottomRight = this.createPieSlice({
            centreX: this.tileWidth - this.truchetSettings["tileEdgeWidth"],
            centreY: this.tileWidth - this.truchetSettings["tileEdgeWidth"],
            startAngleRadians: degrees_to_radians(180) ,
            sweepAngleRadians: degrees_to_radians(90),
            radius: ((this.tileWidth / 2) - (this.strokeWidth / 2)) - this.truchetSettings["tileEdgeWidth"],
            fillColour: "#ccc" } );
        this.bottomRightClass = 'truchetBottomRight';
        this.bottomRight.setAttribute('class', 'truchetBottomRight');

        this.createPieSlice({
            centreX: 0 + this.truchetSettings["tileEdgeWidth"],
            centreY: 0 + this.truchetSettings["tileEdgeWidth"],
            startAngleRadians: 0 ,
            sweepAngleRadians: degrees_to_radians(90),
            radius: ((this.tileWidth / 2) + (this.strokeWidth / 2)) - this.truchetSettings["tileEdgeWidth"],
            fillColour: "#000" } ); // border
        this.topLeft = this.createPieSlice({
            centreX: 0 + this.truchetSettings["tileEdgeWidth"],
            centreY: 0 + this.truchetSettings["tileEdgeWidth"],
            startAngleRadians: 0 ,
            sweepAngleRadians: degrees_to_radians(90),
            radius: ((this.tileWidth / 2) - (this.strokeWidth / 2)) - this.truchetSettings["tileEdgeWidth"],
            fillColour: "#ccc" } );
        this.topLeftClass = 'truchetTopLeft';
        this.topLeft.setAttribute('class', 'truchetTopLeft');

        this.topRightClass = 'truchetBottomLeftToTopRightBack';
        this.bottomLeftClass = 'truchetBottomLeftToTopRightBack';
        this.topRight = this.blockContainer;
        this.bottomLeft = this.blockContainer;
        this.blockContainer.setAttribute('class', 'truchetBottomLeftToTopRightBack')
    }

    createTileB()

    // tileType == 'b'
    //   _ _ _
    //  |   |_|  truchetTopRight
    //  |_    |
    //  |_|_ _|  truchetBottomLeft
    //

    {
        this.createPieSlice({
            centreX: this.tileWidth - this.truchetSettings["tileEdgeWidth"],
            centreY: 0 + this.truchetSettings["tileEdgeWidth"],
            startAngleRadians: degrees_to_radians(90),
            sweepAngleRadians: degrees_to_radians(90),
            radius: ((this.tileWidth / 2) + (this.strokeWidth / 2)) - this.truchetSettings["tileEdgeWidth"],
            fillColour: "#000" }); // border
        this.topRight = this.createPieSlice({
            centreX: this.tileWidth - this.truchetSettings["tileEdgeWidth"],
            centreY: 0 + this.truchetSettings["tileEdgeWidth"],
            startAngleRadians: degrees_to_radians(90),
            sweepAngleRadians: degrees_to_radians(90),
            radius: ((this.tileWidth / 2) - (this.strokeWidth / 2)) - this.truchetSettings["tileEdgeWidth"],
            fillColour: "#ccc" });
        this.topRightClass = 'truchetTopRight';
        this.topRight.setAttribute('class', 'truchetTopRight');
        this.createPieSlice({
            centreX: 0 + this.truchetSettings["tileEdgeWidth"],
            centreY: this.tileWidth - this.truchetSettings["tileEdgeWidth"],
            startAngleRadians: degrees_to_radians(270) ,
            sweepAngleRadians: degrees_to_radians(90),
            radius: ((this.tileWidth / 2) + (this.strokeWidth / 2)) - this.truchetSettings["tileEdgeWidth"],
            fillColour: "#000" });
        this.bottomLeft = this.createPieSlice({
            centreX: 0 + this.truchetSettings["tileEdgeWidth"],
            centreY: this.tileWidth - this.truchetSettings["tileEdgeWidth"],
            startAngleRadians: degrees_to_radians(270),
            sweepAngleRadians: degrees_to_radians(90),
            radius: ((this.tileWidth / 2) - (this.strokeWidth / 2)) - this.truchetSettings["tileEdgeWidth"],
            fillColour: "#ccc" });
        this.bottomLeftClass = 'truchetBottomLeft';
        this.bottomLeft.setAttribute('class', 'truchetBottomLeft');

        this.topLeftClass = 'truchetBottomRightToTopLeftBack';
        this.bottomRightClass = 'truchetBottomRightToTopLeftBack';
        this.topLeft = this.blockContainer;
        this.bottomRight = this.blockContainer;
        this.blockContainer.setAttribute('class', 'truchetBottomRightToTopLeftBack')
    }

    createPieSlice(settings)
    {
        let d = "";

        const firstCircumferenceX = settings.centreX + settings.radius * Math.cos(settings.startAngleRadians);
        const firstCircumferenceY = settings.centreY + settings.radius * Math.sin(settings.startAngleRadians);
        const secondCircumferenceX = settings.centreX + settings.radius * Math.cos(settings.startAngleRadians + settings.sweepAngleRadians);
        const secondCircumferenceY = settings.centreY + settings.radius * Math.sin(settings.startAngleRadians + settings.sweepAngleRadians);

        // move to centre
        d += "M" + settings.centreX + "," + settings.centreY + " ";
        // line to first edge
        d += "L" + firstCircumferenceX + "," + firstCircumferenceY + " ";
        // arc
        // Radius X, Radius Y, X Axis Rotation, Large Arc Flag, Sweep Flag, End X, End Y
        d += "A" + settings.radius + "," + settings.radius + " 0 0,1 " + secondCircumferenceX + "," + secondCircumferenceY + " ";
        // close path
        d += "Z";

        const arc = document.createElementNS("http://www.w3.org/2000/svg", "path");

        arc.setAttributeNS(null, "d", d);
        arc.setAttributeNS(null, "fill", settings.fillColour);

        this.blockContainer.appendChild(arc);

        return arc;
    }

    setTruchetTileDomElements() {

        let topLeftElements = document.querySelectorAll(`.${this.topLeftClass}`);
        this.topLeftElement = topLeftElements[topLeftElements.length -1];
        let bottomRightElements = document.querySelectorAll(`.${this.bottomRightClass}`);
        this.bottomRightElement = bottomRightElements[bottomRightElements.length -1];

        if (this.tileType == "b") {
            this.backPiece.element = this.topLeftElement;
            this.backPiece.element = this.bottomRightElement;
        } else {
            this.cornerPieceTop.element = this.topLeftElement;
            this.cornerPieceBottom.element = this.bottomRightElement;
        }


        let topRightElements = document.querySelectorAll(`.${this.topRightClass}`);
        this.topRightElement = topRightElements[topRightElements.length -1];
        let bottomLeftElements = document.querySelectorAll(`.${this.bottomLeftClass}`);
        this.bottomLeftElement = bottomLeftElements[bottomLeftElements.length -1];

        if (this.tileType == "a") {
            this.backPiece.element = this.topRightElement;
            this.backPiece.element = this.bottomLeftElement;
        } else {
            this.cornerPieceTop.element = this.topRightElement;
            this.cornerPieceBottom.element = this.bottomLeftElement;
        }

    }
}

function setTruchetTiling(containerSquare, tilingAreaWidthLength, truchetSettings) {
    var tilingArea = containerSquare;
    let mosaicSize = truchetSettings["tileDensity"];
    const tileWidth = tilingAreaWidthLength / truchetSettings["tileDensity"];

    // create mosaic matrix
    let tileMatrix = [];
    for (let j = 0; j < mosaicSize; j++) {
        tileMatrix[j] = [];
        for (let i = 0; i < mosaicSize; i++) {
            tileMatrix[j][i] = new TruchetTile(tileWidth, truchetSettings);
            tileMatrix[j][i].blockContainer.style.top = `${(tileWidth * j)}px`;
            tileMatrix[j][i].blockContainer.style.left = `${(tileWidth * i)}px`;
            tilingArea.insertAdjacentHTML("beforeend", tileMatrix[j][i].blockContainer.outerHTML);
            tileMatrix[j][i].setTruchetTileDomElements();
        }
    }

    // create color groups based on contiguous parts
    let colorGroups = 0;
    let tileToTheLeft = null;
    let tileAbove = null;
    for (let y = 0; y < mosaicSize; y++) {
        for (let x = 0; x < mosaicSize; x++) {

            tileToTheLeft = x > 0 ? tileMatrix[y][x - 1] : null;
            tileAbove = y > 0 ? tileMatrix[y - 1][x] : null;

            if (x == 0 && y == 0) {
                // tile type 'a'
                if (tileMatrix[y][x].tileType == "a") {
                    tileMatrix[y][x].cornerPieceTop.colorGroup.push(colorGroups++);
                    tileMatrix[y][x].backPiece.colorGroup.push(colorGroups++);
                }

                // tile type 'b'
                if (tileMatrix[y][x].tileType == "b") {
                    tileMatrix[y][x].cornerPieceTop.colorGroup.push(colorGroups++);
                    tileMatrix[y][x].cornerPieceBottom.colorGroup.push(colorGroups++);
                    tileMatrix[y][x].backPiece.colorGroup.push(colorGroups++);
                }
            }

            // top row
            if (tileAbove == null && x > 0) {
                if (tileMatrix[y][x].tileType == "b") {
                    tileMatrix[y][x].cornerPieceTop.colorGroup.push(colorGroups++);
                }

                if (tileMatrix[y][x].tileType == "a" && tileToTheLeft.tileType == "b") {
                        tileMatrix[y][x].cornerPieceTop.colorGroup.push(tileToTheLeft.cornerPieceTop.colorGroup[tileToTheLeft.cornerPieceTop.colorGroup.length - 1]);
                } else if (tileMatrix[y][x].tileType == "a" && tileToTheLeft.tileType == "a") {
                    tileMatrix[y][x].cornerPieceTop.colorGroup.push(tileToTheLeft.backPiece.colorGroup[tileToTheLeft.backPiece.colorGroup.length - 1]);
                }
            }

            // far left column
            if (tileToTheLeft == null && y > 0) {
                if (tileMatrix[y][x].tileType == "b") {
                    tileMatrix[y][x].cornerPieceBottom.colorGroup.push(colorGroups++);
                }
            }

            if (tileToTheLeft != null) {

                if (tileMatrix[y][x].tileType == "b" && tileToTheLeft.tileType == "a") {
                    if (tileMatrix[y][x].cornerPieceBottom.colorGroup.includes(tileToTheLeft.cornerPieceBottom.colorGroup[tileToTheLeft.cornerPieceBottom.colorGroup.length - 1]) == false) {
                        tileMatrix[y][x].cornerPieceBottom.colorGroup.push(tileToTheLeft.cornerPieceBottom.colorGroup[tileToTheLeft.cornerPieceBottom.colorGroup.length - 1]);
                    }
                    if (tileMatrix[y][x].backPiece.colorGroup.includes(tileToTheLeft.backPiece.colorGroup[tileToTheLeft.backPiece.colorGroup.length - 1]) == false) {
                        tileMatrix[y][x].backPiece.colorGroup.push(tileToTheLeft.backPiece.colorGroup[tileToTheLeft.backPiece.colorGroup.length - 1]);
                    }
                } else if (tileMatrix[y][x].tileType == "b" && tileToTheLeft.tileType == "b") {
                    if (tileMatrix[y][x].cornerPieceBottom.colorGroup.includes(tileToTheLeft.backPiece.colorGroup[tileToTheLeft.backPiece.colorGroup.length - 1]) == false) {
                        tileMatrix[y][x].cornerPieceBottom.colorGroup.push(tileToTheLeft.backPiece.colorGroup[tileToTheLeft.backPiece.colorGroup.length - 1]);
                    }
                    if (tileMatrix[y][x].backPiece.colorGroup.includes(tileToTheLeft.cornerPieceTop.colorGroup[tileToTheLeft.cornerPieceTop.colorGroup.length - 1]) == false) {
                        tileMatrix[y][x].backPiece.colorGroup.push(tileToTheLeft.cornerPieceTop.colorGroup[tileToTheLeft.cornerPieceTop.colorGroup.length - 1]);
                    }
                } else if (tileMatrix[y][x].tileType == "a" && tileToTheLeft.tileType == "a") {
                    if (tileMatrix[y][x].backPiece.colorGroup.includes(tileToTheLeft.cornerPieceBottom.colorGroup[tileToTheLeft.cornerPieceBottom.colorGroup.length - 1]) == false) {
                        tileMatrix[y][x].backPiece.colorGroup.push(tileToTheLeft.cornerPieceBottom.colorGroup[tileToTheLeft.cornerPieceBottom.colorGroup.length - 1]);
                    }
                    if (tileMatrix[y][x].cornerPieceTop.colorGroup.includes(tileToTheLeft.backPiece.colorGroup[tileToTheLeft.backPiece.colorGroup.length - 1] == false)) {
                        tileMatrix[y][x].cornerPieceTop.colorGroup.push(tileToTheLeft.backPiece.colorGroup[tileToTheLeft.backPiece.colorGroup.length - 1]);
                    }

                } else if (tileMatrix[y][x].tileType == "a" && tileToTheLeft.tileType == "b") {
                    if (tileMatrix[y][x].backPiece.colorGroup.includes(tileToTheLeft.backPiece.colorGroup[tileToTheLeft.backPiece.colorGroup.length - 1]) == false) {
                        tileMatrix[y][x].backPiece.colorGroup.push(tileToTheLeft.backPiece.colorGroup[tileToTheLeft.backPiece.colorGroup.length - 1]);
                    }
                    if (tileMatrix[y][x].cornerPieceTop.colorGroup.includes(tileToTheLeft.cornerPieceTop.colorGroup[tileToTheLeft.cornerPieceTop.colorGroup.length - 1] == false)) {
                        tileMatrix[y][x].cornerPieceTop.colorGroup.push(tileToTheLeft.cornerPieceTop.colorGroup[tileToTheLeft.cornerPieceTop.colorGroup.length - 1]);
                    }
                }
            }

            if (tileAbove != null) {

                if (tileMatrix[y][x].tileType == "a" && tileAbove.tileType == "b") {
                    if (tileMatrix[y][x].cornerPieceTop.colorGroup.includes(tileAbove.cornerPieceBottom.colorGroup[tileAbove.cornerPieceBottom.colorGroup.length - 1]) == false) {
                        tileMatrix[y][x].cornerPieceTop.colorGroup.push(tileAbove.cornerPieceBottom.colorGroup[tileAbove.cornerPieceBottom.colorGroup.length - 1]);
                    }
                    if (tileMatrix[y][x].backPiece.colorGroup.includes(tileAbove.backPiece.colorGroup[tileAbove.backPiece.colorGroup.length - 1]) == false) {
                        tileMatrix[y][x].backPiece.colorGroup.push(tileAbove.backPiece.colorGroup[tileAbove.backPiece.colorGroup.length - 1]);
                    }

                } else if (tileMatrix[y][x].tileType == "a" && tileAbove.tileType == "a") {
                    if (tileMatrix[y][x].cornerPieceTop.colorGroup.includes(tileAbove.backPiece.colorGroup[tileAbove.backPiece.colorGroup.length - 1]) == false) {
                        tileMatrix[y][x].cornerPieceTop.colorGroup.push(tileAbove.backPiece.colorGroup[tileAbove.backPiece.colorGroup.length - 1]);
                    }
                    if (tileMatrix[y][x].backPiece.colorGroup.includes(tileAbove.cornerPieceBottom.colorGroup[tileAbove.cornerPieceBottom.colorGroup.length - 1]) == false) {
                        tileMatrix[y][x].backPiece.colorGroup.push(tileAbove.cornerPieceBottom.colorGroup[tileAbove.cornerPieceBottom.colorGroup.length - 1]);
                    }

                } else if (tileMatrix[y][x].tileType == "b" && tileAbove.tileType == "a") {
                    if (tileMatrix[y][x].backPiece.colorGroup.includes(tileAbove.backPiece.colorGroup[tileAbove.backPiece.colorGroup.length - 1]) == false) {
                        tileMatrix[y][x].backPiece.colorGroup.push(tileAbove.backPiece.colorGroup[tileAbove.backPiece.colorGroup.length - 1]);
                    }
                    if (tileMatrix[y][x].cornerPieceTop.colorGroup.includes(tileAbove.cornerPieceBottom.colorGroup[tileAbove.cornerPieceBottom.colorGroup.length - 1]) == false) {
                        tileMatrix[y][x].cornerPieceTop.colorGroup.push(tileAbove.cornerPieceBottom.colorGroup[tileAbove.cornerPieceBottom.colorGroup.length - 1]);
                    }
                } else if (tileMatrix[y][x].tileType == "b" && tileAbove.tileType == "b") {
                    if (tileMatrix[y][x].backPiece.colorGroup.includes(tileAbove.cornerPieceBottom.colorGroup[tileAbove.cornerPieceBottom.colorGroup.length - 1]) == false) {
                        tileMatrix[y][x].backPiece.colorGroup.push(tileAbove.cornerPieceBottom.colorGroup[tileAbove.cornerPieceBottom.colorGroup.length - 1]);
                    }
                    if (tileMatrix[y][x].cornerPieceTop.colorGroup.includes(tileAbove.backPiece.colorGroup[tileAbove.backPiece.colorGroup.length - 1]) == false) {
                        tileMatrix[y][x].cornerPieceTop.colorGroup.push(tileAbove.backPiece.colorGroup[tileAbove.backPiece.colorGroup.length - 1]);
                    }
                }

            }

            if (tileMatrix[y][x].tileType == "a") {
                tileMatrix[y][x].cornerPieceBottom.colorGroup.push(colorGroups++);
            }
        }
    }

    // get color groups that need to be joined
    let groupsToJoin = [];
    let allGroups = [];
    for (let y = 0; y < mosaicSize; y++) {
        for (let x = 0; x < mosaicSize; x++) {

            if (tileMatrix[y][x].backPiece.colorGroup.length > 1) {
                groupsToJoin.push(tileMatrix[y][x].backPiece.colorGroup);
            }

            tileMatrix[y][x].backPiece.colorGroup.forEach((group) => {
                if (allGroups.includes(group) == false) {
                    allGroups.push(group);
                }
            })

            if (tileMatrix[y][x].cornerPieceBottom.colorGroup.length > 1) {
                groupsToJoin.push(tileMatrix[y][x].backPiece.colorGroup);
            }

            tileMatrix[y][x].cornerPieceBottom.colorGroup.forEach((group) => {
                if (allGroups.includes(group) == false) {
                    allGroups.push(group);
                }
            })

            if (tileMatrix[y][x].cornerPieceTop.colorGroup.length > 1) {
                groupsToJoin.push(tileMatrix[y][x].backPiece.colorGroup);
            }

            tileMatrix[y][x].cornerPieceTop.colorGroup.forEach((group) => {
                if (allGroups.includes(group) == false) {
                    allGroups.push(group);
                }
            })

        }
    }


    let unsortedArray = groupsToJoin;

    let joinerArray = [];
    let labeledArray = [];
    for (let i = 0; i < unsortedArray.length; i++) {
        labeledArray[i] = {group: unsortedArray[i], sorted: false}
    }


    labeledArray.forEach((labeledChunk) => {
        // putting unsorted items into subarrays of joinerArray
        if (labeledChunk.sorted == false) {
            joinerArray.forEach((joinerSubArray) => {
                if (joinerSubArray.includes(labeledChunk.group[0]) || joinerSubArray.includes(labeledChunk.group[1]) ) {
                    joinerSubArray.push(labeledChunk.group[0]);
                    joinerSubArray.push(labeledChunk.group[1]);
                    labeledChunk.sorted = true;
                }
            })

            if (labeledChunk.sorted == false) {
                joinerArray.push(labeledChunk.group);
                labeledChunk.sorted = true;
            }

            joinerArray.forEach((joinerSubArray) => {
                joinerArray.forEach((joinerSubArrayComparison) => {
                    // only compare different subarrays within parent array
                    if (joinerSubArray != joinerSubArrayComparison) {
                        joinerSubArray.forEach((joinerSubArrayItem) => {
                            // determine if there is a shared item
                            if (joinerSubArrayComparison.includes(joinerSubArrayItem)) {
                                // if there is a shared item,  take all items from the joinerSubArrayComparison sub array into the joinerSubArray (if they are not already there)
                                joinerSubArrayComparison.forEach((joinerSubArrayComparisonItem) => {
                                    if (joinerSubArray.includes(joinerSubArrayComparisonItem) == false) {
                                        joinerSubArray.push(joinerSubArrayComparisonItem)
                                    }
                                })
                            }
                        })
                    }
                })
            })
        }

    })

    joinerArray.forEach((joinerArraySubArray) => {
        joinerArraySubArray.sort()
    })

    function removeDuplicates(arr = []) {
        const map = new Map();
        arr.forEach((x) => map.set(JSON.stringify(x), x));
        arr = [...map.values()];
        return arr;
    };

    // remove duplicate numbers within the sub arrays
    let innerDuplicateRemovedJoinerArray = [];
    for (let i = 0; i < joinerArray.length; i++) {
        innerDuplicateRemovedJoinerArray[i] = removeDuplicates(joinerArray[i]);
    }

    // remove duplicate groups
    let duplicateRemovedJoinerArray = removeDuplicates(innerDuplicateRemovedJoinerArray);


    // create arrays of contiguous DOM elements
    let contiguousGroups = [];
    for (let i = 0; i < duplicateRemovedJoinerArray.length; i++) {
        contiguousGroups[i] = [];
        duplicateRemovedJoinerArray[i].forEach((groupNumber) => {
            for (let y = 0; y < mosaicSize; y++) {
                for (let x = 0; x < mosaicSize; x++) {
                    tileMatrix[y][x].backPiece.colorGroup.forEach((group) => {
                        if (group == groupNumber) {
                            contiguousGroups[i].push(tileMatrix[y][x].backPiece.element)
                        }
                    })
                    tileMatrix[y][x].cornerPieceTop.colorGroup.forEach((group) => {
                        if (group == groupNumber) {
                            contiguousGroups[i].push(tileMatrix[y][x].cornerPieceTop.element)
                        }
                    })
                    tileMatrix[y][x].cornerPieceBottom.colorGroup.forEach((group) => {
                        if (group == groupNumber) {
                            contiguousGroups[i].push(tileMatrix[y][x].cornerPieceBottom.element)
                        }
                    })
                }
            }
        })
    }

    // get color groups that were not joined
    let flatJoinerArray = duplicateRemovedJoinerArray.flat();
    let onlyNonJoinedGroups = allGroups;
    flatJoinerArray.forEach((joinerGroup) => {
        if (onlyNonJoinedGroups.includes(joinerGroup)) {
            let index = onlyNonJoinedGroups.indexOf(joinerGroup);
        onlyNonJoinedGroups.splice(index, 1);
        }
    })

    // create arrays of contiguous DOM elements
    let onlyNonJoinedContiguousDomElements = [];
    for (let i = 0; i < onlyNonJoinedGroups.length; i++) {
        onlyNonJoinedContiguousDomElements[i] = [];
        for (let y = 0; y < mosaicSize; y++) {
            for (let x = 0; x < mosaicSize; x++) {
                tileMatrix[y][x].backPiece.colorGroup.forEach((group) => {
                    if (group == onlyNonJoinedGroups[i]) {
                        onlyNonJoinedContiguousDomElements[i].push(tileMatrix[y][x].backPiece.element)
                    }
                })
                tileMatrix[y][x].cornerPieceTop.colorGroup.forEach((group) => {
                    if (group == onlyNonJoinedGroups[i]) {
                        onlyNonJoinedContiguousDomElements[i].push(tileMatrix[y][x].cornerPieceTop.element)
                    }
                })
                tileMatrix[y][x].cornerPieceBottom.colorGroup.forEach((group) => {
                    if (group == onlyNonJoinedGroups[i]) {
                        onlyNonJoinedContiguousDomElements[i].push(tileMatrix[y][x].cornerPieceBottom.element)
                    }
                })
            }
        }
    }

    // console.log("all groups:");
    // console.log(allGroups);
    // console.log("tile matri:x");
    // console.log(tileMatrix);
    // console.log("non joined groups:");
    // console.log(onlyNonJoinedGroups);
    // console.log("joined groups:");
    // console.log(duplicateRemovedJoinerArray);
    // console.log("contiguous groups:");
    // console.log(contiguousGroups);

    function colorContiguousGroups(group) {
        let randHexColor = "#" + Math.floor(Math.random()*16777215).toString(16);
        group.forEach((part) => {
            if (part.className.baseVal == 'truchetBottomLeftToTopRightBack' || part.className.baseVal == 'truchetBottomRightToTopLeftBack') {
                part.style.background = randHexColor;
            } else {
                part.style.fill = randHexColor;
            }
        })
    }

    contiguousGroups.forEach((group) => {
        colorContiguousGroups(group);
    });

    onlyNonJoinedContiguousDomElements.forEach((group) => {
        colorContiguousGroups(group);
    });
}

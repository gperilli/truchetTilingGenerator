import { degrees_to_radians } from '/src/utils/trig.js'

export { setTruchetTiling }


class TruchetTile {
    constructor(tileWidth, truchetSettings) {
        this.blockContainer = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        this.blockContainer.style.background = "#ccc";
        this.blockContainer.style.outline = "1px solid black";
        this.tileWidth = tileWidth;
        this.strokeWidth = 5;
        this.blockContainer.setAttribute("height", tileWidth);
        this.blockContainer.setAttribute("width", tileWidth);
        this.blockContainer.style.position = "absolute";
        this.tileType = Math.floor(Math.random() * 2);
        
        this.topLeft;
        this.topRight;
        this.botttomLeft;
        this.bottomRight;

        // this.blockContainer.setAttribute('class', 'truchetBack');
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

        if (this.tileType == 0) {
            this.createTileA()
        } else {
            this.createTileB()
        }

        return this.blockContainer;
    }

    createTileA()
    {
        this.createPieSlice({ 
            centreX: this.tileWidth, 
            centreY: this.tileWidth, 
            startAngleRadians: degrees_to_radians(180) , 
            sweepAngleRadians: degrees_to_radians(90), 
            radius: (this.tileWidth / 2) + (this.strokeWidth / 2), 
            fillColour: "#000" } ); //border
        this.bottomRight = this.createPieSlice({ 
            centreX: this.tileWidth, 
            centreY: this.tileWidth, 
            startAngleRadians: degrees_to_radians(180) , 
            sweepAngleRadians: degrees_to_radians(90), 
            radius: (this.tileWidth / 2) - (this.strokeWidth / 2), 
            fillColour: "#ccc" } );
        this.bottomRightClass = 'truchetBottomRight';
        this.bottomRight.setAttribute('class', 'truchetBottomRight');
        this.createPieSlice({ 
            centreX: 0, 
            centreY: 0, 
            startAngleRadians: 0 , 
            sweepAngleRadians: degrees_to_radians(90), 
            radius: (this.tileWidth / 2) + (this.strokeWidth / 2), 
            fillColour: "#000" } ); // border
        this.topLeft = this.createPieSlice({ 
            centreX: 0, 
            centreY: 0, 
            startAngleRadians: 0 , 
            sweepAngleRadians: degrees_to_radians(90), 
            radius: (this.tileWidth / 2) - (this.strokeWidth / 2), 
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
    {
        this.createPieSlice({ 
            centreX: this.tileWidth, 
            centreY: 0, 
            startAngleRadians: degrees_to_radians(90), 
            sweepAngleRadians: degrees_to_radians(90), 
            radius: (this.tileWidth / 2) + (this.strokeWidth / 2), 
            fillColour: "#000" }); // border
        this.topRight = this.createPieSlice({ 
            centreX: this.tileWidth, 
            centreY: 0, 
            startAngleRadians: degrees_to_radians(90), 
            sweepAngleRadians: degrees_to_radians(90), 
            radius: (this.tileWidth / 2) - (this.strokeWidth / 2), 
            fillColour: "#ccc" });
        this.topRightClass = 'truchetTopRight';
        this.topRight.setAttribute('class', 'truchetTopRight');
        this.createPieSlice({ 
            centreX: 0, 
            centreY: this.tileWidth, 
            startAngleRadians: degrees_to_radians(270) , 
            sweepAngleRadians: degrees_to_radians(90), 
            radius: (this.tileWidth / 2) + (this.strokeWidth / 2), 
            fillColour: "#000" });
        this.bottomLeft = this.createPieSlice({ 
            centreX: 0, 
            centreY: this.tileWidth, 
            startAngleRadians: degrees_to_radians(270), 
            sweepAngleRadians: degrees_to_radians(90), 
            radius: (this.tileWidth / 2) - (this.strokeWidth / 2), 
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

        // console.log(document.querySelectorAll(`.${this.topLeftClass}`));
        // console.log(document.querySelectorAll(`.${this.topLeftClass}`).length);
        let topLeftElements = document.querySelectorAll(`.${this.topLeftClass}`);
        this.topLeftElement = topLeftElements[topLeftElements.length -1];
        if (this.topLeftClass == "truchetBottomRightToTopLeftBack") {
            this.backPiece.element = this.topLeftElement;
        } else {
            this.cornerPieceTop.element = this.topLeftElement;
        }
        
        let topRightElements = document.querySelectorAll(`.${this.topRightClass}`);
        this.topRightElement = topRightElements[topRightElements.length -1];
        if (this.topRightClass == "truchetBottomLeftToTopRightBack") {
            this.backPiece.element = this.topRightElement;
        } else {
            this.cornerPieceTop.element = this.topRightElement;
        }

        let bottomLeftElements = document.querySelectorAll(`.${this.bottomLeftClass}`);
        this.bottomLeftElement = bottomLeftElements[bottomLeftElements.length -1];
        if (this.bottomLeftClass == "truchetBottomLeftToTopRightBack") {
            this.backPiece.element = this.bottomLeftElement;
        } else {
            this.cornerPieceBottom.element = this.bottomLeftElement;
        }

        let bottomRightElements = document.querySelectorAll(`.${this.bottomRightClass}`);
        this.bottomRightElement = bottomRightElements[bottomRightElements.length -1];
        if (this.bottomRightClass == "truchetBottomRightToTopLeftBack") {
            this.backPiece.element = this.bottomRightElement;
        } else {
            this.cornerPieceBottom.element = this.bottomRightElement;
        }
    }
}

function setTruchetTiling(containerSquare, tilingAreaWidthLength, truchetSettings) {
    var tilingArea = containerSquare;
    let truchetRows = truchetSettings["tileDensity"];
    const tileWidth = tilingAreaWidthLength / truchetSettings["tileDensity"];
    
    let tileMatrix = [];
    //let blockCount = -1;
    for (let j = 0; j < truchetRows; j++) {
        tileMatrix[j] = [];

        for (let i = 0; i < truchetRows; i++) {
            tileMatrix[j][i] = new TruchetTile(tileWidth, truchetSettings);
            tileMatrix[j][i].blockContainer.style.top = `${(tileWidth * j)}px`;
            tileMatrix[j][i].blockContainer.style.left = `${(tileWidth * i)}px`;
            
            tilingArea.insertAdjacentHTML("beforeend", tileMatrix[j][i].blockContainer.outerHTML);
            tileMatrix[j][i].setTruchetTileDomElements();
        }
    }

    // tileMatrix[5][5].blockContainer.style.background = "yellow";
    //console.log(tileMatrix[0][0]);
    let colorGroups = 0;
    let contiguousGroups = [];
    let tileToTheLeft = null;
    let tileAbove = null;
    for (let y = 0; y < truchetRows; y++) {
        for (let x = 0; x < truchetRows; x++) {
            
            if (x > 0) {
                tileToTheLeft = tileMatrix[y][x - 1]
            } else {
                // far left column - not top left corner - not bottom left corner
                tileToTheLeft = null;
            } 
            
            if (y > 0) {
                tileAbove = tileMatrix[y - 1][x];
            } else {
                // top row - not top left corner - not top right corner
                tileAbove = null;
            }

            if (x == 0 && y == 0) {
                // tile type 1
                if (tileMatrix[y][x].topLeftClass == 'truchetTopLeft') {
                    contiguousGroups[contiguousGroups.length] = [];
                    contiguousGroups[contiguousGroups.length - 1].push(tileMatrix[y][x].topLeftElement); // top corner
                    tileMatrix[y][x].cornerPieceTop.colorGroup.push(colorGroups++);
                    
                    // contiguousGroups[contiguousGroups.length] = [];
                    // contiguousGroups[contiguousGroups.length - 1].push(tileMatrix[y][x].bottomRightElement); // bottom corner
                    // tileMatrix[y][x].cornerPieceBottom.colorGroup.push(colorGroups++);

                    contiguousGroups[contiguousGroups.length] = [];
                    contiguousGroups[contiguousGroups.length - 1].push(tileMatrix[y][x].bottomLeftElement); // back piece
                    tileMatrix[y][x].backPiece.colorGroup.push(colorGroups++);
                }

                // tile type 2
                if (tileMatrix[y][x].topRightClass == 'truchetTopRight') {
                    contiguousGroups[contiguousGroups.length] = [];
                    contiguousGroups[contiguousGroups.length - 1].push(tileMatrix[y][x].topRightElement);
                    tileMatrix[y][x].cornerPieceTop.colorGroup.push(colorGroups++);

                    contiguousGroups[contiguousGroups.length] = [];
                    contiguousGroups[contiguousGroups.length - 1].push(tileMatrix[y][x].bottomLeftElement);
                    tileMatrix[y][x].cornerPieceBottom.colorGroup.push(colorGroups++);
                    
                    contiguousGroups[contiguousGroups.length] = [];
                    contiguousGroups[contiguousGroups.length - 1].push(tileMatrix[y][x].bottomRightElement);
                    tileMatrix[y][x].backPiece.colorGroup.push(colorGroups++);
                }
            } 
            
            // top row
            if (tileAbove == null && x > 0) {
                if (tileMatrix[y][x].topRightClass == 'truchetTopRight') {
                    contiguousGroups[contiguousGroups.length] = [];
                    contiguousGroups[contiguousGroups.length - 1].push(tileMatrix[y][x].topRightElement);
                    tileMatrix[y][x].cornerPieceTop.colorGroup.push(colorGroups++);
                }
            }

            // far left column
            if (tileToTheLeft == null && y > 0) {
                if (tileMatrix[y][x].bottomLeftClass == 'truchetBottomLeft') {
                    contiguousGroups[contiguousGroups.length] = [];
                    contiguousGroups[contiguousGroups.length - 1].push(tileMatrix[y][x].bottomLeftElement);
                    tileMatrix[y][x].cornerPieceBottom.colorGroup.push(colorGroups++);
                }
            }

            if (tileToTheLeft != null) {
                contiguousGroups.forEach((group) => {
                    if (group.includes(tileToTheLeft.bottomRightElement)) {
                        group.push(tileMatrix[y][x].bottomLeftElement);
                    }
                    if (group.includes(tileToTheLeft.topRightElement)) {
                        group.push(tileMatrix[y][x].topLeftElement);
                    }
                })

                if (tileMatrix[y][x].bottomLeftClass == 'truchetBottomLeft' && tileToTheLeft.bottomRightClass == 'truchetBottomRight') {
                    tileMatrix[y][x].cornerPieceBottom.colorGroup.push(tileToTheLeft.cornerPieceBottom.colorGroup[0]);
                } else if (tileMatrix[y][x].bottomLeftClass == 'truchetBottomLeft' && tileToTheLeft.bottomRightClass == 'truchetBottomRightToTopLeftBack') {
                    tileMatrix[y][x].cornerPieceBottom.colorGroup.push(tileToTheLeft.backPiece.colorGroup[0]);
                } else if (tileMatrix[y][x].bottomLeftClass == 'truchetBottomLeftToTopRightBack' && tileToTheLeft.bottomRightClass == 'truchetBottomRight') {
                    tileMatrix[y][x].backPiece.colorGroup.push(tileToTheLeft.cornerPieceBottom.colorGroup[0]);
                } else if (tileMatrix[y][x].bottomLeftClass == 'truchetBottomLeftToTopRightBack' && tileToTheLeft.bottomRightClass == 'truchetBottomRightToTopLeftBack') {
                    tileMatrix[y][x].backPiece.colorGroup.push(tileToTheLeft.backPiece.colorGroup[0]);
                }

                if (tileMatrix[y][x].topLeftClass == 'truchetTopLeft' && tileToTheLeft.topRightClass == 'truchetTopRight') {
                    tileMatrix[y][x].cornerPieceTop.colorGroup.push(tileToTheLeft.cornerPieceTop.colorGroup[0]);
                } else if (tileMatrix[y][x].topLeftClass == 'truchetTopLeft' && tileToTheLeft.topRightClass == 'truchetBottomLeftToTopRightBack') {
                    tileMatrix[y][x].cornerPieceTop.colorGroup.push(tileToTheLeft.backPiece.colorGroup[0]);
                } else if (tileMatrix[y][x].topLeftClass == 'truchetBottomRightToTopLeftBack' && tileToTheLeft.topRightClass == 'truchetTopRight') {
                    tileMatrix[y][x].backPiece.colorGroup.push(tileToTheLeft.cornerPieceTop.colorGroup[0]);
                } else if (tileMatrix[y][x].topLeftClass == 'truchetBottomRightToTopLeftBack' && tileToTheLeft.topRightClass == 'truchetBottomLeftToTopRightBack') {
                    tileMatrix[y][x].backPiece.colorGroup.push(tileToTheLeft.backPiece.colorGroup[0]);
                }
            }

            if (tileAbove != null) {
                contiguousGroups.forEach((group) => {
                    if (group.includes(tileAbove.bottomLeftElement)) {
                        group.push(tileMatrix[y][x].topLeftElement);
                    }
                    if (group.includes(tileAbove.bottomRightElement)) {
                        group.push(tileMatrix[y][x].topRightElement);
                    }
                })

                if (tileMatrix[y][x].topLeftClass == 'truchetTopLeft' && tileAbove.bottomLeftClass == 'truchetBottomLeft') {
                    tileMatrix[y][x].cornerPieceTop.colorGroup.push(tileAbove.cornerPieceBottom.colorGroup[tileAbove.cornerPieceBottom.colorGroup.length - 1]);
                } else if (tileMatrix[y][x].topLeftClass == 'truchetTopLeft' && tileAbove.bottomLeftClass == 'truchetBottomLeftToTopRightBack') {
                    tileMatrix[y][x].cornerPieceTop.colorGroup.push(tileAbove.backPiece.colorGroup[tileAbove.backPiece.colorGroup.length - 1]);
                } else if (tileMatrix[y][x].topLeftClass == 'truchetBottomRightToTopLeftBack' && tileAbove.bottomLeftClass == 'truchetBottomLeft') {
                    tileMatrix[y][x].backPiece.colorGroup.push(tileAbove.cornerPieceBottom.colorGroup[tileAbove.cornerPieceBottom.colorGroup.length - 1]);
                } else if (tileMatrix[y][x].topLeftClass == 'truchetBottomRightToTopLeftBack' && tileAbove.bottomLeftClass == 'truchetBottomLeftToTopRightBack') {
                    tileMatrix[y][x].backPiece.colorGroup.push(tileAbove.backPiece.colorGroup[tileAbove.backPiece.colorGroup.length - 1]);
                }

                if (tileMatrix[y][x].topRightClass == 'truchetTopRight' && tileAbove.bottomRightClass == 'truchetBottomRight') {
                    tileMatrix[y][x].cornerPieceTop.colorGroup.push(tileAbove.cornerPieceBottom.colorGroup[tileAbove.cornerPieceBottom.colorGroup.length - 1]);
                } else if (tileMatrix[y][x].topRightClass == 'truchetTopRight' && tileAbove.bottomRightClass == 'truchetBottomRightToTopLeftBack') {
                    tileMatrix[y][x].cornerPieceTop.colorGroup.push(tileAbove.backPiece.colorGroup[tileAbove.backPiece.colorGroup.length - 1]);
                } else if (tileMatrix[y][x].topRightClass == 'truchetBottomLeftToTopRightBack' && tileAbove.bottomRightClass == 'truchetBottomRight') {
                    tileMatrix[y][x].backPiece.colorGroup.push(tileAbove.cornerPieceBottom.colorGroup[tileAbove.cornerPieceBottom.colorGroup.length - 1]);
                } else if (tileMatrix[y][x].topRightClass == 'truchetBottomLeftToTopRightBack' && tileAbove.bottomRIghtClass == 'truchetBottomRightToTopLeftBack') {
                    tileMatrix[y][x].backPiece.colorGroup.push(tileAbove.backPiece.colorGroup[tileAbove.backPiece.colorGroup.length - 1]);
                }

            }

            if (tileMatrix[y][x].bottomRightClass == 'truchetBottomRight') {
                contiguousGroups[contiguousGroups.length] = [];
                contiguousGroups[contiguousGroups.length - 1].push(tileMatrix[y][x].bottomRightElement);
                tileMatrix[y][x].cornerPieceBottom.colorGroup.push(colorGroups++);
            }

            console.log(`colorGroups: ${colorGroups}`);
        }
    }

    
    console.log(contiguousGroups);
    console.log(tileMatrix);
    contiguousGroups.forEach((group) => {
        let randHexColor = "#" + Math.floor(Math.random()*16777215).toString(16);
        group.forEach((part) => {
            //console.log(part);
            if (part.className.baseVal == 'truchetBottomLeftToTopRightBack' || part.className.baseVal == 'truchetBottomRightToTopLeftBack') {
                // console.log("bang");
                part.style.background = randHexColor;
            } else {
                part.style.fill = randHexColor;
            }
        })
    });


}

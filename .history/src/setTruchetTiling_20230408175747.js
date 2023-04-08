export { setTruchetTiling }
// import { degrees_to_radians } from '/src/utils/trig.js'
// import { pythagorean } from '/src/utils/trig.js'

class TruchetTile {
    constructor(tileWidth, truchetSettings) {
        this.blockContainer = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        this.tileWidth = tileWidth;
        this.strokeWidth = 5;
        this.blockContainer.setAttribute("height", tileWidth);
        this.blockContainer.setAttribute("width", tileWidth);
        this.blockContainer.style.position = "absolute"        

        this.init()
    }

    init() {
        this.drawPieSlice({ centreX: this.tileWidth, centreY: this.tileWidth, startAngleRadians: Math.PI , sweepAngleRadians: Math.PI / 2, radius: (this.tileWidth / 2) + (this.strokeWidth / 2), fillColour: "#000" } );
        this.drawPieSlice({ centreX: this.tileWidth, centreY: this.tileWidth, startAngleRadians: Math.PI , sweepAngleRadians: Math.PI / 2, radius: (this.tileWidth / 2) - (this.strokeWidth / 2), fillColour: "#FFF" } );
        this.drawPieSlice({ centreX: 0, centreY: 0, startAngleRadians: 0 , sweepAngleRadians: Math.PI / 2, radius: (this.tileWidth / 2) + (this.strokeWidth / 2), fillColour: "#000" } );
        this.drawPieSlice({ centreX: 0, centreY: 0, startAngleRadians: 0 , sweepAngleRadians: Math.PI / 2, radius: (this.tileWidth / 2) - (this.strokeWidth / 2), fillColour: "#FFF" } );
      
        return this.blockContainer;
    }

    drawPieSlice(settings)
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
    }

}

function setTruchetTiling(containerSquare, tilingAreaWidthLength, truchetSettings) {
    var tilingArea = containerSquare;
    let truchetRows = truchetSettings["tileDensity"];
    const tileWidth = tilingAreaWidthLength / truchetSettings["tileDensity"];
    

    let tiles = [];
    //let blockCount = -1;
    for (let j = 0; j < truchetRows; j++) {
        tiles[j] = [];

        for (let i = 0; i < truchetRows; i++) {
            tiles[j][i] = new TruchetTile(tileWidth, truchetSettings);
            tiles[j][i].blockContainer.style.top = `${(tilingAreaWidthLength - (tileWidth * j))}px`;
            tiles[j][i].blockContainer.style.left = `${(50 * i)}px`;
            
            tilingArea.insertAdjacentHTML("beforeend", tiles[j][i].blockContainer.outerHTML);
        }
    }


}

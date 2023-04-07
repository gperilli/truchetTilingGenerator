export { setTruchetTiling }
// import { degrees_to_radians } from '/src/utils/trig.js'
// import { pythagorean } from '/src/utils/trig.js'

class TruchetBlock {

}

function setTruchetTiling(containerSquare, tilingAreaWidthLength, truchetSettings) {

    pieSlice();

    function pieSlice()
    {
        drawPieSlice({ id: "svg", centreX: 100, centreY: 100, startAngleRadians: Math.PI , sweepAngleRadians: Math.PI / 2, radius: 50, fillColour: "#000" } );
        drawPieSlice({ id: "svg", centreX: 100, centreY: 100, startAngleRadians: Math.PI , sweepAngleRadians: Math.PI / 2, radius: 45, fillColour: "#FFF" } );
        drawPieSlice({ id: "svg", centreX: 0, centreY: 0, startAngleRadians: 0 , sweepAngleRadians: Math.PI / 2, radius: 50, fillColour: "#000" } );
        drawPieSlice({ id: "svg", centreX: 0, centreY: 0, startAngleRadians: 0 , sweepAngleRadians: Math.PI / 2, radius: 45, fillColour: "#FFF" } );
    }

    function drawPieSlice(settings)
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
        //arc.setAttributeNS(null, "style", "stroke:" + settings.strokeColour + ";");
        // arc.setAttributeNS(null, "stroke-width:" + 5 + ";");

        document.getElementById(settings.id).appendChild(arc);
    }
}
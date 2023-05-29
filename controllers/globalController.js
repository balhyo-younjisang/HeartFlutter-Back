import User from "../models/User.js";
import Server from "../models/Server.js";

const getDistance = (location_1, location_2) => {
    if ((location_1["lat"] == location_2["lat"]) && (location_1["lon"] == location_2["lon"])) return 0; // same location

    const radLat_1 = Math.PI * location_1["lat"] / 180;
    const radLat_2 = Math.PI * location_2["lat"] / 180;
    const theta = location_1["lon"] - location_2["lon"];

    const radTheta = Math.PI * theta / 180;
    let dist = Math.sin(radLat_1) * Math.sin(radLat_2) + Math.cos(radLat_1) * Math.cos(radLat_2) * Math.cos(radTheta);

    if (dist > 1) dist = 1;

    dist = Math.acos(dist);
    dist = dist * 180 / Math.PI;
    dist = dist * 60 * 1.1515 * 1.609344 * 1000;
    if (dist < 100) dist = Math.round(dist / 10) * 10;
    else dist = Math.round(dist / 100) * 100;

    return dist; //Returns the distance in units meter
}

export const postHome = async (req, res) => {
    const { myLocation, otherLocation, serverCode } = req.body;
    const serverData = await Server.findOne({ code: serverCode });
    const returnData = new Object();

    returnData.dist = getDistance(myLocation, otherLocation);
    returnData.serverData = serverData;

    return res.send(returnData);
}

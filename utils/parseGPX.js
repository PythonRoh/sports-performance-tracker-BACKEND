import fs from "fs";
import xml2js from "xml2js";

export async function parseGPX(filePath) {
  const xml = fs.readFileSync(filePath, "utf-8");
  const parser = new xml2js.Parser();

  const result = await parser.parseStringPromise(xml);

  const points = result.gpx.trk?.[0].trkseg?.[0].trkpt || [];

  const duration = points.length; // simple approx
  const distance = points.length * 0.01; // mock km

  return [
    {
      type: "Running (GPX)",
      duration,
      distance,
      calories: Math.round(distance * 60),
      notes: "Imported from GPX",
      date: new Date(),
    },
  ];
}

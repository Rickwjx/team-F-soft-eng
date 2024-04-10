import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { MapNodeType } from "common/src/map/MapNodeType.ts";
// import MapImage from "../images/00_thelowerlevel1.png";
import { nodesDistances } from "common/src/nodesDistances.ts";
import TopBanner2 from "../components/TopBanner2.tsx";
import L1MapImage from "../images/00_thelowerlevel1.png";
import L2MapImage from "../images/00_thelowerlevel2.png";
import FFMapImage from "../images/01_thefirstfloor.png";
import SFMapImage from "../images/02_thesecondfloor.png";
import TFMapImage from "../images/03_thethirdfloor.png";
import Floor from "../components/FloorTabs.tsx";

function MapEditingPage() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [nodeData, setNodesData] = useState<MapNodeType[]>([]);
  const [distancesData, setDistancesData] = useState<nodesDistances[]>([]);
  const floor = useRef<string>("L1");
  const [currImage, setCurrImage] = useState<HTMLImageElement>(() => {
    const image = new Image();
    image.src = L1MapImage;
    return image;
  });

  async function loadNodeData() {
    const data: MapNodeType[] = (await axios.get("/api/database/nodes")).data;
    setNodesData(data);
  }

  async function loadEdgesDistance() {
    const distancesResponse = await axios.get("/api/testPath");
    if (distancesResponse.status !== 200) {
      throw new Error("Failed to fetch data");
    }
    const distancePath = await distancesResponse.data;
    const distanceData = distancePath.message;
    console.log("distances", distanceData);
    setDistancesData(distanceData);
  }

  const handleFloorChange = (newFloor: string) => {
    const newImage = new Image();

    switch (newFloor) {
      case "L1":
        newImage.src = L1MapImage;
        floor.current = "L1";
        break;
      case "L2":
        newImage.src = L2MapImage;
        floor.current = "L2";
        break;
      case "1":
        newImage.src = FFMapImage;
        floor.current = "1";
        break;
      case "2":
        newImage.src = SFMapImage;
        floor.current = "2";
        break;
      case "3":
        newImage.src = TFMapImage;
        floor.current = "3";
        break;
      default:
        console.error("Returned map floor is not assigned to an image");
        return;
    }
    setCurrImage(newImage);
  };

  useEffect(() => {
    loadNodeData();
    loadEdgesDistance();
    // console.log(nodeData);

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // image.src = MapImage;
    currImage.onload = () => {
      canvas.width = currImage.width;
      canvas.height = currImage.height;

      ctx.drawImage(currImage, 0, 0, canvas.width, canvas.height);

      ctx.lineWidth = 2;
      ctx.strokeStyle = "red";
      ctx.font = "15px Arial";

      for (let i = 0; i < distancesData.length; i++) {
        ctx.beginPath();
        ctx.moveTo(
          distancesData[i].startCoords.x,
          distancesData[i].startCoords.y,
        );
        ctx.lineTo(distancesData[i].endCoords.x, distancesData[i].endCoords.y);
        ctx.stroke();
        ctx.closePath();

        ctx.fillText(
          distancesData[i].distance.toString(),
          (distancesData[i].startCoords.x + distancesData[i].endCoords.x) / 2,
          (distancesData[i].startCoords.y + distancesData[i].endCoords.y) / 2,
        );
      }

      ctx.fillStyle = "blue";
      ctx.strokeStyle = "blue";
      for (let i = 0; i < nodeData.length; i++) {
        ctx.beginPath();
        ctx.arc(nodeData[i].xcoord, nodeData[i].ycoord, 5, 0, 2 * Math.PI); // draw circle
        ctx.fill();
      }
    };
  });

  return (
    <div>
      <TopBanner2 />
      <canvas
        ref={canvasRef}
        style={{
          width: "100%",
          height: "100%",
          zIndex: 0,
          position: "relative",
        }}
        className={"firstFloorCanvas"}
      />

      <Floor callback={handleFloorChange} />
    </div>
  );
}

export default MapEditingPage;

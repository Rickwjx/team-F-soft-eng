import TopBanner from "../components/TopBanner.tsx";
import Carousel from "../components/Carousel.tsx";

function MapPage() {
  return (
    <>
      <div
        style={{
          // Set the background image
          backgroundColor: "#FCFCFC",
        }}
      >
        <TopBanner />
        <Carousel />
      </div>
    </>
  );
}

export default MapPage;

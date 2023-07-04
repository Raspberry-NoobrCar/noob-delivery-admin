import PackageLayer from "./PackageLayer";
import ShelfLayer from "./ShelfLayer";

const CarModel = () => {
  const takeOnce = 4;

  return (
    <div
      className="car-model"
      style={{ margin: "16px" }}
    >
      <div
        className="model-body"
        style={{
          height: "100%",
          display: "flex",
          justifyContent: "center",
          position: "relative"
        }}
      >
        <div className="wrapper" style={{position: "relative"}}>
          <ShelfLayer />
          <PackageLayer take={takeOnce} />
        </div>
      </div>
    </div>
  )
}

export default CarModel;
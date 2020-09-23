import { FunctionalComponent, h } from "preact";
import { AppController, AppView } from "./app-controller";
import { Map } from "./components/Map";
import { Sidebar } from "./components/Sidebar";
import { app } from "./styles";

const App: FunctionalComponent = () => {
  const controller = new AppController();

  return (
    <div className={app}>
      <Sidebar controller={controller}></Sidebar>
      <Map
        tileLayerURL="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        latitude={controller.northFormula.decimalResult}
        longitude={controller.eastFormula.decimalResult}
        visible={controller.view == AppView.MAP}
        controller={controller}
      ></Map>
    </div>
  );
};

export default App;

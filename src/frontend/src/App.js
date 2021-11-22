import Footer from "./components/Footer/Footer";
import Body from "./components/Body/Body";
import Header from "./components/Header/Header";
import "./styles/globals.scss";

const App = () => {
  const appStyle = {
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
  };
  const style = {
    flexGrow: "1",
    height: "auto",
    display: "flex",
    flexDirection: "column",
  };
  return (
    <div style={appStyle}>
      <Header />
      <div style={style}>
        <Body />
        <Footer />
      </div>
    </div>
  );
};

export default App;

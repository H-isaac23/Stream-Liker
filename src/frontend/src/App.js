import Footer from "./components/Footer/Footer";
import Body from "./components/LikeButton/Body";
import Header from "./components/Header/Header";
import "./styles/globals.scss";

const App = () => {
  const style = {
    height: "100vh",
  };
  return (
    <div style={style}>
      <Header />
      <Body />
      <Footer />
    </div>
  );
};

export default App;

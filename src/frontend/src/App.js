import Footer from "./components/Footer/Footer";
import LikeButton from "./components/LikeButton/LikeButton";
import Header from "./components/Header/Header";
import "./styles/globals.scss";

const App = () => {
  const style = {
    height: "100vh",
  };
  return (
    <div style={style}>
      <Header />
      <LikeButton />
      <Footer />
    </div>
  );
};

export default App;

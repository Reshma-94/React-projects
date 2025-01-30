import ImageContainer from "./components/pagination/ImageContainer";
import ToastContainer from "./components/toast-notifications/ToastContainer";
import "./styles.css";

export default function App() {
  return (
    <div className="App">
      <ToastContainer />
      <ImageContainer />
    </div>
  );
}

import Home from "./pages/Home";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Explore from "./pages/Explore";
import Author from "./pages/Author";
import ItemDetails from "./pages/ItemDetails";
import Nav from "./components/Nav";
import Footer from "./components/Footer";
import axios from "axios";
import { useEffect, useState } from "react";
import HotCollections from "./components/home/HotCollections";

function App() {

  const [hotCollections, setHotCollections] = useState([]);

  useEffect(()=> {
    async function fetchHotCollections() {
    try {
      const { data } = await axios.get(
        "https://us-central1-nft-cloud-functions.cloudfunctions.net/hotCollections"
      );

      setHotCollections(data || []);
      console.log(data);
    } catch (error) {
      console.error("Error fetching collections:", error);
      setHotCollections([]);
    }
  };

  fetchHotCollections();
}, []);





  return (
    <Router>
      <Nav />
      <Routes>
        console.log(hotCollections)
        <Route path="/" element={<Home hotCollections={hotCollections} />} />
        <Route path="/explore" element={<Explore />} />
        <Route path="/author" element={<Author />} />
        <Route path="/item-details" element={<ItemDetails />} />
        <Route path="/hotCollections" element={<HotCollections hotCollections={hotCollections} />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;

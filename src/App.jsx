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
import NewItems from "./components/home/NewItems";
import Countdown from "./components/Countdown";
import TopSellers from "./components/home/TopSellers";

function App() {

  const [hotCollections, setHotCollections] = useState([]);
  const [newItems, setNewItems] = useState([]);
  const [topSellers, setTopSellers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(()=> {
    async function fetchHotCollections() {
    try {
      const { data } = await axios.get(
        "https://us-central1-nft-cloud-functions.cloudfunctions.net/hotCollections"
      );

      setHotCollections(data || []);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching collections:", error);
      setHotCollections([]);
    }
  };
  fetchHotCollections();
}, []);

useEffect(()=> {
    async function fetchNewItems() {
    try {
      const { data } = await axios.get(
        "https://us-central1-nft-cloud-functions.cloudfunctions.net/newItems"
      );

      setNewItems(data || []);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching new items:", error);
      setNewItems([]);
    }
  };
  fetchNewItems();
}, []);

useEffect(()=> {
    async function fetchTopSellers() {
    try {
      const { data } = await axios.get(
        "https://us-central1-nft-cloud-functions.cloudfunctions.net/topSellers"
      );
      setTopSellers(data || []);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching top sellers:", error);
      setTopSellers([]);
    }
  };
  fetchTopSellers();
}, []);



  return (
    <Router>
      <Nav />
      <Routes>
        <Route path="/" element={<Home 
          hotCollections={hotCollections} 
          newItems={newItems}
          topSellers={topSellers}
        />} />
        <Route path="/explore" element={<Explore />} />
        <Route path="/author" element={<Author />} />
        <Route path="/item-details" element={<ItemDetails />} />
        <Route path="/hotCollections" element={<HotCollections loading={loading} hotCollections={hotCollections} />} />
        <Route path="/newItems" element={<NewItems loading={loading} newItems={newItems} />} />
        <Route path="/topSellers" element={<TopSellers loading={loading} topSellers={topSellers} />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;

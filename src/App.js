import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { listen } from "quicklink";
import HeroPage from "./HeroPage";
import "./App.css";

function App() {
  useEffect(() => {
    listen();
  }, []);

  const [hoveredImages, setHoveredImages] = useState([]);

  const preloadAllImages = (urls) => {
    const uniqueUrls = Array.from(new Set(urls));
    uniqueUrls.forEach((src) => {
      const img = new Image();
      img.src = src;
    });
  };

  const heroes = [
    {
      name: "8-Bit Demo",
      rarity: "Legendary",
      type: "Constructor",
      perk: "Enduring Machine",
      heroImageURL: "https://b2.fortnitedb.com/file/peepoT/T-Constructor-HID-Constructor-016-M-V1-Blockbuster-SR_T02-L.png",
      backgroundUrl: "https://b2.fortnitedb.com/file/peepoT/s11_000000-min.png",
      perkImage: "https://b2.fortnitedb.com/file/peepoT/Icon-Constructor-EnduringMachine-128.png",
      imageUrls: [
        "https://b2.fortnitedb.com/file/peepoT/Icon-Constructor-BullRush-128.png",
        "https://b2.fortnitedb.com/file/peepoT/Icon-Constructor-PlasmaPulse-128.png",
        "https://b2.fortnitedb.com/file/peepoT/Icon-Constructor-Decoy-128.png",
      ],
    },
  ];

  const preloadHeroImages = (h) => {
    const imagesToPreload = [
      h.backgroundUrl,
      h.heroImageURL,
      h.perkImage,
      ...h.imageUrls,
    ];
    preloadAllImages(imagesToPreload);
    setHoveredImages(imagesToPreload);
  };

  const Home = () => (
    <div className="container">
      <h1>Hero Links Examples: Regular Hyperlink vs. Quicklink (Image Preload)</h1>
      <div className="lists">
        <div className="column">
          <h2>Non‐Quicklink (plain Link to mockup)</h2>
          <ul>
            {heroes.map((h) => (
              <li key={h.name}>
                <Link to={`/hero/${encodeURIComponent(h.name)}`}>
                  {h.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="column">
          <h2>Quicklink + Preload on Hover</h2>
          <ul>
            {heroes.map((h) => (
              <li key={h.name}>
                <Link
                  to={`/hero/${encodeURIComponent(h.name)}`}
                  data-quicklink
                  onPointerEnter={() => preloadHeroImages(h)}
                >
                  {h.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {hoveredImages.length > 0 && (
        <div className="preloaded-preview">
          <h2>Preloaded Images (100×100px)</h2>
          <div className="image-grid">
            {hoveredImages.map((src) => (
              <img key={src} src={src} alt="" className="preview-img" />
            ))}
          </div>
        </div>
      )}
    </div>
  );
  return (
    <BrowserRouter basename="/fortnitedb-hyperlink-mockup">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="hero/:name" element={<HeroPage heroes={heroes} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

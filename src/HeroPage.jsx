import React from "react";
import { useParams, Link } from "react-router-dom";
import "./HeroPage.css";

export default function HeroPage({ heroes }) {
  const { name } = useParams();
  const heroData = heroes.find((h) => h.name === decodeURIComponent(name));

  if (!heroData) {
    return (
      <div className="hero-mockup-container">
        <h2>Hero not found</h2>
        <Link to="/">← Back to Home</Link>
      </div>
    );
  }

  const { rarity, type, perk, backgroundUrl, imageUrls, heroImageURL, perkImage } = heroData;

  return (
    <div
      className="hero-mockup-container"
      style={{
        backgroundImage: `url(${backgroundUrl})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="hero-card">
        <div className="hero-header">
          <div className="hero-header-text">
            <div className="hero-header-line1">
              <span className="hero-rarity">{rarity}</span> | Hero
            </div>
            <div className="hero-header-line2">{heroData.name}</div>
            <div className="hero-header-line3">
              <span className="hero-type">{type}</span> | {perk}
            </div>
          </div>
          <img
            src={heroImageURL}
            alt="Hero Portrait"
            className="ability-icon hero-image-icon"
          />
        </div>

        <div className="hero-body">
          <div className="hero-stats">
            <h3>Hero Stats</h3>
            <ul>
              <li>Health: 20,027</li>
              <li>Shield: 7,603</li>
              <li>Shield Regen Rate: 1,904</li>
              <li>Shield Regen Delay: 8</li>
              <li>Hero Ability Damage: 1.1</li>
              <li>Hero Healing Modifier: 1.07</li>
              <li>Run Speed: 410</li>
              <li>Sprint Speed: 550</li>
            </ul>
          </div>

          <div className="hero-right-section">
            <div className="hero-abilities">
              <h2>Abilities</h2>
              <div className="abilities-grid">
                {imageUrls.map((src, idx) => (
                  <img
                    key={idx}
                    src={src}
                    alt={`Ability Icon ${idx}`}
                    className="ability-icon"
                  />
                ))}
              </div>
            </div>

            <div className="hero-perks">
              <div className="perk-section">
                <h2>STANDARD PERK</h2>
                <img
                  src={perkImage}     
                  alt="Standard Perk Icon"
                  className="perk-icon"
                />
                <h3>ENDURING MACHINE</h3>
                <p>
                  <strong>Explosive</strong> weapons have a{" "}
                  <strong>20%</strong> chance to not consume ammo with each shot.
                </p>
              </div>
              <div className="perk-section">
                <h2>COMMANDER PERK</h2>
                <img
                  src={perkImage}  
                  alt="Commander Perk Icon"
                  className="perk-icon"
                />
                <h3>ENDURING MACHINE +</h3>
                <p>
                  <strong>Explosive</strong> weapons have a{" "}
                  <strong>40%</strong> chance to not consume ammo with each shot.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Link to="/" className="hero-back-link">
        ← Back to Hero List
      </Link>
    </div>
  );
}

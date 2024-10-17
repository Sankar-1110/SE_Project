import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import '../styles/Apifile.css';
import { Link } from 'react-router-dom';


function Apifile() {
  const [search, setSearch] = useState("");
  const [currency, setCurrency] = useState([]);
  const [topMovers, setTopMovers] = useState({ gainers: [], losers: [] });



  

  useEffect(() => {
    axios.get('https://openapiv1.coinstats.app/coins', {
      headers: {
        'X-API-KEY': 'ezqfxMCr43u8rWI699v8oPVFz4Ao5+/x85p3e4SIQEg='
      }
    })
      .then(res => {
        const sortedData = res.data.result.sort((a, b) => b.priceChange1d - a.priceChange1d);  // Sort by 24h change
        setCurrency(res.data.result);

        // Extract top gainers and losers
        const gainers = sortedData.filter(val => val.priceChange1d > 0).slice(0, 5);
        const losers = sortedData.filter(val => val.priceChange1d < 0).slice(0, 5);
        setTopMovers({ gainers, losers });
      })
      .catch(err => console.log(err));
  }, []);

  return (
    <div>
      <Nav className="nav" >
      <div className="navbar-left">
        <Nav.Item>
          <Nav.Link href="/" className="n">Home</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="link-1" className="n">About</Nav.Link>
        </Nav.Item>
      </div>
      <div className="navbar-right login-signup">
        
        <Nav.Item>
          <Nav.Link as={Link} to="/register">Register</Nav.Link>
        </Nav.Item>
      </div>
    </Nav>
    <div className="crypto-container">
      <h1 className="heading">Crypto Currency Prices</h1>
      <input
        type="text"
        className="search-bar"
        placeholder="Search by name..."
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* Top Movers Section */}
      <div className="top-movers">
      {/* Gainers Section */}
      <div className="mover gainers">
        <h2>Top Gainers</h2>
        <ul>
          {/* Render items twice for continuous scrolling */}
          {[...topMovers.gainers, ...topMovers.gainers].map((coin, index) => (
            <li key={index}>
              <div className="mover-item">
                <img src={coin.icon} alt={coin.name} className="mover-icon" />
                <span>{coin.name}</span>
                <span className="mover-change">+{coin.priceChange1d.toFixed(2)}%</span>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* Losers Section */}
      <div className="mover losers">
        <h2>Top Losers</h2>
        <ul>
          {/* Render items twice for continuous scrolling */}
          {[...topMovers.losers, ...topMovers.losers].map((coin, index) => (
            <li key={index}>
              <div className="mover-item">
                <img src={coin.icon} alt={coin.name} className="mover-icon" />
                <span>{coin.name}</span>
                <span className="mover-change red">{coin.priceChange1d.toFixed(2)}%</span>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
       <div className="table-wrapper">
        <table className="crypto-table">
          <thead>
            <tr>
              <th>Rank</th>
              <th>Name</th>
              <th>Symbol</th>
              <th>Market Cap</th>
              <th>Price</th>
              <th>Supply</th>
              <th>Volume (24hr)</th>
            </tr>
          </thead>
          <tbody>
            {currency.filter((val) => val.name.toLowerCase().includes(search.toLowerCase())).map((val) => (
              <tr key={val._id}>
                <td>{val.rank}</td>
                <td className="currency-name">
                  <a href={val.websiteurl}>
                    <img src={val.icon} alt={val.name} className="currency-icon" />
                  </a>
                  {val.name}
                </td>
                <td>{val.symbol}</td>
                <td>${val.marketCap.toLocaleString()}</td>
                <td>${val.price.toFixed(2)}</td>
                <td>{val.availableSupply.toLocaleString()}</td>
                <td>{val.volume.toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
    </div>
  );
}

export default Apifile;

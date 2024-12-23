import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Nav from 'react-bootstrap/Nav';
import { Link } from 'react-router-dom';
import '../styles/Apifile.css';
import Footer from './footer.jsx';
import '../styles/footer.css';
import { useSelector,useDispatch } from 'react-redux';
import { signInFailure, signOutstart, signOutsuccess } from '../redux/user/userslice.js';

function Apifile() {
  const { currentUser } = useSelector((state) => state.user);
  const [search, setSearch] = useState("");
  const [currency, setCurrency] = useState([]);
  const [topMovers, setTopMovers] = useState({ gainers: [], losers: [] });
const dispatch=useDispatch();
  useEffect(() => {
    axios.get('https://openapiv1.coinstats.app/coins', {
      headers: {
        'X-API-KEY': 'ezqfxMCr43u8rWI699v8oPVFz4Ao5+/x85p3e4SIQEg='
      }
    })
      .then(res => {
        const data = res.data.result;
        setCurrency(data);
        const sortedData = [...data].sort((a, b) => b.priceChange1d - a.priceChange1d);  
        const gainers = sortedData.filter(val => val.priceChange1d > 0).slice(0, 5);
        const losers = sortedData.filter(val => val.priceChange1d < 0).slice(0, 5);
        setTopMovers({ gainers, losers });
        
      })
      .catch(err => console.log(err));
  }, []);

  const desiredSymbols = ['btc', 'bnb', 'doge', 'eth', 'sol', 'usdt', 'ton', 'trx', 'usdc', 'xrp'];

  // Filter top movers based on desired symbols
  const filteredGainers = topMovers.gainers.filter(coin => desiredSymbols.includes(coin.symbol.toLowerCase()));
  const filteredLosers = topMovers.losers.filter(coin => desiredSymbols.includes(coin.symbol.toLowerCase()));

  // Filter currencies based on search and desired symbols
  const filteredCurrency = currency.filter((val) =>
    val.name.toLowerCase().includes(search.toLowerCase()) &&
    desiredSymbols.includes(val.symbol.toLowerCase())
  );
  const handleSignout=async()=>{
try{
  dispatch(signOutstart());
const res=await fetch('/api/auth/signout');
const data=await res.json();
if(!res.ok){
  dispatch(signInFailure(data.message))
  return;
}
dispatch(signOutsuccess(data));
}catch(error){
  dispatch(signInFailure(error.message))
}
  }

  return (
    <div className='apifile'>
      <Nav className="nav" activeKey="/home">
      <div className='logo-name'>
        <p href='/home'className='c-name'>PriceProphet</p>
      </div>
        <div className="navbar-left">
          <Nav.Item>
            <Nav.Link href="/" className="n">Home</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link as={Link} to='/about'eventKey="link-1" className="n">About</Nav.Link>
          </Nav.Item>
        
          <Nav.Item>
         {currentUser? <Nav.Link as={Link} onClick={handleSignout} eventKey="link-3">Logout</Nav.Link>:<Nav.Link as={Link} to="/register" eventKey="link-3">Login</Nav.Link>}
          </Nav.Item>
        </div>
      </Nav>

      <div className="crypto-container">
        <h1 className="heading">Crypto Currency Prices</h1>
        <div className='search-out'>
          <div className="search">
            <input
              placeholder="Search..."
              type="text"
              onChange={(e) => setSearch(e.target.value)}
            />
            <button type="submit">Go</button>
          </div>
        </div>

        <div className="top-movers">
          <div className="mover gainers">
            <h2>Top Gainers</h2>
            <ul>
              {filteredGainers.map((coin, index) => (
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

          <div className="mover losers">
            <h2>Top Losers</h2>
            <ul>
              {filteredLosers.map((coin, index) => (
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

        {/* Currency Table */}
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
              {filteredCurrency.map((val) => (
                <tr key={val._id}>
                  <td>{val.rank}</td>
                  <td className="currency-name">
                    {currentUser?
                    <Link to={`/predict/${val.symbol.toLowerCase()}`}>
                      <img src={val.icon} alt={val.name} className="currency-icon" />
                      {val.name}
                    </Link>:<Link to={'/register'}>
                      <img src={val.icon} alt={val.name} className="currency-icon" />
                      {val.name}
                    </Link>
                     }
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
      <Footer/>
    </div>
  );
}

export default Apifile;




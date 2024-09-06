import React, { useEffect, useState } from 'react';
import FilterMenu from './components/FilterMenu/FilterMenu';
import './App.css';
import Listing from './components/Listing/Listing';

const sortOption = {
  'best-match': 1,
  'price-low-high': 2,
  'price-high-low': 3,
};

const fuelOptions = {
  petrol: '1',
  diesel: '2',
  cng: '3',
  lpg: '4',
  electric: '5',
  hybrid: '6'
}

const defaultFilter = {
  fuel: [],
  price: { min: 0, max: 20 },
  sort: 'best-match',
};

const App = () => {
  const [filter, setFilter] = useState(defaultFilter);
  const [cars, setCars] = useState([]);
  const [sortedCars, setSortedCars] = useState([]);

  const handleFilterChange = (key, value) => {
    setFilter((prevFilter) => ({
      ...prevFilter,
      [key]: value,
    }));
  };

  const handleSortChange = (event) => {
    const selectedSort = event.target.value;
    setFilter((prevFilter) => ({
      ...prevFilter,
      sort: selectedSort,
    }));
  };

  const handleFuelChange = (event) => {
    const selectedFuel = event.target.value;
    setFilter((prevFilter) => ({
      ...prevFilter,
      fuel: prevFilter.fuel.includes(selectedFuel)
        ? prevFilter.fuel.filter((fuel) => fuel !== selectedFuel)
        : [...prevFilter.fuel, selectedFuel],
    }));
  };

  const handlePriceChange = (event) => {
    const { name, value } = event.target;
    setFilter((prevFilter) => ({
      ...prevFilter,
      price: {
        ...prevFilter.price,
        [name]: value,
      },
    }));
  };

  const handleClearFilters = () => {
    setFilter(defaultFilter);
  };

  const getQueryString = () => {
    const { fuel, price, sort } = filter;
    const priceQuery = `&budget=${price.min}-${price.max}`;
    const fuelQuery = fuel.map(fuelType => fuelOptions[fuelType]).join('+');
    const queryString = `?${fuelQuery ? `fuel=${fuelQuery}&` : ''}${priceQuery}`;
    return queryString;    
  };

  const fetchCars = async () => {
    const response = await fetch('/api/stocks' + getQueryString());
    const data = await response.json();
    
    if (data && data.stocks) {
    const filteredData = data.stocks.map((car) => ({
      profileId: car.profileId,
      makeName: car.makeName,
      carName: car.carName,
      makeYear: car.makeYear,
      fuel: car.fuel,
      imageUrl: car.imageUrl,
      km: car.km,
      cityName: car.cityName,
      price: car.price,
      priceNumeric: parseFloat(car.price.replace(/[^0-9.-]+/g, '')), // Extract numeric value from price
    }));
    setCars(filteredData);
  } else {
    setCars([]);
  }
  };

  // Sorting logic using useEffect
  useEffect(() => {
    let sorted = [...cars];
    if (filter.sort === 'price-low-high') {
      sorted = sorted.sort((a, b) => a.priceNumeric - b.priceNumeric);
    } else if (filter.sort === 'price-high-low') {
      sorted = sorted.sort((a, b) => b.priceNumeric - a.priceNumeric);
    }
    setSortedCars(sorted);
  }, [filter.sort, cars]);

  useEffect(() => {
    fetchCars();
  }, [filter]);

  return (
    <div className="App">
      <FilterMenu
        filter={filter}
        handlePriceChange={handlePriceChange}
        handleClearFilters={handleClearFilters}
        handleFuelChange={handleFuelChange}
      />
      <Listing filter={filter} cars={sortedCars} handleSortChange={handleSortChange} />
    </div>
  );
};

export default App;

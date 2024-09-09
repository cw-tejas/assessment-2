import React, { useEffect } from 'react';
import './FilterMenu.css';

const FilterMenu = ({ filter, setFilter, defaultFilter }) => {
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

  const handleFuelChange = (event) => {
    const selectedFuel = event.target.value;
    setFilter((prevFilter) => ({
      ...prevFilter,
      fuel: prevFilter.fuel.includes(selectedFuel)
        ? prevFilter.fuel.filter((fuel) => fuel !== selectedFuel)
        : [...prevFilter.fuel, selectedFuel],
    }));
  };

  return (
    <div className='filter'>
      <h1 className='title'>
        <div className='icon-name'>
          <span>
            <img src="https://cdn-icons-png.flaticon.com/512/107/107799.png" alt="filter" height={20} />
          </span>
          <h4>Filters</h4>
        </div>
        <button className='cta-clear' onClick={handleClearFilters}>Clear All</button>
      </h1>

      <div className="budget">
        <input
          type="number"
          onChange={handlePriceChange}
          value={filter.price.min}
          name="min"
          id="min"
          min="0"
          max={filter.price.max}
        />
        <span>-</span>
        <input
          type="number"
          onChange={handlePriceChange}
          value={filter.price.max}
          name="max"
          id="max"
          min={filter.price.min}
        />
      </div>

      <div className="fuel">
        <h1>Fuel</h1>
        <div>
          <input
            type="checkbox"
            id="petrol"
            value="petrol"
            onChange={handleFuelChange}
            checked={filter.fuel.includes('petrol')}
          />
          <label htmlFor="petrol">Petrol</label>
        </div>
        <div>
          <input
            type="checkbox"
            id="diesel"
            value="diesel"
            onChange={handleFuelChange}
            checked={filter.fuel.includes('diesel')}
          />
          <label htmlFor="diesel">Diesel</label>
        </div>
        <div>
          <input
            type="checkbox"
            id="cng"
            value="cng"
            onChange={handleFuelChange}
            checked={filter.fuel.includes('cng')}
          />
          <label htmlFor="cng">CNG</label>
        </div>
        <div>
          <input
            type="checkbox"
            id="lpg"
            value="lpg"
            onChange={handleFuelChange}
            checked={filter.fuel.includes('lpg')}
          />
          <label htmlFor="lpg">LPG</label>
        </div>
        <div>
          <input
            type="checkbox"
            id="electric"
            value="electric"
            onChange={handleFuelChange}
            checked={filter.fuel.includes('electric')}
          />
          <label htmlFor="electric">Electric</label>
        </div>
        <div>
          <input
            type="checkbox"
            id="hybrid"
            value="hybrid"
            onChange={handleFuelChange}
            checked={filter.fuel.includes('hybrid')}
          />
          <label htmlFor="hybrid">Hybrid</label>
        </div>
      </div>
    </div>
  );
};

export default FilterMenu;

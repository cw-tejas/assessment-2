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
          data-testid="min"
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
          data-testid="max"
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
            id="Petrol"
            value="Petrol"
            onChange={handleFuelChange}
            checked={filter.fuel.includes('Petrol')}
          />
          <label htmlFor="Petrol">Petrol</label>
        </div>
        <div>
          <input
            type="checkbox"
            id="Diesel"
            value="Diesel"
            onChange={handleFuelChange}
            checked={filter.fuel.includes('Diesel')}
          />
          <label htmlFor="Diesel">Diesel</label>
        </div>
        <div>
          <input
            type="checkbox"
            id="CNG"
            value="CNG"
            onChange={handleFuelChange}
            checked={filter.fuel.includes('CNG')}
          />
          <label htmlFor="CNG">CNG</label>
        </div>
        <div>
          <input
            type="checkbox"
            id="LPG"
            value="LPG"
            onChange={handleFuelChange}
            checked={filter.fuel.includes('LPG')}
          />
          <label htmlFor="LPG">LPG</label>
        </div>
        <div>
          <input
            type="checkbox"
            id="Electric"
            value="Electric"
            onChange={handleFuelChange}
            checked={filter.fuel.includes('Electric')}
          />
          <label htmlFor="Electric">Electric</label>
        </div>
        <div>
          <input
            type="checkbox"
            id="Hybrid"
            value="Hybrid"
            onChange={handleFuelChange}
            checked={filter.fuel.includes('Hybrid')}
          />
          <label htmlFor="Hybrid">Hybrid</label>
        </div>
      </div>
    </div>
  );
};

export default FilterMenu;

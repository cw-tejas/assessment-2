import React, { useEffect } from 'react'
import './Listing.css'
import Card from '../Card/Card'


const Listing = ({filter, cars, handleSortChange}) => {    

  return (
    <div className='grid-container'>
        <div className='sort-tool'>
          <span>Sort By: </span>
          <select onChange={handleSortChange} value={filter.sort} name="cars" id="cars">
            <option value="best-match">Best Match</option>
            <option value="price-low-high">Price - Low to High</option>
            <option value="price-high-low">Price - High to Low</option>
          </select>
        </div>
        <div className="grid-item" id='listing'>
          {
            cars.map((car) => {
              return (
                <Card key={car.profileId} car={car} />
              )
            })
          }  
        </div>
    </div>
  )
}

export default Listing
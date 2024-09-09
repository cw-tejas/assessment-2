import React from "react";
import { screen, fireEvent, waitFor, render, getByText, getByLabelText, getAllByText } from "@testing-library/react";
import App from "../App";

// mock fetch
global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () =>
      Promise.resolve({
        stocks: [
          {
            profileId: 1,
            makeName: "Toyota",
            carName: "Corolla",
            makeYear: 2020,
            fuel: "Petrol",
            imageUrl: "toyota-corolla.jpg",
            km: 5000,
            cityName: "Mumbai",
            price: "1500000",
          },
          {
            profileId: 2,
            makeName: "Honda",
            carName: "Civic",
            makeYear: 2019,
            fuel: "Diesel",
            imageUrl: "honda-civic.jpg",
            km: 10000,
            cityName: "Navi Mumbai",
            price: "1800000",
          },
        ],
      }),
  })
);


describe('App component', () => {

    beforeEach(() => {
        fetch.mockClear();
    });

    it('renders the FilterMenu and Listings components', async () => {
        render(<App />);

        expect(screen.getByText(/Filters/i)).toBeInTheDocument();
        expect(screen.getByText(/Sort by/i)).toBeInTheDocument();

        await waitFor(() => {
            expect(screen.getByText(/Corolla/i)).toBeInTheDocument();
            expect(screen.getByText(/Civic/i)).toBeInTheDocument();
        })
    });

    xit('applies price filter correctly', async () => {
        render(<App/>);

        const priceInputMin = screen.getByTestId('min');
        fireEvent.change(priceInputMin, { target: { value: 16, name: 'min'}});
        console.log(priceInputMin);

        // check if min price is applied correctly
        expect(priceInputMin.value).toBe('16');
    });

    it("fetches and displays car listings", async () => {
      render(<App />);

      await waitFor(() => {
        expect(screen.getAllByText(/Make Offer/i)).toHaveLength(2);
      });
    });
})
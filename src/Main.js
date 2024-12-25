import React, { useState } from "react";
import MultiStepForm from "./MultiStepForm";

const Main = () => {
  const [showForm, setShowForm] = useState(false);

  const handleSearchClick = () => {
    setShowForm(true);
  };

  const handlePlaceholderClick = () => {
    setShowForm(true);
  };

  return (
    <main className="banner-full min-h-[60vh] max-h-[80vh] md:px-4 md:py-10 relative">
      <div className="w-full mx-auto">
        <div className="md:px-0 py-6">
          <h2 className="text-white text-lg md:text-5xl font-rubik capitalize font-semibold">
            local Heros,
            <br />
            <span className="block mt-3">expert standards</span>
          </h2>
          <p className="text-white text-sm md:text-2xl pt-3 capitalize">
            vetted and approved tradespeople ready to tackle
            <br /> your project today!!!
          </p>
        </div>
        <div className="">
          <div>
            <h4 className="block md:hidden text-center text-white text-xl font-bold">
              Find Your Approved Tradesperson
            </h4>
          </div>
          <div>
            <div className="search-bar">
              <input
                type="text"
                className="searchBox"
                placeholder="Trade (e.g. Electrician)"
                onClick={handlePlaceholderClick}
              />
              <button className="searchButton" onClick={handleSearchClick}>
                Search
              </button>
            </div>
            <div className="absolute top-2 right-2 md:top-10 md:right-10">
              {showForm && <MultiStepForm onClose={() => setShowForm(false)} />}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Main;

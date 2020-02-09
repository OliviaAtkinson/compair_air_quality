import React from 'react';
import '../styles/autocomplete.css';
import MagGlass from '../assets/icons/magnifying-glass.svg';

const Autocomplete = ({
    filteredSuggestions,
    showSuggestions,
    userInput,
    handleChange,
    handleClick
}) => {
    // Dropdown list is shown if conditions are met.
    let suggestionsListComponent;
    if (showSuggestions && userInput) {
        if (filteredSuggestions.length) {
            suggestionsListComponent = (
                <ul className="suggestions">
                    {filteredSuggestions.map((suggestion, index) => {
                        return (
                            <p key={index} onClick={handleClick}>
                                {suggestion}
                            </p>
                        );
                    })}
                </ul>
            );
        } else {
            suggestionsListComponent = null;
        }
    }
    return (
        <div id="suggestion-container">
            <div id="styled-input">
                <img src={MagGlass} alt="imageGlass" />
                <input
                    className="input"
                    type="text"
                    placeholder="Enter city name..."
                    onChange={handleChange}
                    value={userInput}
                />
            </div>
            {suggestionsListComponent}
        </div>
    );
};

export default Autocomplete;

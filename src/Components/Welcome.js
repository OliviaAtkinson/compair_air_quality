import React from 'react';
import Autocomplete from './Autocomplete';
import '../styles/welcome.css';

const Welcome = props => {
    return (
        <div className="welcome">
            <h1>Compare your Air</h1>
            <p>Compare the air quality between cities in the UK.</p>
            <p>Select cities to compare using the search tool below.</p>
            {/* Autocomplete component containing props.*/}
            <Autocomplete
                handleChange={props.handleChange}
                handleClick={props.handleClick}
                showSuggestions={props.showSuggestions}
                filteredSuggestions={props.filteredSuggestions}
                userInput={props.userInput}
            />
        </div>
    );
};

export default Welcome;

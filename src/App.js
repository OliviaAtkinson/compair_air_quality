import React, { Component } from 'react';
import Welcome from './Components/Welcome';
import Card from './Components/Card';
import './styles/app.css';

class App extends Component {
    state = {
        data: [],
        cities: [],
        filteredSuggestions: [],
        showSuggestions: false,
        userInput: '',
        search: ''
    };

    //Fetch cities to populate autocomplete search before components are rendered.
    async componentDidMount() {
        const citiesURL = 'https://api.openaq.org/v1/cities?country=GB';
        const citiesResponse = await fetch(citiesURL);
        const citieslist = await citiesResponse.json();
        // console.log(citieslist);
        let citiesArray = [];

        for (const result of citieslist.results) {
            citiesArray.push(result.city);
        }

        // console.log(citiesArray);
        this.setState({ cities: citiesArray });
    }

    //Handles the dropdown based on city input.
    handleInputChange = e => {
        const { cities } = this.state;
        const userInput = e.currentTarget.value;
        const filteredSuggestions = cities.filter(
            city =>
                city
                    .toLowerCase()
                    .slice(0, userInput.length)
                    .indexOf(userInput.toLowerCase()) > -1
        );

        this.setState({
            userInput: e.currentTarget.value,
            filteredSuggestions: filteredSuggestions,
            showSuggestions: true
        });
    };

    //Fetching city names from api and setting it to the data state.
    handleSubmit = async () => {
        const url = `https://api.openaq.org/v1/latest?country=GB&city=${this.state.search}`;
        const response = await fetch(url);
        const data = await response.json();

        let result = [...this.state.data];
        result.push(data.results[0]);
        this.setState({
            data: result
        });
    };

    //When user selects option the state is updated, and handleSubmit method is called.
    handleInputClick = async e => {
        await this.setState({
            activeSuggestion: 0,
            filteredSuggestions: [],
            showSuggestions: false,
            userInput: '',
            search: e.currentTarget.innerText
        });

        this.handleSubmit();
    };

    //Removing a card when user clicks the X by splicing it from the array of cards.
    handleRemove = index => {
        //spread operator
        let result = [...this.state.data];
        result.splice(index, 1);
        this.setState({ data: result });
    };

    render() {
        // console.log(this.state.userInput);
        return (
            <div>
                <Welcome
                    handleChange={this.handleInputChange}
                    handleClick={this.handleInputClick}
                    showSuggestions={this.state.showSuggestions}
                    filteredSuggestions={this.state.filteredSuggestions}
                    userInput={this.state.userInput}
                />
                <div className="card-container">
                    <Card
                        data={this.state.data}
                        handleRemove={this.handleRemove}
                    />
                </div>
            </div>
        );
    }
}

export default App;

/**
 * Got help with this section along with the other components,
 * I struggled with the Autocomplete.js making the dropdown appear
 * when conditions are met, `handleRemove` method,
 * and conditional rendering in Card.js.
 * Someone broke the problem down with me
 * and I was able to figure parts out from there
 * such as implementing props and state.
 * Used momentjs for parsing the date of when the location had been last updated.
 * https://momentjs.com/
 */

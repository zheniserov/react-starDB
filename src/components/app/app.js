import React, { Component } from 'react';
import Header from '../header';
import RandomPlanet from '../random-planet';
import ErrorIndicator from '../error-indicator';
import PeoplePage from '../people-page/people-page';
import ItemList from '../item-list';
import PersonalDetails from '../person-details';
import SwapiService from '../../services/swapi-service';


export default class App extends Component {

    swapiService = new SwapiService(); 
    state = {
        hasError: false
    };



    componentDidCatch() {
        this.setState({
            hasError: true
        })
    }


    render() {
        if (this.state.hasError) {
            return <ErrorIndicator />;
        }
        return (
            <div className="App container">
                <div className="row">
                    <div className="col-sm-2"></div>
                    <div className="col-sm-8">
                        <Header />
                        <RandomPlanet />
                        <PeoplePage />
                        <ItemList 
                            onItemSelected={this.onPersonselected} 
                            getData={this.swapiService.getAllPlanets}
                            renderItem={(item=>item.name)}
                        />
                        <PersonalDetails personId={this.state.selectedPerson} />
                        <ItemList 
                            onItemSelected={this.onPersonselected} 
                            getData={this.swapiService.getAllStarships}
                            renderItem={(item=>item.name)}
                        />
                        <PersonalDetails personId={this.state.selectedPerson} />
                    </div>
                    <div className="col-sm-2"></div>
                </div>

            </div>
        );
    };
};

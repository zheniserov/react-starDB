import React, { Component } from 'react'

import ItemList from '../item-list';
import PersonalDetails from '../person-details';
import ErrorIndicator from '../error-indicator';
import SwapiService from '../../services/swapi-service';


export default class PeoplePage extends Component {

    swapiService = new SwapiService(); 

    state = {
        selectedPerson:1,
        hasError: false
    };

    componentDidCatch(){
        this.setState({
            hasError:true
        })
    }

    onPersonselected = (id) => {
        this.setState({
            selectedPerson:id
        });
    };

    render() {
        if(this.state.hasError){
            return <ErrorIndicator />;
        }
        return (
            <div>
                <ItemList 
                    onItemSelected={this.onPersonselected}
                    getData={this.swapiService.getAllPeople}
                    renderItem={(item=>item.name)}
                />
                <PersonalDetails personId={this.state.selectedPerson} />
            </div>
        )
    };
};

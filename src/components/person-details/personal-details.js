import React, { Component } from 'react';

import SwapiService from '../../services/swapi-service';

import './personal-details.css';
import Spinner from '../spinner/spinner';

export default class PersonalDetails extends Component {

    swapiService = new SwapiService();

    state = {
        person: null,
        loading: true
    }

    componentDidMount() {
        this.updatePerson();
    }
    componentDidUpdate(prevProps) {
        if (prevProps.personId !== this.props.personId) {
            this.updatePerson()
        }
    }

    onLoadingPerson = (person => {
            this.setState({
                person,
                loading: false
            })

    })

    updatePerson() {
        const { personId } = this.props;
        if (!personId) {
            return;
        }

        this.swapiService
            .getPerson(personId)
            .then(this.onLoadingPerson)
    };

    render() {
        const { person, loading } = this.state;

        const spinner = loading ? <Spinner /> : null;
        const content = !loading ? <DetailsView person={person} /> : null;



        return (
            <div className="personal__details jumbotron">
                {spinner}
                {content}
            </div>
        );
    };
};

const DetailsView = ({ person }) => {
    const { id, name, birthYear, gender, eyeColor } = person;
    return (
        <React.Fragment>
            <div className="personal__details__image">
                <img src={`https://starwars-visualguide.com/assets/img/characters/${id}.jpg`} className="rounded float-left" alt="character" />
            </div>
            <div className="personal__details__info">
                <h1>{name}</h1>
                <table className="table table-dark">
                    <tbody>
                        <tr>
                            <td>Gender: {gender}</td>
                        </tr>
                        <tr>
                            <td>Birth day: {birthYear}</td>
                        </tr>
                        <tr>
                            <td>Eye color: {eyeColor}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </React.Fragment>
    )
}


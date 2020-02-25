import React, { Component } from 'react';
import SwapiService from '../../services/swapi-service';


import './random-planet.css';
import Spinner from '../spinner/spinner';
import ErrorIndicator from '../error-indicator';

export default class RandomPlanet extends Component {

    swapiService = new SwapiService();

    state = {
        planet: {},
        loading: true,
        error: false
    };



    componentDidMount() {
        this.updatePlanet();
        this.interval = setInterval(()=>{this.updatePlanet()}, 3500);
    }
    componentWillUnmount() {
        clearInterval(this.interval);
    }

    onPlanetLoaded = (planet) => {
        this.setState({
            planet,
            loading: false
        })
    }

    onError = (error) => {
        this.setState({
            error: true,
            loading: false
        });
    };

    updatePlanet() {
        const id = Math.floor(Math.random() * 25 + 2);
        this.swapiService
            .getPlanet(id)
            .then(this.onPlanetLoaded)
            .catch(this.onError);
    };

    render() {
        const { planet, loading, error } = this.state;

        const hasData = !(loading || error);
        const errorMessage = error ? <ErrorIndicator /> : null;
        const spinner = loading ? <Spinner /> : null;
        const content = hasData ? <PlanetView planet={planet} /> : null;

        return (
            <div className="jumbotron random__planet">
                {errorMessage}
                {spinner}
                {content}
            </div>
        );
    }
}


const PlanetView = ({ planet }) => {
    const { id, name, population, diameter, rotationPeriod } = planet;

    return (
        <div className="random__planet__inner">
            <div className="random__planet__image">
                <img src={`https://starwars-visualguide.com/assets/img/planets/${id}.jpg`} className="rounded float-left" alt="planet" />
            </div>
            <div className="random__planet__info">
                <h1>{name}</h1>
                <table className="table table-dark">
                    <tbody>
                        <tr>
                            <td>Population: {population}</td>
                        </tr>
                        <tr>
                            <td>Rotation period: {rotationPeriod}</td>
                        </tr>
                        <tr>
                            <td>Diametr: {diameter}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    )

}

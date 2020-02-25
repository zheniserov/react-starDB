
export default class SwapiService {

    _apiBase = 'https://swapi.co/api';

     getResource = async (url) => {
        const res = await fetch(`${this._apiBase}${url}`);
        if (!res.ok) {
            throw new Error(`could not fetch ${url}, received ${res.status}`)
        }
        return await res.json();
    }

    getAllPeople = async() =>{
        const res = await this.getResource(`/people/`);
        return res.results.map(this._transformPerson);
    }
    getPerson = async(id) => {
        const person = await this.getResource(`/people/${id}/`);
        return this._transformPerson(person);
    }


     getAllPlanets = async ()=> {
        const res = await this.getResource(`/planets/`);
        return res.results.map(this._transformPlanet);
    }
    getPlanet = async(id) => {
        const planet = await this.getResource(`/planets/${id}/`);
        return this._transformPlanet(planet);
    }


     getAllStarships = async () =>{
        const res = await this.getResource(`/starships/`);
        return res.results.map(this._transformStarship);
    }
    getStarships = async(id) => {
        const starship = await this.getResource(`/starships/${id}/`);
        return this._transformStarship(starship);
    }



    _transformPerson = (person) =>{
        const idRegExp = /([0-9]*)\/$/;
        const id = person.url.match(idRegExp)[1];
        return {
            id:id, 
            name: person.name,
            gender: person.gender,
            birthYear: person.birth_year,
            eyeColor: person.eye_color
        };
    }

    _transformPlanet = (planet) =>{
        const idRegExp = /([0-9]*)\/$/;
        const id = planet.url.match(idRegExp)[1];
        return {
            id: id,
            name: planet.name,
            population: planet.population,
            rotationPeriod: planet.rotation_period,
            diameter: planet.diameter
        };
    }

    _transformStarship = (starship) =>{
        const idRegExp = /([0-9]*)\/$/;
        const id = starship.url.match(idRegExp)[1];
        return {
            id: id,
            name: starship.name,
            model: starship.model,
            manufacturer: starship.manufacturer,
            costInCredits: starship.costInCredits,
            length: starship.length,
            crew: starship.crew,
            passengers: starship.passengers,
            cargoCapacity: starship.cargoCapacity
        };
    }
    
}

const swapi = new SwapiService();

swapi.getAllPeople()
    .then((body) => {
        body.forEach(p => {
            // console.log(p.name);
        });
    })
swapi.getPlanet(3)
    .then((planet) => {
        // console.log(planet.terrain);
    })
swapi.getAllStarships()
    .then((planet) => {
        planet.forEach(element => {
            //console.log(element.name);
        });
    })


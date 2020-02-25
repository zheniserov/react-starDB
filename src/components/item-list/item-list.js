import React, { Component } from 'react';

import SwapiService from '../../services/swapi-service';
import Spinner from '../spinner/spinner';

export default class ItemList extends Component {


    state = {
        itemList: null
    }

    componentDidMount() {
        const { getData } = this.props;
        getData()
            .then((itemList) =>
                this.setState({
                    itemList
                }))
    }

    renderItems(arr) {
        return arr.map((person) => {
            return (
                <li className="list-group-item list-group-item-action"
                    key={person.id}
                    onClick={() => this.props.onItemSelected(person.id)}
                >
                    {person.name}
                </li>
            )
        });
    };

    render() {
        const { itemList } = this.state;
        if (!itemList) {
            return <Spinner />;
        }
        const list = this.renderItems(itemList);
        return (

            <div className="personal__list jumbotron">
                <ul className="list-group">
                    {list}
                </ul>
            </div>

        );
    };
};




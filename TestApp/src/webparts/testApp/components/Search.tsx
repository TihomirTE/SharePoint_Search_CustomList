import * as React from 'react';
import styles from './TestApp.module.scss';
import { Label, DefaultButton, SearchBox, TextField } from 'office-ui-fabric-react';


class Search extends React.Component<{ OnClickValue }, { inputValue }> {
    constructor(props) {
        super();
        this.handleClick = this.handleClick.bind(this);
        this.handleChange = this.handleChange.bind(this);

        this.state = {
            inputValue: ''
        };
    }

    private handleChange = (e) => {
        this.setState({
            inputValue: e.target.value.toLowerCase()
        });
        //this.props.onInputValue(e.target.value);
    }

    private handleClick = (e) => {
        e.preventDefault();

        this.props.OnClickValue(this.state.inputValue);
    }

    render() {
        return (
            <div>
                <input
                    className={styles.searchBox}
                    type="text"
                    onChange={this.handleChange} />
                <input
                    className="ms-Button"
                    type="button"
                    value="Search"
                    onClick={this.handleClick}
                />
            </div>
        );
    }
}

export default Search;
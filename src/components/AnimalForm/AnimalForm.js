import React, {Component} from 'react';
import {connect} from 'react-redux';
import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button";

class AnimalForm extends Component {

    state = {
        incoming: {
            species: '',
            class: ''
        }
    }
  
    handleChangeFor = (parameter, event) => {
        if (parameter === "species") {
            this.setState({
                 incoming:{
                          ...this.state.incoming,
                    [parameter]: event.target.value,
                }
            });
        }else if (parameter === "class"){
            this.setState({
                incoming:{
                          ...this.state.incoming,
                    [parameter]: event.target.value,
                }
            });
        }
    }

  updateAnimals = () => {
      this.props.dispatch({type:'ADD_ANIMAL', payload: this.state.incoming});
  };

  render() {
    return (
      <div>
        <form>
          <label>Species Name</label>
          <input
            type="text"
            placeholder="Species Name"
            onChange={(event) => this.handleChangeFor("species", event)}
          />
          <br />
          <br />
          <label>Class Name</label>
          <input
            type="text"
            placeholder="Class Name"
            onChange={(event) => this.handleChangeFor("class", event)}
          />
          <Link to="/">
            <Button
              variant="contained"
              color="primary"
              size="large"
              onClick={(event) => this.updateAnimals()}
            >
              Save
            </Button>
          </Link>
        </form>
      </div>
    );
  }
}



export default connect() (AnimalForm);
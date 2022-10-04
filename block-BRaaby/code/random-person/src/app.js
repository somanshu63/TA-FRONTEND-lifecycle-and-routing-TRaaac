import React from "react";
import "./style.css";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      person: null,
      key: "My name is",
      value: "",
    };
  }
  componentDidMount() {
    fetch(`https://randomuser.me/api/`)
      .then((data) => data.json())
      .then((data) =>
        this.setState({
          person: data.results[0],
          value: `${data.results[0].name.title} ${data.results[0].name.first} ${data.results[0].name.last}`,
          key: "My name is",
        })
      );
  }
  handlePerson = () => {
    this.componentDidMount();
  };
  handleChange = (value, key) => {
    this.setState({
      key: key,
      value: value,
    });
  };
  render() {
    return (
      <div className="main">
        <div className="bg-black"></div>
        <div className="bg-lightgray"></div>
        {this.state.person ? (
          <Person
            state={this.state}
            handleChange={this.handleChange}
            handlePerson={this.handlePerson}
          />
        ) : (
          <Loader />
        )}
      </div>
    );
  }
}
function Person(props) {
  return (
    <div className="person">
      <div className="person-bg-lightgray"></div>
      <div className="details text-center">
        <img
          className="image"
          src={props.state.person.picture.medium}
          alt={props.state.person.name.first}
        ></img>
        <p className="title fs-14 margin-1">{props.state.key}</p>
        <h2 className="answer text-cap fs-24 margin-1">{props.state.value}</h2>
        <div className="flex buttons justify-center">
          <i
            onClick={() => {
              props.handleChange(
                `${props.state.person.name.title} ${props.state.person.name.first} ${props.state.person.name.last}`,
                "My name is"
              );
            }}
            className="fa-solid fs-20 fa-user"
          ></i>
          <i
            onClick={() => {
              props.handleChange(props.state.person.email, "My email is");
            }}
            className="fa-solid fs-20 fa-envelope-open"
          ></i>
          <i
            onClick={() => {
              props.handleChange(props.state.person.dob.age, "My age is");
            }}
            className="fa-solid fs-20 fa-calendar-xmark"
          ></i>
          <i
            onClick={() => {
              props.handleChange(
                props.state.person.location.street.number +
                  " " +
                  props.state.person.location.street.name +
                  " " +
                  props.state.person.location.city,
                "My street is"
              );
            }}
            className="fa-solid fs-20 fa-map"
          ></i>
          <i
            onClick={() => {
              props.handleChange(props.state.person.phone, "My phone is");
            }}
            className="fa-solid fs-20 fa-phone-flip"
          ></i>
          <i
            onClick={() => {
              props.handleChange(
                props.state.person.login.password,
                "My password is"
              );
            }}
            className="fa-solid fs-20 fa-lock"
          ></i>
        </div>
        <button className="random margin-1" onClick={props.handlePerson}>
          Random User
        </button>
      </div>
    </div>
  );
}

function Loader() {
  return (
    <div className="progress">
      <div className="color"></div>
    </div>
  );
}

export default App;

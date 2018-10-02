import React from "react";
import { Link } from "react-router-dom";
import Loader from "../common/loader";
import Icon from "../common/icons";

class EventDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false
    };
  }
  componentDidMount() {
    this.getEventDetails();
  }

  getEventDetails = () => {
    this.setState({
      isLoading: true
    });
    setTimeout(() => {
      this.setState({
        isLoading: false
      });
    }, 1000);
  };

  render() {
    const { isLoading } = this.state;
    if (isLoading) {
      return (
        <div className="page-loading">
          <Loader />
        </div>
      );
    }
    return (
      <div className="container">
        <div className="page-header">
          <Link to="/" className="back-button">
            &larr;
          </Link>
          Event Details: <span>{`#${this.props.match.params.id}`}</span>
        </div>
        <div className="page-content">
          <div className="row">
            <div className="col-8">
              <div className="event-meta">
                <h1>Chennai PY Meetup</h1>
                <p>
                  <span className="event-meta-item">
                    <Icon name="user" size={16} />
                    Hosted by <strong>Sivadass N</strong>
                  </span>
                </p>
                <p>
                  <span className="event-meta-item">
                    <Icon name="calendar" size={16} />
                    <strong>October 3, 2018 11:52 AM</strong>
                  </span>
                </p>
                <p>
                  <span className="event-meta-item">
                    <Icon name="location" size={14} />
                    Chennai
                  </span>
                  <span className="event-meta-item">
                    <Icon name="duration" size={14} />
                    {`${4} hours`}
                  </span>
                </p>
              </div>
              <div className="event-description">
                Industrial Light & Magic (ILM) was started in 1975 by filmmaker
                George Lucas, in order to create the special effects for the
                original Star Wars film. Since then, ILM has grown into a visual
                effects powerhouse that has contributed not just to the entire
                Star Wars series, but also to films as diverse as Forrest Gump,
                Jurassic Park, Who Framed Roger Rabbit, Raiders of the Lost Ark,
                and Terminator 2. ILM has won numerous Academy Awards for Best
                Visual Effects, not to mention a string of Clio awards for its
                work on television advertisements. While much of ILM's early
                work was done with miniature models and motion controlled
                cameras, ILM has long been on the bleeding edge of computer
                generated visual effects. Its computer graphics division dates
                back to 1979, and its first CG production was the 1982 Genesis
                sequence from Star Trek II: The Wrath of Khan.
              </div>
            </div>
            <div className="col-4">
              <h3>Are you going?</h3>
              <div className="event-actions">
                <Link to="/" className="button button-link">
                  RSVP NOW
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default EventDetails;

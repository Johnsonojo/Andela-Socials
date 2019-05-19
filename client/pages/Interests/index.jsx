import React from 'react';
import { connect } from 'react-redux';
import InterestCard from '../../components/cards/InterestCard';
import { createInterests, removeInterests, getUserInterests } from '../../actions/graphql/interestGQLActions'
import { bindActionCreators } from 'redux';


/**
 * @description allows users to select their interests
 *
 * @class Interests
 * @extends {React.Component}
 */
class Interests extends React.Component {
  state = {
    interests: [],
    unjoinedInterests: [],
    joinInterests: []
  }

  /**
   * React Lifecycle hook
   *
   * @memberof Interests
   * @returns {null}
   */
  async componentDidMount() {
    const { interests, getUserInterests} = this.props;
    await getUserInterests();
    const myInterests = interests.interests.joinedCategories;
    this.setState({
      interests: myInterests.map(interest => interest.followerCategory)
    });

  }

  /**
   * @description Select a particular interest on click
   * 
   * @memberof Interests
   */
  handleClick = (category, cancel = false) => {
    if (cancel) {
      return this.setState((prevState) => {
        const { interests } = prevState;
        const interest = interests.findIndex(interest => interest.id === category.node.id);
        const unjoinedInterest = interests.splice(interest, 1);
        return {
          interests: interests,
          unjoinedInterests: [...prevState.unjoinedInterests, unjoinedInterest[0]],
        }
      })
    }
    this.setState((prevState) => ({
      interests: [...prevState.interests, category.node],
      joinInterests: [...prevState.joinInterests, category.node]
    }));
  }

  /**
   * @description For creating and removing interests after interests selection 
   *
   * @memberof Interests
   */
  createInterests = () => {
    const { unjoinedInterests, joinInterests } = this.state;
    const interestsToAdd = joinInterests.map(i => i.id);
    const interestsToRemove = unjoinedInterests.map(i => i.id);
    if (joinInterests.length > 0) {
      this.props.createInterests(interestsToAdd)
    }
    if (unjoinedInterests.length > 0) {
      this.props.removeInterests(interestsToRemove);
    }
  }


  render() {
    const { categoryList } = this.props;
    const nextButtonLabel = this.state.interests.length > 0 ? 'Create' : 'Next';
    const cancelButtonLabel = this.state.interests.length > 0 ? 'Skip' : 'Cancel';

    return (
      <div className="interests-page">
        <h2 className="interests-page__header">Choose activities that interest you.</h2>
        <p className="interests-page__subheader">Select and deselect interests below.</p>
        <div className="interests">
          {
            categoryList && categoryList.map((category) => {
              const { node: { name, id } } = category;

              return <InterestCard
                key={id}
                category={category}
                name={name}
                handleClick={this.handleClick}
                active={!!this.state.interests.find(interest => interest.id == id)}
              />
            })
          }
        </div>
        <footer>

          <button
            className="interests__btn interests__btn-cancel"
            type="button"
          >{cancelButtonLabel}</button>
          <button
            className="interests__btn interests__btn-submit" onClick={this.createInterests}
          > {nextButtonLabel}</button>
        </footer>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  categoryList: state.socialClubs.socialClubs || [],
  interests: state.interests,
});

const mapDispatchToProps = dispatch => bindActionCreators(
  {
    getUserInterests,
    createInterests,
    removeInterests,
  },
  dispatch
);

export default connect(mapStateToProps, mapDispatchToProps)(Interests);

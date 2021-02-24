import { connect } from 'react-redux';
import { composeGoal, fetchGoals, removeGoal } from '../../actions/goal_actions';
import Goals from './goals';
import { asArray } from '../../reducers/selectors';

const mapStateToProps = (state) => {
  return {
    currentUser: state.session.user,
    goals: asArray(state)
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchGoals: () => dispatch(fetchGoals()),
    composeGoal: goal => dispatch(composeGoal(goal)),
    removeGoal: id => dispatch(removeGoal(id))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Goals);







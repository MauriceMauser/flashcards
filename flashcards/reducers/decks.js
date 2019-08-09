import { CREATE_DECK, ADD_CARD } from '../actions/decks';

export default function decks (state={}, action) {
  switch (action.type) {
    case CREATE_DECK:
      return {
        ...state,
        [action.title]: {
          title: action.title,
          questions: []
        } 
      };

    case ADD_CARD:
      return {
        ...state,
        [action.title]: {
          title: action.title,
          questions: state[action.title].questions.concat([action.card])
        }
      };

    default:
      return state;
  }
}
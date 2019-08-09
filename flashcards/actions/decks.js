import { saveDeckTitle, addCardToDeck } from '../utils/api';

export const ADD_CARD = 'ADD_CARD';
export const CREATE_DECK = 'CREATE_DECK';

function addCard(title, card) {
  return {
    type: ADD_CARD,
    title,
    card
  }
}

function createDeck (title) {
  return {
    type: CREATE_DECK,
    title
  }
}

export function handleAddCard(title, card) {
  return (dispatch, getState) => {
    return addCardToDeck(title, card)
      .then(dispatch(addCard(title, card)))
  }
}

export function handleCreateDeck(title) {
  return (dispatch, getState) => {
    return saveDeckTitle(title)
      .then(dispatch(createDeck(title)))
  }
}

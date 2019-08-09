import { AsyncStorage } from 'react-native';

export async function getDecks() {
  return Promise.all(AsyncStorage.getAllKeys()
    .then(keys => keys.map(key => JSON.parse(getDeck(key))))
    .catch(error => console.log("Error getting all decks: ", error))
  )
}

export async function getDeck(id) {
  try {
    const deck = await AsyncStorage.getItem(id);
    return JSON.parse(deck);
  } catch (error) {
    console.log("Error getting deck by id: ", error);
  }
}

export async function saveDeckTitle (title) {
  const deck = {
    title,
    questions: []
  }
  try {
    return AsyncStorage.setItem(title, JSON.stringify(deck));
  } catch (error) {
    console.log("Error saving deck title: ", error)
  }
}

export async function addCardToDeck (title, card) {
  try {
    const { questions } = await getDeck(title);
    return AsyncStorage.mergeItem(title, JSON.stringify({
      title,
      questions: questions.concat([card])
    }))
  } catch (error) {
    console.log("Error adding card to deck: ", error);
  }
}
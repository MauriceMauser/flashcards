import React from 'react';
import { createStackNavigator } from 'react-navigation';
import DeckListView from '../components/DeckListView';
import DeckView from '../components/DeckView';
import NewQuestionView from '../components/NewQuestionView';
import QuizView from '../components/QuizView';

export default createStackNavigator({
  Overview: DeckListView,
  Deck: DeckView,
  NewQuestion: NewQuestionView,
  Quiz: QuizView,
})

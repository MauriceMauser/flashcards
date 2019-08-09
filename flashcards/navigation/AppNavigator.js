import React from 'react';
import { createBottomTabNavigator, createAppContainer } from 'react-navigation';
import NewDeckView from '../components/NewDeckView';
import MainStackNavigator from './MainStackNavigator';

MainStackNavigator.navigationOptions = {
  tabBarLabel: 'FlashCards',
}

NewDeckView.navigationOptions = {
  tabBarLabel: 'Add Deck',
}

const RootNavigator = createBottomTabNavigator({
  Main: MainStackNavigator,
  NewDeck: NewDeckView,
})

const AppNavigator = createAppContainer(RootNavigator);
export default AppNavigator;

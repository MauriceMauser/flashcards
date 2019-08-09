import React, { Component } from 'react';
import { 
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  StyleSheet 
} from 'react-native';
import { connect } from 'react-redux';

const DeckItem = ({ deck, navigation }) => {
    const { title, questions } = deck;
    return (
      <TouchableOpacity 
        onPress={() => navigation.navigate('Deck', { 
          title: title 
        })}
      >
        <View style={styles.item}>
          <View style={styles.field}>
            <Text>{title}</Text>
          </View>
          <View style={styles.field}>
            <Text>{`${questions.length} cards in deck`}</Text>
          </View>
        </View>
      </TouchableOpacity>
    )
}

class DeckListView extends Component {
  componentDidMount() {
    this._navListener = this.props.navigation.addListener('didFocus', () => {
      this.forceUpdate();
    });
  }
  render() {
    const { decks, navigation } = this.props;
    return (decks ? 
        <ScrollView>
          {decks.map(deck => <DeckItem deck={deck} navigation={navigation} />)}
        </ScrollView>
      : <View />
    );
  }
}

function mapStateToProps (decks) {
  return {
    decks: Object.keys(decks).map(title => decks[title])
  }
}

export default connect (mapStateToProps) (DeckListView);

const styles = StyleSheet.create({
  item: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    marginVertical: 40,
    borderColor: 'lightgray',
    width: '100%'
  },
  field: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center'
  }
});

import React, { Component } from 'react';
import { View, Text, Button, Animated, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import {
  clearLocalNotification,
  setLocalNotification
} from '../utils/notifications';

const ScoreView = ({ correctCount, total, startOver, navigation }) => (
  <View style={styles.container}>
    <View>
      <Text>
        Your Score: {(correctCount * 100 / total).toFixed(0)}%
      </Text>
    </View>
    <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-evenly' }}>
      <Button
        title="Start Over"
        onPress={startOver}
        color="lightBlue"
      />
      <Button
        title="View Deck"
        onPress={() => navigation.navigate('Deck', { title: navigation.state.params.title })}
        color="darkgray"
      />
    </View>
  </View>
)

class QuizView extends Component {
  state = {
    peek: false,
    cardIndex: 0,
    correctCount: 0,
  }

  componentDidMount() {
    // Reference: https://codedaily.io/screencasts/12/Create-a-Flip-Card-Animation-with-React-Native
    this.animatedValue = new Animated.Value(0);
    this.value = 0;
    this.animatedValue.addListener(({ value }) => {
      this.value = value;
    });
    this.frontInterpolate = this.animatedValue.interpolate({
      inputRange: [0, 180],
      outputRange: ['0deg', '180deg'],
    });
    this.backInterpolate = this.animatedValue.interpolate({
      inputRange: [0, 180],
      outputRange: ['180deg', '360deg']
    });

  }
  
  handleSubmit = async correct => {
    const { cardIndex } = this.state;
    const { decks, navigation } = this.props;
    const { questions } = decks[navigation.state.params.title]; 
    const card = questions[cardIndex];
    const { question, answer } = card || { answer: '', question: '' };
    this.setState(prev => ({ 
      cardIndex: prev.cardIndex + 1,
      correctCount: prev.correctCount + Number(correct),
    }));
    (cardIndex === questions.length) && await clearLocalNotification()
    setLocalNotification();
  }

  togglePeek = () => {
    if (this.value >= 90) {
      Animated.spring(this.animatedValue, {
        toValue: 0,
        friction: 8,
        tension: 10,
      }).start();
    } else {
      Animated.spring(this.animatedValue, {
        toValue: 180,
        friction: 8,
        tension: 10,
      }).start();
    }
    this.setState(prev => ({ peek: !prev.peek }));
  }

  startOver = () => this.setState({
    cardIndex: 0,
    correctCount: 0,
    peek: false
  })

  render() {
    // Reference: https://codedaily.io/screencasts/12/Create-a-Flip-Card-Animation-with-React-Native
    const frontAnimatedStyle = {
      transform: [
        { rotateY: this.frontInterpolate }
      ]
    };
    const backAnimatedStyle = {
      transform: [
        { rotateY: this.backInterpolate }
      ]
    }

    const { decks, navigation } = this.props;
    const { peek, cardIndex, correctCount } = this.state;
    const { questions } = decks[navigation.state.params.title];
    const card = questions[cardIndex];
    const { answer, question } = card || { answer: '', question: '' };
    const done = cardIndex >= questions.length;

    return (done 
      ? <ScoreView 
          correctCount={correctCount} 
          total={questions.length || 0}
          startOver={this.startOver}
          navigation={navigation}
        /> 
      : <View style={styles.container}>
          <Animated.View 
            style={
                    peek ? [styles.flipCard, styles.flipCardBack, backAnimatedStyle] 
                        : [styles.flipCard, frontAnimatedStyle]
                  }
          >
            <View>
              <Text style={styles.flipText}>
                {`${this.state.cardIndex} / ${questions.length}`}
              </Text>
            </View>
            <View>
              <Text 
                style={[styles.flipText, { fontSize: 30}]}
              >
                {peek ? answer : question}
              </Text>
            </View>
            <View>
              <Text
                style={[styles.flipText, { color: 'red' }]}
                onPress={this.togglePeek}
              >
                {peek ? "Question" : "Answer"}
              </Text>
            </View>
            <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-evenly' }}>
              <Button
                title="Correct"
                onPress={() => this.handleSubmit(true)}
                color="green"
              />
              <Button
                title="Incorrect"
                onPress={() => this.handleSubmit(false)}
                color="red"
              />
            </View>
            <Text>
              {`${questions.length - this.state.cardIndex} cards remaining`}
            </Text>
            <Text>
              {`${(this.state.correctCount * 100 / questions.length).toFixed(0)}% correct`}
            </Text>
          </Animated.View>
        </View>
    );
  }
}

function mapStateToProps (decks) {
  return {
    decks,
  }
}

export default connect (mapStateToProps) (QuizView);

// Reference: https://codedaily.io/screencasts/12/Create-a-Flip-Card-Animation-with-React-Native
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  flipCard: {
    width: 200,
    height: 200,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'lightblue',
    backfaceVisibility: 'hidden',
  },
  flipCardBack: {
    backgroundColor: 'lightgray',
    // position: 'absolute',
    // top: 0,
  },
  flipText: {}
});

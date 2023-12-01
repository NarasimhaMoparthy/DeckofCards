import React, { useState, useEffect } from "react";
import { Button, FormControl, Form, Row } from "react-bootstrap";

const Cards = () => {
  const [state, setState] = useState({
    NumberofCardtoDraw: 0,
    CurrentDeckofCards: 52,
    ToggleSortButton: false,
    DrawCards: [],
    DeckofCards: [
        {id : 1, card :'2', suit: "Clubs"},
        {id : 2, card :'3', suit: "Clubs"},
        {id : 3, card :'4', suit: "Clubs"},
        {id : 4, card :'5', suit: "Clubs"},
        {id : 5, card :'6', suit: "Clubs"},
        {id : 6, card :'7', suit: "Clubs"},
        {id : 7, card :'8', suit: "Clubs"},
        {id : 8, card :'9', suit: "Clubs"},
        {id : 9, card :'10', suit: "Clubs"},
        {id : 10, card :'J', suit: "Clubs"},
        {id : 11, card :'Q', suit: "Clubs"},
        {id : 12, card :'K', suit: "Clubs"},
        {id : 13, card :'A', suit: "Clubs"},
        {id : 14, card :'2', suit: "Spates"},
        {id : 15, card :'3', suit: "Spates"},	  
        {id : 16, card :'4', suit: "Spates"},	  
        {id : 17, card :'5', suit: "Spates"},	  
        {id : 18, card :'6', suit: "Spates"},	  
        {id : 19, card :'7', suit: "Spates"},	  
        {id : 20, card :'8', suit: "Spates"},	  
        {id : 21, card :'9', suit: "Spates"},	  
        {id : 22, card :'10', suit: "Spates"},	  
        {id : 23, card :'J', suit: "Spates"},	  
        {id : 24, card :'Q', suit: "Spates"},	  
        {id : 25, card :'K', suit: "Spates"},	  
        {id : 26, card :'A', suit: "Spates"},	  
        {id : 27, card :'2', suit: "Hearts"},
        {id : 28, card :'3', suit: "Hearts"},
        {id : 29, card :'4', suit: "Hearts"},
        {id : 30, card :'5', suit: "Hearts"},
        {id : 31, card :'6', suit: "Hearts"},
        {id : 32, card :'7', suit: "Hearts"},
        {id : 33, card :'8', suit: "Hearts"},
        {id : 34, card :'9', suit: "Hearts"},
        {id : 35, card :'10', suit: "Hearts"},
        {id : 36, card :'J', suit: "Hearts"},
        {id : 37, card :'Q', suit: "Hearts"},
        {id : 38, card :'K', suit: "Hearts"},
        {id : 39, card :'A', suit: "Hearts"},
        {id : 40, card :'2', suit: "Diamond"},
        {id : 41, card :'3', suit: "Diamond"},
        {id : 42, card :'4', suit: "Diamond"},
        {id : 43, card :'5', suit: "Diamond"},
        {id : 44, card :'6', suit: "Diamond"},
        {id : 45, card :'7', suit: "Diamond"},
        {id : 46, card :'8', suit: "Diamond"},
        {id : 47, card :'9', suit: "Diamond"},
        {id : 48, card :'10', suit: "Diamond"},
        {id : 49, card :'J', suit: "Diamond"},
        {id : 50, card :'Q', suit: "Diamond"},
        {id : 51, card :'K', suit: "Diamond"},
        {id : 52, card :'A', suit: "Diamond"}
    ],
  });

  useEffect(() => {
    // componentDidUpdate logic (equivalent to the class-based component's componentDidUpdate)
  }, [state]);

  const shiffleCards = () => {
    let cards = [...state.DeckofCards];
    var counter = cards.length,
      temp,
      index;
    while (counter > 0) {
      index = Math.floor(Math.random() * counter);
      counter--;
      temp = cards[counter];
      cards[counter] = cards[index];
      cards[index] = temp;
    }

    // Drawn cards are added back to the deck
    if (state.DrawCards !== undefined) {
      let inc = 0;
      while (inc < state.DrawCards.length) {
        cards.push(state.DrawCards[inc]);
        inc++;
      }
    }

    setState({
      ...state,
      ToggleSortButton: false,
      CurrentDeckofCards: 52,
      DrawCards: [],
      DeckofCards: cards,
    });
  };

  const drawCards = () => {
    // Return if no value passed from the UI
    if (state.NumberofCardtoDraw === 0) {
      return;
    }

    let cards = [...state.DeckofCards];
    var counter = cards.length,
      temp,
      index;

    let drawcards = state.DrawCards !== undefined ? [...state.DrawCards] : [];

    const drawnCards = state.CurrentDeckofCards - state.NumberofCardtoDraw;
    while (counter > drawnCards) {
      index = Math.floor(Math.random() * counter);
      counter--;
      temp = cards[counter];
      cards[counter] = cards[index];
      cards[index] = temp;
      drawcards.push(cards[index]);
    }

    let filteredDeckofCards = [...state.DeckofCards];
    let incr = 0;
    while (incr < drawcards.length) {
      filteredDeckofCards = filteredDeckofCards.filter(function (item) {
        return item.id !== drawcards[incr].id;
      });
      incr++;
    }

    setState({
      ...state,
      ToggleSortButton: drawcards.length > 0,
      CurrentDeckofCards: drawnCards,
      DrawCards: drawcards,
      DeckofCards: filteredDeckofCards,
    });
  };

  const sortCards = () => {
    let cards = [...state.DrawCards];
    let sortedCardList = cards.sort((a, b) => {
      if (a.id > b.id) {
        return 1;
      }
      if (a.id < b.id) {
        return -1;
      }
      return 0;
    });

    setState({
      ...state,
      DrawCards: sortedCardList,
    });
  };

  const renderCards = (cards) =>
    cards.map((item, index) => (
      <div key={index} className="card">
        <div className="cleft">{item.card}</div>
        <div className="padding3">{item.suit}</div>
        <div className="cright">{item.card}</div>
      </div>
    ));

  const renderDeckofCards = renderCards(state.DeckofCards);

  let renderDrawnCards = [];
  if (state.DrawCards !== undefined) {
    renderDrawnCards = renderCards(state.DrawCards);
  }

  return (
    <Form>
      <Row>
        <Form.Group controlId="formShuffle">
          <Button onClick={shiffleCards}>Shuffle</Button>
        </Form.Group>
      </Row>
      <Row>{renderDeckofCards}</Row>
      <Row>
        <Form.Group controlId="formDraw">
          <Form.Label>
            Enter number of cards to be drawn from deck
          </Form.Label>
          <FormControl
            placeholder="Number"
            type="number"
            required
            onChange={(event) =>
              setState({
                ...state,
                NumberofCardtoDraw: event.target.value,
              })
            }
          ></FormControl>
          <Button data-testid="drawButton" onClick={drawCards}>
            Draw
          </Button>
        </Form.Group>
      </Row>
      <Row>
        <Form.Group controlId="formSort">
          <Row>{renderDrawnCards}</Row>
          {state.ToggleSortButton && <Button onClick={sortCards}>Sort</Button>}
        </Form.Group>
      </Row>
    </Form>
  );
};

export default Cards;

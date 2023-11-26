import React, { Component } from "react";
import {Button, FormControl, Form, Row} from "react-bootstrap";

class Cards extends Component {
    constructor (){
        super();
        this.state ={
          NumberofCardstobeDrawn : 0,
          CurrentDeckofCards : 52,
          ToggleSortButton : false,
          DrawCards : [],
          DeckofCards : [
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
            {id : 52, card :'A', suit: "Diamond"}]
        };

        this.shiffleCards = this.shiffleCards.bind(this);
        this.drawCards = this.drawCards.bind(this);
        this.sortCards = this.sortCards.bind(this);
      }
      
      shiffleCards() {
        let cards = this.state.DeckofCards;
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
       
        if(this.state.DrawCards !== undefined){
        let inc = 0;
        while(inc < this.state.DrawCards.length){
          cards.push(this.state.DrawCards[inc]);
          inc++;
        }}
        
        this.setState({ToggleSortButton : false});
        this.setState({CurrentDeckofCards : 52});
        this.setState({DrawCards : []});
        this.setState({DeckofCards : cards});
      };

      drawCards(){
        if(this.state.NumberofCardstobeDrawn === 0){
          return;
        }

        let cards = this.state.DeckofCards;
        var counter = cards.length,
          temp,
          index;
          
        let drawcards = [];
        if(this.state.DrawCards !== undefined){
          drawcards = this.state.DrawCards;
        }

        const drawnCards = this.state.CurrentDeckofCards-this.state.NumberofCardstobeDrawn;  
        while (counter > drawnCards) {
          index = Math.floor(Math.random() * counter);
          counter--;
          temp = cards[counter];
          cards[counter] = cards[index];
          cards[index] = temp;
          drawcards.push(cards[index]);
        }

        let filteredDOC = this.state.DeckofCards;
        let incr = 0;
        while(incr<drawcards.length){
          filteredDOC = filteredDOC.filter(function (item) {
          return item.id !== drawcards[incr].id;});
          incr++;
        }

        if(drawcards.length>0){
          this.setState({ToggleSortButton : true});
        }
        this.setState({CurrentDeckofCards : drawnCards});
        this.setState({DrawCards : drawcards});
        this.setState({DeckofCards : filteredDOC});
      };

      sortCards(){
        let cards = this.state.DrawCards;
        let sortedCardList = cards.sort(function(a,b){
          let x = a.id;
          let y = b.id;
          if(x>y){return 1;}
          if(x<y){return -1;}
          return 0;})

          this.setState({DrawCards : sortedCardList});
      };

    render(){  
      const renderDeckofCards = this.state.DeckofCards.map((item, index) => 
        <div kye={index} className="card">
            <div className="cleft">{item.card}</div>
            <div className="padding3">{item.suit}</div>
            <div className="cright">{item.card}</div>
        </div>)

      let renderDrawCards = [];  
      if(this.state.DrawCards !== undefined){
      renderDrawCards = this.state.DrawCards.map((item, index) => 
        <div kye={index} className="card">
            <div className="cleft">{item.card}</div>
            <div className="padding3">{item.suit}</div>
            <div className="cright">{item.card}</div>
        </div>)}

        const Cards = 
            <Form>
              <Row>
                <Form.Group controlId="formShuffle">
                  <Button onClick={this.shiffleCards}>Shuffle</Button>
                </Form.Group>
              </Row>
              <Row>
                {renderDeckofCards}
              </Row>
              <Row>
                <Form.Group controlId="formDraw">
                  <Form.Label>Enter number of cards to be drawn from deck</Form.Label>
                  <FormControl type="number" required onChange={event => this.setState({NumberofCardstobeDrawn: event.target.value})}></FormControl>
                  <Button onClick={this.drawCards}>Draw</Button>
                </Form.Group>
              </Row>
              <Row>
              <Form.Group controlId="formSort" >
                <Row>
                    {renderDrawCards}
                </Row>
                  {this.state.ToggleSortButton && <Button onClick={this.sortCards}>Sort</Button>}
                </Form.Group>
              </Row>
            </Form>
        return Cards;
    }
} 

export default Cards;
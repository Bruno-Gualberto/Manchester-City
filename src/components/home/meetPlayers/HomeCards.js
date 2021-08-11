import React from 'react';
import { easePolyOut } from 'd3-ease';
import Animate from 'react-move/Animate';
import Card from '../../utils/player_card';

import Otamendi from '../../../Resources/images/players/Otamendi.png';
import Sterling from '../../../Resources/images/players/Raheem_Sterling.png';
import Kompany from '../../../Resources/images/players/Vincent_Kompany.png';

let cards = [
  {
    bottom: 90,
    left: 300,
    player: Kompany,
    number: 4,
    firstName: 'Vincent',
    lastName: 'Kompany'
  },
  {
    bottom: 60,
    left: 200,
    player: Sterling,
    number: 7,
    firstName: 'Raheem',
    lastName: 'Sterling'
  },
  {
    bottom: 30,
    left: 100,
    player: Otamendi,
    number: 30,
    firstName: 'Nicolas',
    lastName: 'Otamendi'
  },
  {
    bottom: 0,
    left: 0,
    player: Kompany,
    number: 4,
    firstName: 'Vincent',
    lastName: 'Kompany'
  }
]

const HomeCards = (props) => {

  const showAnimateCards = () => (
    cards.map((card, i) => (
      <Animate
        key={i}
        show={props.show}
        start={{
          left: 0,
          bottom: 0
        }}
        enter={{
          left: [card.left],
          bottom: [card.bottom],
          timing: {delay: 500, duration: 500, ease: easePolyOut}
        }}
      >
        {({left, bottom}) => (
          <div
            style={{
              position: 'absolute',
              left,
              bottom
            }}
          >
            <Card
              number={card.number}
              firstName={card.firstName}
              lastName={card.lastName}
              bck={card.player}
            />
          </div>
        )}
      </Animate>
    ))
  )

  return (
    <div>
      {showAnimateCards()}
    </div>
  )
}

export default HomeCards;
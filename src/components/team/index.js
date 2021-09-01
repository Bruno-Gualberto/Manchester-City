import React, { useState, useEffect } from 'react';
import Card from '../utils/player_card';
import { Slide } from 'react-awesome-reveal';
import { showErrorToast } from '../utils/tools';
import { Promise } from 'core-js';
import { CircularProgress } from '@material-ui/core';

import { firebase, playersCollection } from '../../firebase';

const Team = () => {
  const [loading, setLoading] = useState(true);
  const [players, setPlayers] = useState(null);

  useEffect(() => {
    if (!players) {
      playersCollection.get()
      .then(snapshot => {
        const players = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }))
        let promises = [];
        players.forEach((player, i) => {
          promises.push(
            new Promise((resolve, reject) => {
              firebase.storage().ref('players')
              .child(player.image).getDownloadURL()
              .then(url => {
                players[i].url = url;
                resolve();
              }).catch(error => reject())
            })
          )
        });
        Promise.all(promises).then(() => {
          setPlayers(players)
        })
      }).catch(error => showErrorToast(error))
      .finally(() => setLoading(false))
    }
  }, [players])

  const showPlayerByCategory = category => (
    players ? 
      players.map((player, i) => {
        return player.position === category ? 
          <Slide left triggerOnce key={player.id}>
            <div className="item">
              <Card
                number={player.number}
                firstName={player.name}
                lastName={player.lastname}
                bck={player.url}
              />
            </div>
          </Slide>
        :null
      })
    :null
  )
  return (
    <div className="the_team_container">
      {loading ? 
        <div className="progress">
          <CircularProgress/>
        </div>  
      :
        <div>
          <div className="team_category_wrapper">
            <div className="title">Keepers</div>
            <div className="team_cards">
              {showPlayerByCategory('Keeper')}
            </div>
          </div>

          <div className="team_category_wrapper">
            <div className="title">Defence</div>
            <div className="team_cards">
              {showPlayerByCategory('Defence')}
            </div>
          </div>

          <div className="team_category_wrapper">
            <div className="title">Midfield</div>
            <div className="team_cards">
              {showPlayerByCategory('Midfield')}
            </div>
          </div>

          <div className="team_category_wrapper">
            <div className="title">Strikers</div>
            <div className="team_cards">
              {showPlayerByCategory('Striker')}
            </div>  
          </div>
        </div>
      }
    </div>
  )
}

export default Team;
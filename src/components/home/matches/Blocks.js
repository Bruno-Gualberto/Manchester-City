import React, { useState, useEffect } from 'react';
import { Slide } from 'react-awesome-reveal';
import { matchesCollection } from '../../../firebase';
import MatchesBlock from '../../utils/matches_block';

const Blocks = () => {
  const [matches, setMatches] = useState([]);

  useEffect(() => {
    if (!matches.length > 0) {
      matchesCollection.get()
      .then(snapshot => {
        const matchesData = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }))
        setMatches(matchesData);
      })
      .catch(error => console.log(error))
    }
  }, [matches]);

  const showMatches = matches => (
    matches ? 
      matches.map(match => (
        <Slide bottom key={match.id} className="item" triggerOnce>
          <div>
            <div className="wrapper">
              <MatchesBlock match={match}/>
            </div>
          </div>
        </Slide>
      ))
    :
    null
  )

  return (
    <div className="home_matches">
      {showMatches(matches)}
    </div>
  )
}

export default Blocks;
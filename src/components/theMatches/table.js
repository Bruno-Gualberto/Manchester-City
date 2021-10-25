import React, { useEffect, useState } from 'react';
import { positionsCollection } from '../../firebase';

import { showErrorToast } from '../utils/tools';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow
} from '@material-ui/core';

const LeagueTable = () => {
  const [position, setPosition] = useState(null);

  useEffect(() => {
    if (!position) {
      positionsCollection.get()
      .then(snapshot => {
        const positions = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }))
        setPosition(positions);
      }).catch(error => showErrorToast('Sorry, something went wrong!', error))
    }
  }, [position])

  const showTeamPositions = () => (
    position ? 
      position.map((pos, i) => (
        <TableRow key={i}>
          <TableCell>{i + 1}</TableCell>
          <TableCell>{pos.team}</TableCell>
          <TableCell>{pos.w}</TableCell>
          <TableCell>{pos.l}</TableCell>
          <TableCell>{pos.d}</TableCell>
          <TableCell>{pos.pts}</TableCell>
        </TableRow>
      ))
    :null
  )

  return (
    <div className="league_table_wrapper">
      <div className="title">
        League table
      </div>
      <div>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Pos</TableCell>
              <TableCell>Team</TableCell>
              <TableCell>W</TableCell>
              <TableCell>L</TableCell>
              <TableCell>D</TableCell>
              <TableCell>Pts</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {showTeamPositions()}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}

export default LeagueTable;
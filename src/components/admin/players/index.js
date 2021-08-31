import React, { useEffect, useState } from 'react';
import AdminLayout from '../../../hoc/AdminLayout';
import { Link } from 'react-router-dom';

import { playersCollection } from '../../../firebase';
import { showErrorToast } from '../../utils/tools';
import { 
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Paper,
  CircularProgress
} from '@material-ui/core';

const AdminPlayers = () => {
  const [loading, setLoading] = useState(false);
  // list of players that will be rendered and every time a new player is added, it will rerender with the old and recent added players
  const [players, setPlayers] = useState(null);
  // to store the last player rendered on the list, so I don't need to do lots of requests to database
  const [lastPlayerVisible, setLastPlayerVisible] = useState(null);

  // as soon as the component loads, I need to fetch the data from firebase:
  useEffect(() => {
    if (!players) {
      setLoading(true);
      playersCollection.limit(2)
      .get()
      .then(snapshot => {
        const lastLoadedPlayer = snapshot.docs[snapshot.docs.length -1];
        const playersList = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }))
        setLastPlayerVisible(lastLoadedPlayer);
        setPlayers(playersList);
      })
      .catch(error => showErrorToast(error))
      .finally(() => setLoading(false))
    }
  }, [players])

  const loadMorePlayers = () => {
    if (lastPlayerVisible) {
      setLoading(true);
      playersCollection.startAfter(lastPlayerVisible)
      .limit(2)
      .get()
      .then(snapshot => {
        const lastLoadedPlayer = snapshot.docs[snapshot.docs.length -1];
        const newPlayersList = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }))
        setLastPlayerVisible(lastLoadedPlayer);
        setPlayers([...players, ...newPlayersList]);
      }).catch(error => showErrorToast(error))
      .finally(() => setLoading(false));
    } else {
      showErrorToast('nothing to load')
    }
  }

  return (
    <AdminLayout title="The players">
      <div className="mb-5">
        <Button
          disableElevation
          variant="outlined"
          component={Link}
          to={'/admin_players/add_player'}
        >
          Add player
        </Button>
      </div>

      <Paper className="mb-5">
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>First name</TableCell>
              <TableCell>Last name</TableCell>
              <TableCell>Number</TableCell>
              <TableCell>Position</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {players ? 
              players.map(player => (
                <TableRow key={player.id}>
                  <TableCell>
                      {player.name}
                  </TableCell>
                  <TableCell>
                      {player.lastname}
                  </TableCell>
                  <TableCell>
                    {player.number}
                  </TableCell>
                  <TableCell>
                    {player.position}
                  </TableCell>
                  <TableCell className="td_button">
                    <Link to={`/admin_players/edit_player/${player.id}`}>
                      <button>
                        Edit player
                      </button>
                    </Link>
                  </TableCell>
                </TableRow>
              ))
            :null}
          </TableBody>
        </Table>
      </Paper>

      <Button
        variant="contained"
        color="primary"
        disabled={loading}
        onClick={() => loadMorePlayers()}
      >
        Load more
      </Button>

      <div className="admin_progress">
        {loading ? 
          <CircularProgress thickness={7} style={{color: '#98c5e9'}}/>
        :null}
      </div>
    </AdminLayout>
  )
}

export default AdminPlayers;
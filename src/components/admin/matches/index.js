import React, { useEffect, useState } from 'react';
import AdminLayout from '../../../hoc/AdminLayout';
import { Link } from 'react-router-dom';

import { matchesCollection } from '../../../firebase';
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

const AdminMatches = () => {
  const [loading, setLoading] = useState(false);
  // list of players that will be rendered and every time a new player is added, it will rerender with the old and recent added players
  const [matches, setMatches] = useState(null);
  // to store the last player rendered on the list, so I don't need to do lots of requests to database
  const [lastMatchVisible, setLastMatchVisible] = useState(null);

  // as soon as the component loads, I need to fetch the data from firebase:
  useEffect(() => {
    if (!matches) {
      setLoading(true);
      matchesCollection.limit(2)
      .get()
      .then(snapshot => {
        const lastLoadedMatch = snapshot.docs[snapshot.docs.length -1];
        const matchesList = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }))
        setLastMatchVisible(lastLoadedMatch);
        setMatches(matchesList);
      })
      .catch(error => showErrorToast(error))
      .finally(() => setLoading(false))
    }
  }, [matches])

  const loadMoreMatches = () => {
    if (lastMatchVisible) {
      setLoading(true);
      matchesCollection.startAfter(lastMatchVisible)
      .limit(2)
      .get()
      .then(snapshot => {
        const lastLoadedMatch = snapshot.docs[snapshot.docs.length -1];
        const newMatchesList = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }))
        setLastMatchVisible(lastLoadedMatch);
        setMatches([...matches, ...newMatchesList]);
      }).catch(error => showErrorToast(error))
      .finally(() => setLoading(false));
    } else {
      showErrorToast('nothing to load')
    }
  }

  return (
    <AdminLayout title="The matches">
      <div className="mb-5">
        <Button
          disableElevation
          variant="outlined"
          component={Link}
          to={'/admin_matches/add_match'}
        >
          Add match
        </Button>
      </div>

      <Paper className="mb-5">
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Date</TableCell>
              <TableCell>Match</TableCell>
              <TableCell>Result</TableCell>
              <TableCell>Final</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {matches ? 
              matches.map(match => (
                <TableRow key={match.id}>
                  <TableCell>
                      {match.date}
                  </TableCell>
                  <TableCell>
                    {match.local} <strong>-</strong> {match.away}
                  </TableCell>
                  <TableCell>
                    {match.resultLocal} <strong>-</strong> {match.resultAway}
                  </TableCell>
                  <TableCell>
                    {match.final === 'yes' ? 
                      <span className="matches_tag_red">Final</span>
                    :
                      <span className="matches_tag_green">Not played yet</span>
                    }
                  </TableCell>
                  <TableCell className="td_button">
                    <Link to={`/admin_matches/edit_match/${match.id}`}>
                      <button>
                        Edit match
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
        onClick={() => loadMoreMatches()}
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

export default AdminMatches;
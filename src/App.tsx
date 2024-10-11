import './App.css';

import { useEffect, useState } from 'react';

import {
    Paper, Rating, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography
} from '@mui/material';

import { getMovies } from './api/api';

interface Movie {
  id: string
  review: number
  title: string
  filmCompany?: string
  fimlCompanyId: string
}

const avg = (numbers: number[]) => numbers.reduce((acc, i) => acc + i) / numbers.length


function App() {

  const [movies, setMovies] = useState<Movie[]>([])

  useEffect(() => {
    getMovies().then(data => {
      setMovies(data.map(m => {
        return {
          id: m.id,
          review: Number(avg(m.reviews).toFixed(2)),
          title: m.title,
          fimlCompanyId: m.filmCompanyId
        }
      }))
    })
  }, [])

  return (
    <div className="App" style={{padding: "15px"}}>
      <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Title</TableCell>
            <TableCell>Review</TableCell>
            <TableCell>Company</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {movies.map(m => <TableRow>
            <TableCell>{m.title}</TableCell>
            <TableCell>
              <Typography component={"legend"}>{m.review}</Typography>
              <Rating value={m.review} precision={0.25} max={10} />
            </TableCell>
            <TableCell>{m.filmCompany}</TableCell>
          </TableRow>)}
        </TableBody>
      </Table>
      </TableContainer>
    </div>
  );
}

export default App;

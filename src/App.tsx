import './App.css';

import { useEffect, useState } from 'react';

import {
    Alert, Button, LinearProgress, Paper, Rating, Table, TableBody, TableCell, TableContainer,
    TableHead, TableRow, Typography
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


enum AppError {
  NO,
  MovieFetchError,
}


function App() {

  const [movies, setMovies] = useState<Movie[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [error, setError] = useState<AppError>(AppError.NO)

  const loadMovies = () => {
    setIsLoading(true)
    getMovies().then(data => {
      setMovies(data.map(m => {
        return {
          id: m.id,
          review: Number(avg(m.reviews).toFixed(2)),
          title: m.title,
          fimlCompanyId: m.filmCompanyId
        }
      }))
      setIsLoading(false)
      setError(AppError.NO)
    }).catch(() => {
      setError(AppError.MovieFetchError)
      setIsLoading(false)
    })
  }

  useEffect(() => {
    loadMovies()
  }, [])

  return (
    <div className="App" style={{padding: "15px"}}>
      {isLoading && <LinearProgress />}
      {error === AppError.MovieFetchError && <Alert severity='error'>
        <span>Problem to fetch data</span>
        <Button onClick={() => loadMovies()} variant='contained'>Retry</Button>
      </Alert>}
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

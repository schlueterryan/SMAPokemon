import { useState } from 'react'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid'
import Container from '@mui/material/Container'
import { PokemonInfoCard } from '../components/PokemonInfoCard'

export function PokemonSearch() {
  const [val, setVal] = useState('')
  const [searchVal, setsearchVal] = useState('')

  const [pokemonFound, setPokemonFound] = useState(false)
  const [pokemon, setPokemon] = useState()
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setsearchVal(e.target.value)
  }
  const search = () => {
    ;(async () => {
      try {
        const response = await fetch(
          `https://pokeapi.co/api/v2/pokemon/${searchVal}/`
        )
        const data = await response.json()
        setPokemon(data)
        setPokemonFound(true)
        setVal(searchVal)
      } catch (e) {
        console.error(e)
      }
    })()
  }

  const url = `https://pokeapi.co/api/v2/pokemon/${val}/`

  return (
    <Container
      style={{ paddingBottom: 24, paddingTop: 24, textAlign: 'center' }}
      maxWidth={'lg'}
    >
      <Grid container spacing={{ xs: 4 }} columns={{ xs: 4 }}>
        <Grid item xs={4} sm={4} md={4}>
          <Typography variant="h2">Find your Pokemon</Typography>
        </Grid>
        <Grid item xs={4} sm={4} md={4}>
          <TextField
            variant="outlined"
            color="secondary"
            label="search pokemon"
            inputProps={{ 'data-testid': 'search-input' }}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={4} sm={4} md={4}>
          <Button variant="contained" size="large" onClick={search}>
            Submit
          </Button>
        </Grid>
        {pokemonFound ? (
          <Grid item xs={4} sm={4} md={4}>
            <PokemonInfoCard pokemon={{ name: val, url }} />
          </Grid>
        ) : null}
      </Grid>
    </Container>
  )
}

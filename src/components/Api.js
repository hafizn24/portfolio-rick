import React, { useEffect } from 'react'
import { useState } from 'react'
import { TextField, Typography, Button, Grid, IconButton, Card } from '@mui/material'
import axios from 'axios'
import LoopIcon from '@mui/icons-material/Loop';
import Char from './Char';



export default function Api() {
    const [fetch, setfetch] = useState()
    const [url, setUrl] = useState(`https://rickandmortyapi.com/api/character/${Math.floor(Math.random() * (826)) + 1}`)
    const [boolchar, setboolchar] = useState(false)
    const [value, setValue] = useState('')
    const [fetchChar, setfetchChar] = useState([])

    useEffect(() => {
        fetchData()
    }, [url])

    useEffect(() => {
        if (value !== '' & value.length > 2) {
            fetchCharData()
        } else {
            setfetchChar([])
        }
    }, [value])

    const fetchData = () => {
        axios.get(url)
            .then(d => {
                setfetch(d.data)
            })
            .catch(err => {
                console.log(err)
            })
    }

    const fetchCharData = () => {
        axios.get(`https://rickandmortyapi.com/api/character/?name=${value}`)
            .then(d => {
                setfetchChar(d.data.results.slice(0, 5))
                setboolchar(true)
            })
            .catch(err => {
                console.log(err)
                setboolchar(true)
            })
    }

    const display = () => {
        if (fetch != null) {
            return (
                <>
                    <Grid
                        container
                        direction="column"
                        justifyContent="center"
                        alignItems="center"
                    >
                        <Card sx={{
                            width: 350, height: 435,
                        }}>
                            <Char character={fetch} />
                            <center>
                                <IconButton onClick={randomUrl}>
                                    <LoopIcon
                                        sx={{ color: 'black', fontSize: 30, p: 1 }} />
                                </IconButton>
                            </center>
                        </Card>
                    </Grid>
                </>)
        }
        else {
            return (<>Loading... </>)
        }
    }

    const list = () => {
        if (fetchChar != null) {
            return (
                <>
                    {
                        fetchChar.map(character => (
                            <>
                                <Grid>
                                    <Button key={character.id} sx={{ width: 300 }}
                                        onClick={() => {
                                            setUrl(character.url)
                                            setValue("")
                                        }} // here the problem occur
                                    >
                                        {character.name}
                                    </Button>
                                </Grid>
                            </>
                        ))
                    }
                </>
            )
        } else if (boolchar === true) {
            console.log(boolchar)
            return (
                <><Typography>No Character Found</Typography></>
            )
        }
    }

    const randomUrl = () => {
        setUrl(`https://rickandmortyapi.com/api/character/${Math.floor(Math.random() * (826)) + 1}`)
    }

    return (
        <>
            <Grid
                container
                direction="column"
                justifyContent="center"
                alignItems="center"
                sx={{
                    mt: 6,
                    mb: 2
                }}
            >
                <TextField
                    value={value}
                    label="Search..."
                    onChange={(event) => { setValue(event.target.value) }}
                    sx={{
                        width: 300
                    }}
                />
                {list()}
            </Grid>
            {display()}
        </>
    )
}

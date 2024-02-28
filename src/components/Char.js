import React from 'react'
import {
    Typography, CardActionArea,
    CardContent, Avatar
} from '@mui/material'

export default function Char({ character }) {
    return (
        <>
            <CardActionArea>
                <center
                ><Avatar
                        src={character.image}
                        alt='Profile Image'
                        sx={{
                            width: 200,
                            height: 200,
                        }}
                    />
                </center>
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        {character.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {character.gender}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {character.location.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {character.species}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {character.status}
                    </Typography>
                </CardContent>
            </CardActionArea>
        </>
    )
}

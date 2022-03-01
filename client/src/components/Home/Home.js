import React, { useState } from 'react'
import { Container, Grow, Grid, Paper, AppBar, TextField, Button } from '@material-ui/core'
import Posts from '../Posts/Posts'
import Form from '../Form/Form'
import useStyles from './styles'
import { useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { getPosts, getPostsBySearch } from '../../actions/posts'
import Paginate from '../Pagination/Pagination'
import { useNavigate, useLocation } from 'react-router-dom'
import ChipInput from 'material-ui-chip-input'

function useQuery() {
    return new URLSearchParams(useLocation().search)
}

const Home = () => {
    const [currentId, setCurrentId] = useState(null)
    const classes = useStyles()
    const dispatch = useDispatch()
    const query = useQuery()
    const navigate = useNavigate()
    const page = query.get("page") || 1
    const searchQuery = query.get("searchQuery")
    const [search, setSearch] = useState('')
    const [tags, setTags] = useState([])

    const handleKeyPress = (e) => {
        // Enter key
        if (e.keyCode === 13) {
            searchPost()
        }
    }

    const handleAdd = (tag) => {
        setTags([...tags, tag])
    }

    const handleDelete = (tagToDelete) => {
        setTags(tags.filter((tag) => tag !== tagToDelete))
    }

    const searchPost = () => {
        if (search.trim() || tags) {
            dispatch(getPostsBySearch({ search, tags: tags.join(",") }))
            navigate(`/posts/search?searchQuery=${search || 'none'}&tags=${tags.join(",")}`)
        } else {
            navigate("/")
        }
    }

    return (
        <Grow in>
            <Container maxWidth="xl">
                <Grid className={classes.gridContainer} container justifyContent='space-between' alignItems='stretch' spacing={4}>
                    <Grid item xs={12} md={9} sm={6}>
                        <Posts setCurrentId={setCurrentId} />
                    </Grid>
                    <Grid item xs={12} md={3} sm={6}>
                        <AppBar className={classes.appBarSearch} position='static' color='inherit'>
                            <TextField
                                name='Search'
                                variant='outlined'
                                label='Search Memories...'
                                fullWidth
                                onKeyPress={handleKeyPress}
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                            />
                            <ChipInput
                                label="Search Tags"
                                placeholder='Press Enter to add tags'
                                variant='outlined'
                                style={{ margin: '10px 0' }}
                                onAdd={handleAdd}
                                onDelete={handleDelete}
                                value={tags}
                            />
                            <Button className={classes.searchButton} color='primary' onClick={searchPost} variant="contained">
                                Search
                            </Button>
                        </AppBar>
                        <Form currentId={currentId} setCurrentId={setCurrentId} />
                        {(!searchQuery && !tags.length) && (
                            <Paper elevation={6} className={classes.pagination}>
                                <Paginate page={page} />
                            </Paper>
                        )}
                    </Grid>
                </Grid>
            </Container>
        </Grow>
    )
}

export default Home
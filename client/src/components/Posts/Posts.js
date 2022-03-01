import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import Post from './Post/Post'
import useStyles from './styles'
import { Grid, CircularProgress, Container } from '@material-ui/core'
import { sortData } from '../../utils'

const Posts = ({ setCurrentId }) => {
    const classes = useStyles()
    const { posts, isLoading } = useSelector((state) => state.posts)
    // const [postData, setPostData] = useState(posts)
    // console.log(posts);

    // useEffect(() => {
    //     const sortedData = sortData(posts)
    //     setPostData(sortedData)
    // }, [posts])

    if (!posts?.length && !isLoading) {
        return (
            <h1 style={{ textAlign: 'center' }}>No Posts</h1>
        )
    }

    return (
        isLoading ? (
            <Container className={classes.mainContainer}>
                <CircularProgress />
            </Container>
        ) : (
            <Grid className={classes.container} container alignItems="stretch" spacing={3}>
                {posts.map((post) => (
                    <Grid key={post._id} item xs={12} md={6} sm={12} lg={3}>
                        <Post post={post} setCurrentId={setCurrentId} />
                    </Grid>
                ))}

            </Grid>
        )
    )
}

export default Posts
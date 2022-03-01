import React, { useRef, useState } from 'react'
import { Typography, TextField, Button } from '@material-ui/core'
import { useDispatch } from 'react-redux'
import useStyles from './styles'
import { commentPost } from '../../../actions/posts'

const CommentSection = ({ post }) => {
    const classes = useStyles()
    const [comments, setComments] = useState(post?.comments)
    const [comment, setComment] = useState('')
    const user = JSON.parse(localStorage.getItem('profile'))
    const dispatch = useDispatch()
    const commentsref = useRef()

    const handleClick = async () => {
        const finalComment = `${user.result.name}: ${comment}`
        const newComment = await dispatch(commentPost(finalComment, post._id))
        setComments(newComment)
        setComment('')
        commentsref.current.scrollIntoView({ behavior: 'smooth' })
    }

    return (
        <div>

            <div className={classes.commentsOuterContainer}>
                <Typography gutterBottom variant='h6' style={{ fontWeight: 'bold' }}>
                    Comments
                </Typography>
                <div className={classes.commentsInnerContainer}>

                    {comments.map((comment, index) => (
                        <Typography key={index} gutterBottom variant='subtitle1'>
                            <strong>{comment.split(": ")[0]}: </strong>
                            {comment.split(":")[1]}
                        </Typography>
                    ))}
                    <div ref={commentsref} />
                </div>
                {!user ? (
                    <Typography gutterBottom variant='h6' style={{ fontWeight: 'bold' }}>
                        You have to Sign in to post a comment
                    </Typography>
                ) : (
                    <div className={classes.commentText}>
                        <Typography gutterBottom variant='h6' style={{ fontWeight: 'bold' }}>
                            Write a Comment
                        </Typography>
                        <TextField
                            fullWidth
                            rows={4}
                            label="Comment"
                            variant='outlined'
                            multiline
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                        />
                        <Button style={{ marginTop: '10px' }} fullWidth color="primary" variant='contained' disabled={!comment} onClick={handleClick}>
                            Comment
                        </Button>
                    </div>
                )}
            </div>
        </div>
    )
}

export default CommentSection
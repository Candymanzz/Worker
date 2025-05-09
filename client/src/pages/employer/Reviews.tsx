import React, { useEffect, useState } from 'react';
import {
    Box,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
    Button,
    IconButton,
    Chip,
    Rating,
} from '@mui/material';
import { Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material';
import { getReviews, deleteReview } from '../../services/api';
import { Review, ReviewAuthorType } from '../../types';
import Layout from '../../components/Layout';

const EmployerReviewsPage: React.FC = () => {
    const [reviews, setReviews] = useState<Review[]>([]);

    useEffect(() => {
        const fetchReviews = async () => {
            try {
                const response = await getReviews();
                setReviews(response.data);
            } catch (error) {
                console.error('Error fetching reviews:', error);
            }
        };

        fetchReviews();
    }, []);

    const handleDelete = async (id: number) => {
        try {
            await deleteReview(id);
            setReviews(reviews.filter((review) => review.id !== id));
        } catch (error) {
            console.error('Error deleting review:', error);
        }
    };

    const getAuthorTypeColor = (type: ReviewAuthorType) => {
        switch (type) {
            case ReviewAuthorType.Employer:
                return 'primary';
            case ReviewAuthorType.Worker:
                return 'secondary';
            default:
                return 'default';
        }
    };

    return (
        <Layout>
            <Box sx={{ flexGrow: 1 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                    <Typography component="h1" variant="h4">
                        Reviews Management
                    </Typography>
                </Box>
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>ID</TableCell>
                                <TableCell>Assignment</TableCell>
                                <TableCell>Rating</TableCell>
                                <TableCell>Comment</TableCell>
                                <TableCell>Author Type</TableCell>
                                <TableCell>Created Date</TableCell>
                                <TableCell>Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {reviews.map((review) => (
                                <TableRow key={review.id}>
                                    <TableCell>{review.id}</TableCell>
                                    <TableCell>
                                        {review.assignment
                                            ? `Assignment #${review.assignment.id}`
                                            : 'N/A'}
                                    </TableCell>
                                    <TableCell>
                                        <Rating value={review.rating} readOnly />
                                    </TableCell>
                                    <TableCell>{review.comment}</TableCell>
                                    <TableCell>
                                        <Chip
                                            label={review.authorType}
                                            color={getAuthorTypeColor(review.authorType)}
                                            size="small"
                                        />
                                    </TableCell>
                                    <TableCell>{review.createdDate}</TableCell>
                                    <TableCell>
                                        <IconButton color="primary" aria-label="edit">
                                            <EditIcon />
                                        </IconButton>
                                        <IconButton
                                            color="error"
                                            aria-label="delete"
                                            onClick={() => handleDelete(review.id)}
                                        >
                                            <DeleteIcon />
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>
        </Layout>
    );
};

export default EmployerReviewsPage; 
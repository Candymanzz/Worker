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
    IconButton,
    Chip,
    Rating,
    Alert,
} from '@mui/material';
import { Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material';
import { getReviews, deleteReview } from '../../services/api';
import { Review, ReviewAuthorType } from '../../types';
import Layout from '../../components/Layout';

const ReviewsPage: React.FC = () => {
    const [reviews, setReviews] = useState<Review[]>([]);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchReviews = async () => {
            try {
                const response = await getReviews();
                setReviews(response.data);
                setError(null);
            } catch (error) {
                console.error('Error fetching reviews:', error);
                setError('Не удалось загрузить отзывы. Пожалуйста, попробуйте позже.');
            }
        };

        fetchReviews();
    }, []);

    const handleDelete = async (id: number) => {
        try {
            await deleteReview(id);
            setReviews(reviews.filter((review) => review.id !== id));
            setError(null);
        } catch (error) {
            console.error('Error deleting review:', error);
            setError('Не удалось удалить отзыв. Пожалуйста, попробуйте позже.');
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

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('ru-RU', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        });
    };

    return (
        <Layout>
            <Box sx={{ flexGrow: 1 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                    <Typography component="h1" variant="h4">
                        Управление отзывами
                    </Typography>
                </Box>

                {error && (
                    <Alert severity="error" sx={{ mb: 2 }}>
                        {error}
                    </Alert>
                )}

                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>ID</TableCell>
                                <TableCell>Задание</TableCell>
                                <TableCell>Оценка</TableCell>
                                <TableCell>Комментарий</TableCell>
                                <TableCell>Тип автора</TableCell>
                                <TableCell>Дата создания</TableCell>
                                <TableCell>Действия</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {reviews.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={7} align="center">
                                        Нет доступных отзывов
                                    </TableCell>
                                </TableRow>
                            ) : (
                                reviews.map((review) => (
                                    <TableRow key={review.id}>
                                        <TableCell>{review.id}</TableCell>
                                        <TableCell>
                                            {review.assignment
                                                ? `Задание #${review.assignment.id}`
                                                : 'Н/Д'}
                                        </TableCell>
                                        <TableCell>
                                            <Rating value={review.rating} readOnly />
                                        </TableCell>
                                        <TableCell>{review.comment}</TableCell>
                                        <TableCell>
                                            <Chip
                                                label={review.authorType === ReviewAuthorType.Employer ? 'Работодатель' : 'Работник'}
                                                color={getAuthorTypeColor(review.authorType)}
                                                size="small"
                                            />
                                        </TableCell>
                                        <TableCell>{formatDate(review.createdDate)}</TableCell>
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
                                ))
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>
        </Layout>
    );
};

export default ReviewsPage; 
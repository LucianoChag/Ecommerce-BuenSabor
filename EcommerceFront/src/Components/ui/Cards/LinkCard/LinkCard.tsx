// src/ui/Cards/LinkCard/LinkCard.tsx
import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

interface LinkCardProps {
    title: string;
    link: string;
}

const LinkCard: React.FC<LinkCardProps> = ({ title, link }) => {
    return (
        <Card sx={{ minWidth: 275, backgroundColor: '#f0f0f0', m: 2 }}>
            <Link to={link} style={{ textDecoration: 'none' }}>
                <CardContent>
                    <Typography variant="h5" component="div" sx={{ color: '#001F3F', textAlign: 'center' }}>
                        {title}
                    </Typography>
                </CardContent>
            </Link>
        </Card>
    );
};

export default LinkCard;

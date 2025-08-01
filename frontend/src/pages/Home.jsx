import React from 'react';
import { Typography } from '@mui/material';
import Hero from '../components/home/Hero';
import Features from '../components/home/Features';
import Testimonials from '../components/home/Testimonial';
import Contact from './Contact';

export default function Home() {
    return (
        <>
            <Hero/>
            <Features/>
            <Testimonials/>
        </>
    )
}
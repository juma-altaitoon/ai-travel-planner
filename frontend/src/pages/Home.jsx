import React from 'react';
import { Typography } from '@mui/material';
import Hero from '../components/Hero';
import Features from '../components/Features';
import Testimonials from '../components/Testimonial';
import Contact from '../components/Contact';

export default function Home() {
    return (
        <>
            <Hero/>
            <Features/>
            <Testimonials/>
            <Contact/>
        </>
    )
}
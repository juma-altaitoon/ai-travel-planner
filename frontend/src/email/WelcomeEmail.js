import React from 'react';
import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Html,
  Img,
  Preview,
  Section,
  Text,
  Tailwind,
} from '@react-email/components';

const baseUrl = import.meta.env.VITE_API_URL;
const frontendUrl = import.meta.env.VITE_FRONTEND_URL;

export default function WelcomeEmail ({ username = 'John', company = 'AI Travel Planner' }) {
  const previewText = `Welcome to ${company}, ${username}!`;

  return (
    <html>
      <Html>
        <Head />
        <Preview>{previewText}</Preview>
        <Tailwind>
          <Body className="bg-white my-auto mx-auto font-sans">
            <Container className="my-10 mx-auto p-5 w-[465px]">
              <Section className="mt-8">
                <Img
                  src={`${baseUrl}/public/static/Adventure_bot.png`}
                  width="80"
                  height="80"
                  alt="Logo Example"
                  className="my-0 mx-auto"
                />
              </Section>

              <Heading className="text-2xl font-normal text-center p-0 my-8 mx-0">
                Welcome to <strong>{company}</strong>, {username}! 
              </Heading>

              <Text className="text-sm">
                Hello {username},
              </Text>
              <Text className="text-sm">
                Welcome aboard! You’ve just joined <strong>{company}</strong>, the planner that turns your dream trips into reality with just a few clicks.
              </Text>

              <Section className="text-center mt-[32px] mb-[32px]">
                <Button
                  pX={20}
                  pY={12}
                  className="bg-[#00A3FF] rounded-sm text-white text-xs font-semibold no-underline text-center"
                  href={`${frontendUrl}/login`}
                >
                  Get Started
                </Button>
              </Section>

              <Text className="text-sm">
                Happy exploring,
                <br />
                The {company} Team
              </Text>
            </Container>
          </Body>
        </Tailwind>
      </Html>
    </html>
  );
};


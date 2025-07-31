import React from 'react';
import {
  Html,
  Head,
  Preview,
  Body,
  Container,
  Img,
  Section,
  Text,
  Button,
  Link,
} from '@react-email/components';

const baseUrl = import.meta.env.VITE_API_URL;

const styles = {
  main: {
    backgroundColor: '#f6f9fc',
    padding: '10px 0',
  },
  container: {
    backgroundColor: '#ffffff',
    border: '1px solid #f0f0f0',
    padding: '45px',
  },
  text: {
    fontFamily: "Helvetica, Arial, 'Lucida Grande', sans-serif",
    fontWeight: '300',
    color: '#404040',
    lineHeight: '26px',
  },
  button: {
    backgroundColor: '#007ee6',
    borderRadius: '4px',
    color: '#ffffff',
    fontFamily: "'Open Sans', 'Helvetica Neue', Arial",
    fontSize: '15px',
    textDecoration: 'none',
    textAlign: 'center',
    display: 'block',
    width: '210px',
    paddingTop: '15px',
    paddingBottom: '15px',
  },
  anchor: {
    textDecoration: 'underline',
  },
};

export default function ResetPasswordEmail({
  userFirstname = 'User',
  resetPasswordLink = '',
}) {
  return (
    <Html>
      <Head />
      <Preview>AI Travel Planner reset your password</Preview>
      <Body style={styles.main}>
        <Container style={styles.container}>
          <Img
            src={`${baseUrl}/uploads/static/logo.png`}
            width="80"
            height="80"
            alt="Logo Example"
          />
          <Section>
            <Text style={styles.text}>Hi {userFirstname},</Text>
            <Text style={styles.text}>
              Someone recently requested a password change for your account. If this was you, you can set a new password here:
            </Text>
            <Button style={styles.button} href={resetPasswordLink}>
              Reset password
            </Button>
            <Text style={styles.text}>
              If you don&apos;t want to change your password or didn&apos;t
              request this, just ignore and delete this message.
            </Text>
            <Text style={styles.text}>
              To keep your account secure, please don&apos;t forward this email
              to anyone.
            </Text>
            <Text style={styles.text}>Happy Exploring!</Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}
'use client'
import styles from "./page.module.css"; 

// In a component or page file
import { useState } from 'react';

export default function Page() {
  const [base64Url, setBase64Url] = useState('');
  const [imageUrl, setImageUrl] = useState(''); // State to hold the generated image URL

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Append the base64Url as a query parameter to the URL
      const url = new URL('/api/og', window.location.origin);
      url.searchParams.append('base64Url', base64Url);

      const response = await fetch(url, {
        method: 'GET', // Change to GET method
        // Headers and body are not needed for a GET request
      });

      if (!response.ok) {
        // Instead of throwing an error, consider showing a message to the user
        console.error('Network response was not ok: ', response.statusText);
        return;
      }

      const imageBlob = await response.blob();
      const imageUrl = URL.createObjectURL(imageBlob);
      setImageUrl(imageUrl); // Update state with the new image URL

    } catch (error) {
      console.error('Failed to load image:', error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className={styles.form}>
        <input
          type="text"
          value={base64Url}
          onChange={(e) => setBase64Url(e.target.value)}
          placeholder="Enter base64 URL"
          className={styles.input}
        />
        <button type="submit" className={styles.button}>Generate Image</button>
      </form>
      {/* Displaying the generated image using state */}
      {imageUrl && <img id="asyncApiImage" src={imageUrl} alt="Generated AsyncAPI Image" className={styles.image} />}
    </div>
  );
  }
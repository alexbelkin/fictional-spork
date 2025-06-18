import './App.css'
import {Box, Button, CircularProgress, Typography} from '@mui/material';
import {useState} from 'react';
import * as React from 'react';
import type {CompaniesWithMatches} from './types/matches.type.ts';

const apiUrl = import.meta.env.BACKEND_APP_URL ?? 'http://localhost:4000';


const App = () => {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<CompaniesWithMatches[]>([]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setFile(event.target.files[0]);
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!file) {
      alert('Please select a file first.');
      return;
    }

    setLoading(true);
    setResult([]);

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch(`${apiUrl}/api/upload`, {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      setResult(data);
    } finally {
      setLoading(false);
    }
  };


  return (
    <>
      <div>
        <a href="/">
          <img src="logo.png" className="logo" alt="Logo" />
        </a>
      </div>
      <h1>Upload your text file</h1>
      <div className="card">
        <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <Button variant="contained" component="label">
            Choose File
            <input type="file" hidden onChange={handleFileChange} />
          </Button>

          {file && (
            <Typography variant="body2" color="text.secondary">
              Selected: {file.name}
            </Typography>
          )}

          <Button type="submit" variant="contained" color="primary">
            Upload
          </Button>

          {loading && <CircularProgress size={24} />}

          {result?.map((r) => (
            <Box key={`${r.algorithm}-${r.companyName}`} mb={2}>
              <Typography variant="h6" color="primary">
                {r.algorithm} matches for: {r.companyName}
              </Typography>

              {r.matches.slice(0, 3).map((match) => (
                <Typography key={match.companyName} variant="body2" color="success.main">
                  {match.companyName}: {match.distance.toFixed(2)}
                </Typography>
              ))}
            </Box>
          ))}

        </Box>
      </div>
    </>
  )
}

export default App

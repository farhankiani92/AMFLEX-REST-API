const express = require('express');
const app = express();
const { Pool } = require('pg');

const pool = new Pool({
    user: DB_USER,
    host: DB_HOST,
    database: DB_DATABASE,
    password: DB_PASSWORD,
    port: DB_PORT,
  });

app.use(express.json());

// Slider Endpoints

app.get('/sliders', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM Slider');
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error retrieving sliders' });
  }
});

app.get('/sliders/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const result = await pool.query('SELECT * FROM Slider WHERE SliderID = $1', [id]);
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(404).json({ message: 'Slider not found' });
  }
});

app.post('/sliders', async (req, res) => {
  try {
    const { DevID, ImplArea, SliderID, BgSlider, Vector1, Vector2, Vector3, TxtTitle, Txt1, Txt2, Txt3, Txt4 } = req.body;
    const result = await pool.query(
      'INSERT INTO Slider (DevID, ImplArea, SliderID, BgSlider, Vector1, Vector2, Vector3, TxtTitle, Txt1, Txt2, Txt3, Txt4) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12) RETURNING *',
      [DevID, ImplArea, SliderID, BgSlider, Vector1, Vector2, Vector3, TxtTitle, Txt1, Txt2, Txt3, Txt4]
    );
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error creating slider' });
  }
});

app.put('/sliders/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const { DevID, ImplArea, SliderID, BgSlider, Vector1, Vector2, Vector3, TxtTitle, Txt1, Txt2, Txt3, Txt4 } = req.body;
    const result = await pool.query(
      'UPDATE Slider SET DevID = $1, ImplArea = $2, SliderID = $3, BgSlider = $4, Vector1 = $5, Vector2 = $6, Vector3 = $7, TxtTitle = $8, Txt1 = $9, Txt2 = $10, Txt3 = $11, Txt4 = $12 WHERE SliderID = $13 RETURNING *',
      [DevID, ImplArea, SliderID, BgSlider, Vector1, Vector2, Vector3, TxtTitle, Txt1, Txt2, Txt3, Txt4, id]
    );
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(404).json({ message: 'Slider not found' });
  }
});

app.delete('/sliders/:id', async (req, res) => {
    try {
      const id = req.params.id;
      const result = await pool.query('DELETE FROM Slider WHERE SliderID = $1', [id]);
      res.json({ message: 'Slider deleted successfully' });
    } catch (err) {
      console.error(err);
      res.status(404).json({ message: 'Slider not found' });
    }
  });
  
  // Devcs Endpoints
  
  app.get('/devcs', async (req, res) => {
    try {
      const result = await pool.query('SELECT * FROM Devcs');
      res.json(result.rows);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Error retrieving devices' });
    }
  });
  
  app.get('/devcs/:id', async (req, res) => {
    try {
      const id = req.params.id;
      const result = await pool.query('SELECT * FROM Devcs WHERE SrNo = $1', [id]);
      res.json(result.rows[0]);
    } catch (err) {
      console.error(err);
      res.status(404).json({ message: 'Device not found' });
    }
  });
  
  app.post('/devcs', async (req, res) => {
    try {
      const { SrNo, DevID, SecID, MacAdd, DevType, ImplArea, Slider, SlideStyle } = req.body;
      const result = await pool.query(
        'INSERT INTO Devcs (SrNo, DevID, SecID, MacAdd, DevType, ImplArea, Slider, SlideStyle) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *',
        [SrNo, DevID, SecID, MacAdd, DevType, ImplArea, Slider, SlideStyle]
      );
      res.json(result.rows[0]);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Error creating device' });
    }
  });
  
  app.put('/devcs/:id', async (req, res) => {
    try {
      const id = req.params.id;
      const { SrNo, DevID, SecID, MacAdd, DevType, ImplArea, Slider, SlideStyle } = req.body;
      const result = await pool.query(
        'UPDATE Devcs SET SrNo = $1, DevID = $2, SecID = $3, MacAdd = $4, DevType = $5, ImplArea = $6, Slider = $7, SlideStyle = $8 WHERE SrNo = $9 RETURNING *',
        [SrNo, DevID, SecID, MacAdd, DevType, ImplArea, Slider, SlideStyle, id]
      );
      res.json(result.rows[0]);
    } catch (err) {
      console.error(err);
      res.status(404).json({ message: 'Device not found' });
    }
  });
  
  app.delete('/devcs/:id', async (req, res) => {
    try {
      const id = req.params.id;
      const result = await pool.query('DELETE FROM Devcs WHERE SrNo = $1', [id]);
      res.json({ message: 'Device deleted successfully' });
    } catch (err) {
      console.error(err);
      res.status(404).json({ message: 'Device not found' });
    }
  });
  
  // SlideSt Endpoints
  
  app.get('/slideSts', async (req, res) => {
    try {
      const result = await pool.query('SELECT * FROM SlideSt');
      res.json(result.rows);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Error retrieving slide styles' });
    }
  });
  
  app.get('/slideSts/:id', async (req, res) => {
    try {
      const id = req.params.id;
      const result = await pool.query('SELECT * FROM SlideSt WHERE SlideStyle = $1', [id]);
      res.json(result.rows[0]);
    } catch (err) {
      console.error(err);
      res.status(404).json({ message: 'Slide style not found' });
    }
  });
  
  app.post('/slideSts', async (req, res) => {
    try {
      const { SlideStyle, SliderID, vec1Pos, vec2Pos, vec3Pos, TxtTileSize, TxtColor, Txt1Color, Txt2Color, Txt3Color, Txt4Color } = req.body;
      const result = await pool.query(
        'INSERT INTO SlideSt (SlideStyle, SliderID, vec1Pos, vec2Pos, vec3Pos, TxtTileSize, TxtColor, Txt1Color, Txt2Color, Txt3Color, Txt4Color) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11) RETURNING *',
        [SlideStyle, SliderID, vec1Pos, vec2Pos, vec3Pos, TxtTileSize, TxtColor, Txt1Color, Txt2Color, Txt3Color, Txt4Color]
      );
      res.json(result.rows[0]);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Error creating slide style' });
    }
  });
  
  app.put('/slideSts/:id', async (req, res) => {
    try {
      const id = req.params.id;
      const { SlideStyle, SliderID, vec1Pos, vec2Pos, vec3Pos, TxtTileSize, TxtColor, Txt1Color, Txt2Color, Txt3Color, Txt4Color } = req.body;
      const result = await pool.query(
        'UPDATE SlideSt SET SlideStyle = $1, SliderID = $2, vec1Pos = $3, vec2Pos = $4, vec3Pos = $5, TxtTileSize = $6, TxtColor = $7, Txt1Color = $8, Txt2Color = $9, Txt3Color = $10, Txt4Color = $11 WHERE SlideStyle = $12 RETURNING *',
        [SlideStyle, SliderID, vec1Pos, vec2Pos, vec3Pos, TxtTileSize, TxtColor, Txt1Color, Txt2Color, Txt3Color, Txt4Color, id]
      );
      res.json(result.rows[0]);
    } catch (err) {
      console.error(err);
      res.status(404).json({ message: 'Slide style not found' });
    }
  });
  
  app.delete('/slideSts/:id', async (req, res) => {
    try {
      const id = req.params.id;
      const result = await pool.query('DELETE FROM SlideSt WHERE SlideStyle = $1', [id]);
      res.json({ message: 'Slide style deleted successfully' });
    } catch (err) {
      console.error(err);
      res.status(404).json({ message: 'Slide style not found' });
    }
  });
  
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });

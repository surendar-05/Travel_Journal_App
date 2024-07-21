const express = require('express');
const path = require('path');

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

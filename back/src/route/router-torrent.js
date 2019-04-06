const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const User = require('../model/Movie');
const passport = require('passport');

const TorrentStream    = require('torrent-stream');
const client        = new WebTorrent();

/**utiliser torrent-stream */
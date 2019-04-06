const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const User = require('../model/Movie');
const passport = require('passport');

const WebTorrent    = require('webtorrent');
const client        = new WebTorrent();


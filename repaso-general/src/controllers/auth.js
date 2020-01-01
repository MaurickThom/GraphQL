const express = require('express'),
    passport = require('passport'),
    boom = require('@hapi/boom'),
    jwt = require('jsonwebtoken'),
    router = express.Router()
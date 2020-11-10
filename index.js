const express = require('express')
var redisConnections = require('redis');

var app = express()
var redisClient = redisConnections.createClient({
    host: 'redis',
    port: 6379
});

redisClient.set('visits', 0);

app.get('/', function (req, res) {
    res.status(200).send({person: "personStore"})
})

app.get('/redis', async function(req, res) {
    await redisClient.get('visits', (err, visits) => {
        res.send('Number of visits is: ' + visits + 1)
        console.log(visits + 1)
        redisClient.set('visits', parseInt(visits) + 1)
    })
})

app.listen(5550, () => console.log('server connected'));

module.exports = function (app) {

  let candies = [
    { id: 1, name: "Chewing Gum", color: "Red" },
    { id: 2, name: "Pez", color: "Green" },
    { id: 3, name: "Marshmallow", color: "Pink" },
    { id: 4, name: "Candy Stick", color: "Blue" }
  ];

  // Index
  app.get('/candies', (req, res) => {
    res.json(candies);
  })

  // Show
  app.get('/candies/:id', (req, res) => {
    const id = req.params.id;
    let candyInfo = candies.filter((candy) => {
      return candy.id == id;
    });
    res.json(candyInfo);
  })

  // Create
  app.post('/candies', (req, res) => {
    candies.push(req.body) // req.body = body of content
    res.json(req.body);
  })

  // Update
  app.put('/candies/:id', (req, res) => {
    const id = req.params.id;
    candies[id - 1] = req.body;
    res.json(req.body);
  })

  // Delete
  app.delete('/candies/:id', (req, res) => {
    const id = req.params.id;
    let candyInfo = candies.filter((candy) => {
      return candy.id != id;
    });
    res.json({ "message": "deleted" });
  });
}

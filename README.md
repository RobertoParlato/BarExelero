# BarExelero

Commands for build the project:
1. docker-compose up mysql
2. docker-compose run composer install
3. docker-compose run artisan migrate
4. docker-compose run artisan db:seed
5. docker-compose up

Backend API:
- GET /api/ingredients <-- will return all ingredients
- GET /api/ingredients/{name} <-- will search ingredients like name
- GET /api/search?ingredient={ingredient} <-- will search drinks with that ingredient
- GET /api/drinks/random <-- will return 9 random drinks for the home page
- GET /api/drinks/{id} <-- this will lookup the drink with id specified
- GET /api/orders <-- will return all orders
- GET /api/orders/{id} <-- will return details of the orders specified
- POST /api/orders <-- will create a new order
Take as input a JSON with that format:
{
  "table_id": int,
  "details": [
    {
      "drink_id": int,
      "drink_name": string,
      "qty": int
    }
  ]
}

Nginx will serve at http://localhost so at port 80.

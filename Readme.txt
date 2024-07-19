Context:

Build a product proxy service

1. Model creation :
   a. Entity as Product with resp attributes
   b. Entity category would be needed for types of products

2. Controller creation : One controller for one type of entity
   1. define the request mapping as to what all request will come to this controller
   2. write all your apis
   a. getProductById
   b. getAllProducts

3. Service creation :
   1. ProductService as an interface
   2. FakeStore being one implementation of productService

4. Create an object of service in the controller and inject via constructor
   @Service notation needs to be defined in the service implementation to
   instruct spring to create an object of it
5. Use RestTemplate from Spring Web to call 3rd party api
    1. Create a config class for RestTemplate using @Configuration
    and @bean for RestTemplate Object
    2. Once bean is created -> inject it in the serviceFakeStoreProduct
6. DTO needs to be created since the third party api returns category as string and we have a model class for category instead
    1. Create FakeStoreDTO with attributes same as the 3rd Party API
    2. in FakeStoreProductService, getProductsById -> use DTO object to store the response returned by the FakeStore API

7. Convert DTO object into Product Object
    1. C

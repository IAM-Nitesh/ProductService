Context:

Build a product proxy service

1. Model creation :
   a. Entity as Product with resp attributes
   b. Entity category would be needed for types of products ( resulting in the need for dto )

2. Controller creation : One controller for one type of entity -> @RestController, @RequestMapping ("\products")
   1. define the request mapping as to what all request will come to this controller
   2. write all your apis
   a. getProductById -> GetMapping({"\{id}"})
   b. getAllProducts -> GetMapping()

3. Service creation : ( here the actual logic is coded)
   1. ProductService as an interface ( since there are multiple ways of implementing product service)
   2. FakeStore being one implementation of productService

4. Inside Controller : Create an object of service in the controller and inject via constructor
   @Service notation needs to be defined in the service implementation to
   instruct spring to create an object of it at the time of application initialisation.

5. Use RestTemplate from Spring Web to call 3rd party api
    1. Create a config class for RestTemplate using @Configuration
    and @bean for RestTemplate Object so that this object can be used as and when needed.
    2. Once bean is created -> inject it in the serviceFakeStoreProduct

6. DTO needs to be created since the third party api returns category as string and we have a model class for category instead
    1. Create FakeStoreDTO with attributes same as the 3rd Party API
    2. in FakeStoreProductService, getProductsById -> use DTO object to store the response returned by the FakeStore API

7. Save into and convert DTO object into Product Object -> To exactly map the output of the FakeStore api into our project
   1. Saving the response from Fake store api to DTO object
   2. Create a method ConvertFakeStoreDTOtoProduct inside FakeStoreProductService to convert dto into product object


 --- for every new api
 1. update the contract in product service interface with the new api
 2. update controller with the new Rest method
 3. implement the method in fakestore product service

-- Response Entity

In controller - all the return types should be dto objects and not entity
1. change return type from product to ResponseEntity<Product>
2. return new ResponseEntity<>(product,HttpStatus.NOT_FOUND/ok/etc)

-- Exception Handling


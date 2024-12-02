
package com.ecommerce.app;

import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.TestInstance;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.io.File;
import java.lang.reflect.Method;
import java.util.Arrays;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@TestInstance(TestInstance.Lifecycle.PER_CLASS)
public class EcommerceAppApplicationTests {

    private static final String PROJECT_ROOT = System.getProperty("user.dir");

    @Autowired
    private TestRestTemplate restTemplate;

    @BeforeAll
    void setUp() {
        assertTrue(new File(PROJECT_ROOT).exists(), "Project root directory not found");
    }

    @Test
    void testProjectStructure() {
        // Check main project files
        assertFileExists("/pom.xml");
        assertFileExists("/mvnw");
        assertFileExists("/mvnw.cmd");
        assertFileExists("/.gitignore");
        assertFileExists("/.gitattributes");
        
        // Check Maven wrapper directory
        assertDirectoryExists("/.mvn/wrapper");
        assertFileExists("/.mvn/wrapper/maven-wrapper.properties");

        // Check source directories
        assertDirectoryExists("/src/main/java");
        assertDirectoryExists("/src/main/resources");
        assertDirectoryExists("/src/test/java");

        // Check resource directories
        assertDirectoryExists("/src/main/resources/templates");
        assertDirectoryExists("/src/main/resources/static");
        assertFileExists("/src/main/resources/application.properties");
    }

    @Test
    void testJavaPackageStructure() {
        String basePackagePath = "/src/main/java/com/ecommerce/app";
        assertDirectoryExists(basePackagePath);
        assertDirectoryExists(basePackagePath + "/controller");
        assertDirectoryExists(basePackagePath + "/model");
        assertDirectoryExists(basePackagePath + "/service");
    }

    @Test
    void testRequiredClassesExist() {
        assertClassExists("com.ecommerce.app.EcommerceAppApplication");
        assertClassExists("com.ecommerce.app.controller.CatalogController");
        assertClassExists("com.ecommerce.app.controller.CartController");
        assertClassExists("com.ecommerce.app.model.Product");
        assertClassExists("com.ecommerce.app.model.CartItem");
        assertClassExists("com.ecommerce.app.service.CatalogService");
        assertClassExists("com.ecommerce.app.service.CartService");
    }

    @Test
    void testCatalogControllerEndpoints() {
        // Test GET /products
        ResponseEntity<Object> response = restTemplate.getForEntity("/products", Object.class);
        assertEquals(HttpStatus.OK, response.getStatusCode());

        // Test GET /products/{id}
        response = restTemplate.getForEntity("/products/1", Object.class);
        assertTrue(response.getStatusCode() == HttpStatus.OK || 
                  response.getStatusCode() == HttpStatus.NOT_FOUND);
    }

    @Test
    void testCartControllerEndpoints() {
        // Test GET /cart
        ResponseEntity<Object> response = restTemplate.getForEntity("/cart", Object.class);
        assertEquals(HttpStatus.OK, response.getStatusCode());
    }

    @Test
    void testControllerMethodSignatures() {
        try {
            Class<?> catalogControllerClass = Class.forName("com.ecommerce.app.controller.CatalogController");
            List<String> expectedMethods = Arrays.asList("getProducts", "getProduct", "addProduct", "deleteProduct");
            verifyMethodsExist(catalogControllerClass, expectedMethods);

            Class<?> cartControllerClass = Class.forName("com.ecommerce.app.controller.CartController");
            expectedMethods = Arrays.asList("getCart", "addToCart", "updateCartItem", "removeFromCart");
            verifyMethodsExist(cartControllerClass, expectedMethods);
        } catch (ClassNotFoundException e) {
            fail("Required controller classes not found");
        }
    }

    private void assertFileExists(String relativePath) {
        File file = new File(PROJECT_ROOT + relativePath);
        assertTrue(file.exists(), "File not found: " + relativePath);
    }

    private void assertDirectoryExists(String relativePath) {
        File dir = new File(PROJECT_ROOT + relativePath);
        assertTrue(dir.exists() && dir.isDirectory(), "Directory not found: " + relativePath);
    }

    private void assertClassExists(String className) {
        try {
            Class.forName(className);
        } catch (ClassNotFoundException e) {
            fail("Class not found: " + className);
        }
    }

    private void verifyMethodsExist(Class<?> clazz, List<String> methodNames) {
        Method[] methods = clazz.getDeclaredMethods();
        for (String methodName : methodNames) {
            boolean found = false;
            for (Method method : methods) {
                if (method.getName().equals(methodName)) {
                    found = true;
                    break;
                }
            }
            assertTrue(found, "Method " + methodName + " not found in " + clazz.getSimpleName());
        }
    }
}

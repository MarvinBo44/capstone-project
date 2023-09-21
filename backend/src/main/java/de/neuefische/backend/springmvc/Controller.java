package de.neuefische.backend.springmvc;

import lombok.AllArgsConstructor;
import lombok.Data;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Data
@AllArgsConstructor
@RestController
@RequestMapping("/api")
public class Controller {
    private Service service;


    //Shelf CRUD
    @PostMapping("/shelf")
    public Shelf addShelf(@RequestBody Shelf shelf) {
        return service.addShelf(shelf);
    }

    @GetMapping("/shelf")
    public List<Shelf> getAllShelf() {
        return service.getShelfRepo().findAll();
    }


    // Compartment CRUD
    @PostMapping("/compartment")
    public Compartment addCompartment(@RequestBody Compartment compartment) {
        return service.addCompartment(compartment);
    }
    @GetMapping("/compartment")
    public List<Compartment> getAllCompartments() {
        return service.getCompartmentRepo().findAll();
    }

    @GetMapping("/OneCompartment/{id}")
    public List<Item> findItemsInACompartment(@PathVariable String id) {
        return service.findItemsInACompartment(id);
    }


    //Item CRUD
    @PostMapping("/add/{compartmentId}")
    public List<Item> addItem(@PathVariable String compartmentId, @RequestBody Item item){
        return service.addItem(compartmentId, item);
    }

    @DeleteMapping("/delete/{compartmentId}/{itemId}")
    public Compartment deleteItem(@PathVariable String compartmentId, @PathVariable String itemId){
        return service.deleteItem(compartmentId,itemId);
    }

    @PutMapping("/plus/{compartmentId}/{itemId}")
    public int raiseItemAmountByOne(@PathVariable String compartmentId, @PathVariable String itemId) {
        return service.raiseItemAmountByOne(compartmentId, itemId);
    }

    @PutMapping("/minus/{compartmentId}/{item}")
    public int decreaseItemAmountByOne(@PathVariable String compartmentId, @PathVariable String item) {
        return service.decreaseItemAmountByOne(compartmentId, item);
    }

    @GetMapping("/findItemByKeyword/{name}")
    public List<CompartmentWithMatchingItem> findItemByKeyword(@PathVariable String name) {
        return service.findItemByKeyword(name);
    }

}
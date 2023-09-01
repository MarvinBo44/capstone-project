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
    public Shelf addShelf(@RequestBody Shelf shelf){
        return service.addShelf(shelf);
    }

    @GetMapping("/shelf")
    public List<Shelf> getAllShelfs(){
        return service.getShelfRepo().findAll();
    }

    // Compartment CRUD
    @PostMapping("/compartment")
    public Compartment addCompartment(@RequestBody Compartment compartment){
        return service.addCompartment(compartment);
    }

    @GetMapping("/compartment")
    public List<Compartment> getAllCompartments(){
        return service.getCompartmentRepo().findAll();
    }

    // add compartmentsIDs to a shelf
}
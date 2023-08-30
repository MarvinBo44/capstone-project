package de.neuefische.backend.springmvc;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@org.springframework.stereotype.Service
@AllArgsConstructor
public class Service {
    private ShelfRepo shelfRepo;
    private CompartmentRepo compartmentRepo;

    public Shelf addShelf(Shelf shelf){
        return shelfRepo.save(shelf);
    }

    public Compartment addCompartment(Compartment compartment) {
        return compartmentRepo.save(compartment);
    }
}
package de.neuefische.backend.springmvc;

import lombok.AllArgsConstructor;
import lombok.Data;
import java.util.List;

@Data
@AllArgsConstructor
@org.springframework.stereotype.Service
public class Service {
    private ShelfRepo shelfRepo;
    private CompartmentRepo compartmentRepo;

    public Shelf addShelf(Shelf shelf) {
        return shelfRepo.save(shelf);
    }

    public Compartment addCompartment(Compartment compartment) {
        return compartmentRepo.save(compartment);
    }

    public List<Item> findItemsInACompartment(String id) {
        return compartmentRepo.findById(id).get().getItems();
    }

    public int raiseItemAmountByOne(String compartmentId, String itemId) {
        Compartment compartment = compartmentRepo.findById(compartmentId).orElseThrow(() -> new RuntimeException("Compartment not found"));

        List<Item> items = compartment.getItems();

        for (Item item : items) {
            if (item.get_id().equals(itemId)) {
                int currentAmount = item.getAmount();
                currentAmount++;
                item.setAmount(currentAmount);
                compartmentRepo.save(compartment);
                return item.getAmount();
            }
        }
        throw new RuntimeException("Item not found in compartment");
    }

    public int decreaseItemAmountByOne(String compartmentId, String itemId) {
        Compartment compartment = compartmentRepo.findById(compartmentId).orElseThrow(() -> new RuntimeException("Compartment not found"));

        List<Item> items = compartment.getItems();

        for (Item item : items) {
            if (item.get_id().equals(itemId)) {
                int currentAmount = item.getAmount();
                currentAmount--;
                item.setAmount(currentAmount);
                compartmentRepo.save(compartment);
                return item.getAmount();
            }
        }
        throw new RuntimeException("Item not found in compartment");
    }

    public List<Item> addItem(String compartmentId, Item item) {
        Compartment compartment = compartmentRepo.findById(compartmentId).orElseThrow(() -> new RuntimeException("compartment with id: " + compartmentId + " not found."));
        compartment.getItems().add(item);
        compartmentRepo.save(compartment);
        return compartment.getItems();
    }
}
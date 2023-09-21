package de.neuefische.backend.springmvc;

import lombok.AllArgsConstructor;
import lombok.Data;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;
import java.util.regex.Pattern;
import java.util.stream.Collectors;

@Data
@AllArgsConstructor
@org.springframework.stereotype.Service
public class Service {
    private ShelfRepo shelfRepo;
    private CompartmentRepo compartmentRepo;

    //Shelf
    public Shelf addShelf(Shelf shelf) {
        return shelfRepo.save(shelf);
    }


    //Compartment
    public Compartment addCompartment(Compartment compartment) {
        return compartmentRepo.save(compartment);
    }

    public List<Item> findItemsInACompartment(String id) {
        Optional<Compartment> compartmentOptional = compartmentRepo.findById(id);
        if (compartmentOptional.isPresent()) {
            return compartmentOptional.get().getItems();
        } else {
            throw new NoSuchElementException("Compartment with ID " + id + " not found");
        }
    }



    //Item
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
        Compartment compartment = compartmentRepo.findById(compartmentId)
                .orElseThrow(() -> new RuntimeException("compartment with id: " + compartmentId + " not found."));
        compartment.getItems().add(item);
        compartmentRepo.save(compartment);
        return compartment.getItems();
    }

    public Compartment deleteItem(String compartmentId, String itemId) {
        Compartment compartment = compartmentRepo.findById(compartmentId)
                .orElseThrow(() -> new RuntimeException("compartment with id: " + compartmentId + " not found."));
        List<Item> items = compartment.getItems();
        for (Item item : items) {
            if (item.get_id().equals(itemId)) {
                compartment.getItems().remove(item);
                return compartmentRepo.save(compartment);
            }
        }
        throw new RuntimeException("Item not found in compartment");
    }

    public List<CompartmentWithMatchingItem> findItemByKeyword(String name) {
        List<Compartment> compartments = compartmentRepo.findAll();

        Pattern pattern = Pattern.compile(".*" + name + ".*", Pattern.CASE_INSENSITIVE);

        return compartments.stream()
                .map(compartment -> {
                    List<Item> matchingItems = compartment.getItems().stream()
                            .filter(item -> pattern.matcher(item.getName()).matches())
                            .collect(Collectors.toList());

                    return new CompartmentWithMatchingItem(compartment, matchingItems);
                })
                .filter(compartmentWithMatchingItem -> !compartmentWithMatchingItem.getMatchingItems().isEmpty())
                .collect(Collectors.toList());
    }

}
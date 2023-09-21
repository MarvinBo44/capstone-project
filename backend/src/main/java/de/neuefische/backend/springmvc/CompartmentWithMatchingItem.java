package de.neuefische.backend.springmvc;

import lombok.Getter;

import java.util.List;

@Getter
public class CompartmentWithMatchingItem {
    private final Compartment compartment;
    private final List<Item> matchingItems;

    public CompartmentWithMatchingItem(Compartment compartment, List<Item> matchingItems) {
        this.compartment = compartment;
        this.matchingItems = matchingItems;
    }

}

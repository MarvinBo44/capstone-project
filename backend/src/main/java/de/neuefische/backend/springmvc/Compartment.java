package de.neuefische.backend.springmvc;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.List;

@Data
@AllArgsConstructor
public class Compartment {
    private String id;
    private String name;
    private List<Item> items;
}

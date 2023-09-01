package de.neuefische.backend.springmvc;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class Item {
    private String _id;
    private String name;
    private String amount;
}
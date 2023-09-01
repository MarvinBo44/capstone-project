package de.neuefische.backend.springmvc;
import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.List;

@AllArgsConstructor
@Data
public class Shelf {
    private String _id;
    private String name;
    private String location;
    private List<String> compartmentIds;
}
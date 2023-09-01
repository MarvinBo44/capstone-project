package de.neuefische.backend.springmvc;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ShelfRepo extends MongoRepository<Shelf,String> {
}

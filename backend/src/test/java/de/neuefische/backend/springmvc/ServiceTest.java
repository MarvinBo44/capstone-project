package de.neuefische.backend.springmvc;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import java.util.List;

class ServiceTest {

    @Test
    void addShelf() {
        Shelf shelf = new Shelf("Test1", "TestKallax", "TestWohnzimmer", List.of("1", "2", "3", "4", "5"));
        Service service = Mockito.mock(Service.class);

        // methode vom service mock aufrufen
        Mockito.when(service.addShelf(shelf)).thenReturn(shelf);

        // methode ausführen
        Shelf result = service.addShelf(shelf);

        // ergebnis vergleichen
        Assertions.assertEquals(shelf, result);

        // prüft, ob die methode wirklich ausgeführt wurde
        Mockito.verify(service).addShelf(shelf);
    }


    @Test
    void addCompartment() {
    }

    @Test
    void findItemsInACompartment() {
    }

    @Test
    void raiseItemAmountByOne() {
    }

    @Test
    void decreaseItemAmountByOne() {
    }

    @Test
    void addItem() {
    }

    @Test
    void deleteItem() {
    }

    @Test
    void findItemByKeyword() {
    }
}
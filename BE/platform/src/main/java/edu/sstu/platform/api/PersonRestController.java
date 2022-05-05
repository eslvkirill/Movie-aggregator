package edu.sstu.platform.api;

import edu.sstu.platform.dto.request.PersonRequestDto;
import edu.sstu.platform.dto.response.PersonInfoResponseDto;
import edu.sstu.platform.service.PersonService;
import java.util.UUID;
import javax.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/people")
public class PersonRestController {

  private final PersonService personService;

  @PostMapping
  @ResponseStatus(HttpStatus.CREATED)
  public UUID createPerson(@Valid PersonRequestDto personRequestDto) {
    return personService.createPerson(personRequestDto);
  }

  @PutMapping("/{id}")
  @ResponseStatus(HttpStatus.NO_CONTENT)
  public void updatePerson(@PathVariable UUID id, @Valid PersonRequestDto personRequestDto) {
    personService.updatePerson(id, personRequestDto);
  }

  @DeleteMapping("/{id}")
  @ResponseStatus(HttpStatus.NO_CONTENT)
  public void deletePerson(@PathVariable UUID id) {
    personService.deletePerson(id);
  }

  @GetMapping("/{id}")
  public PersonInfoResponseDto getPerson(@PathVariable UUID id) {
    return personService.findPerson(id);
  }
}
